const express = require("express");
const Groq = require("groq-sdk");
const Itinerary = require("../models/Itinerary");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Initialize Groq AI
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Generate AI Itinerary
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { destination, duration, budget, interests, groupSize, startDate } = req.body;

    if (!destination || !duration || !budget || !groupSize || !startDate) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    // Create prompt for Groq AI
    const prompt = `Create a detailed ${duration}-day travel itinerary for ${destination} with the following preferences:
    
Budget: ${budget}
Interests: ${interests.join(", ") || "general sightseeing"}
Group Type: ${groupSize}
Start Date: ${new Date(startDate).toLocaleDateString()}

Please provide:
1. Day-by-day schedule with specific times
2. Must-visit attractions with brief descriptions
3. Restaurant recommendations for breakfast, lunch, and dinner
4. Estimated costs for activities
5. Travel tips and local insights
6. Transportation suggestions between locations

Format the response as a JSON object with this structure:
{
  "overview": "Brief trip summary",
  "totalEstimatedCost": "Cost range",
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "activities": [
        {
          "time": "9:00 AM",
          "activity": "Activity name",
          "description": "Brief description",
          "estimatedCost": "Cost",
          "location": "Location name"
        }
      ],
      "meals": {
        "breakfast": "Restaurant name and dish",
        "lunch": "Restaurant name and dish",
        "dinner": "Restaurant name and dish"
      },
      "tips": "Daily tips"
    }
  ],
  "packingList": ["item1", "item2"],
  "importantNotes": ["note1", "note2"]
}

IMPORTANT: Return ONLY the JSON object, no markdown formatting, no code blocks, no additional text.`;

    // Call Groq AI API
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner who creates detailed, personalized itineraries. Always respond with valid JSON only, no markdown formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 4000,
    });

    const aiResponse = chatCompletion.choices[0].message.content;
    
    // Clean up response (remove markdown code blocks if present)
    let cleanedResponse = aiResponse.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '');
    }
    cleanedResponse = cleanedResponse.trim();
    
    // Parse AI response
    let itineraryData;
    try {
      itineraryData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw AI Response:", aiResponse);
      // If parsing fails, create a structured response
      itineraryData = {
        overview: "Custom itinerary generated",
        totalEstimatedCost: "Varies",
        rawContent: cleanedResponse,
        days: []
      };
    }

    // Save to database
    const newItinerary = new Itinerary({
      userId: req.user.id,
      destination,
      duration,
      budget,
      interests,
      groupSize,
      startDate,
      itinerary: itineraryData,
    });

    await newItinerary.save();

    res.status(200).json({
      msg: "Itinerary generated successfully",
      itinerary: itineraryData,
      itineraryId: newItinerary._id,
    });
  } catch (err) {
    console.error("Error generating itinerary:", err);
    console.error("Error details:", err.response?.data || err);
    res.status(500).json({ 
      msg: "Failed to generate itinerary", 
      error: err.message,
      details: err.response?.data?.error || err.stack
    });
  }
});

// Get user's saved itineraries
router.get("/my-itineraries", authMiddleware, async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({ itineraries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get specific itinerary
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!itinerary) {
      return res.status(404).json({ msg: "Itinerary not found" });
    }

    res.status(200).json({ itinerary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete itinerary
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!itinerary) {
      return res.status(404).json({ msg: "Itinerary not found" });
    }

    res.status(200).json({ msg: "Itinerary deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
