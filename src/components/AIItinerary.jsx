import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../assets/css/Location.module.css';

const AIItinerary = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    destination: '',
    duration: 3,
    budget: 'moderate',
    interests: [],
    groupSize: 'solo',
    startDate: '',
  });

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedItineraries, setSavedItineraries] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  const interestOptions = [
    'adventure', 'culture', 'food', 'nature', 'photography',
    'shopping', 'nightlife', 'history', 'art', 'relaxation'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to generate itinerary');
      navigate('/Login');
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/itinerary/generate',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItinerary(response.data.itinerary);
      toast.success('Itinerary generated successfully!');
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast.error(error.response?.data?.msg || 'Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  const loadSavedItineraries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/itinerary/my-itineraries',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSavedItineraries(response.data.itineraries);
      setShowSaved(true);
    } catch (error) {
      console.error('Error loading itineraries:', error);
      toast.error('Failed to load saved itineraries');
    }
  };

  const deleteItinerary = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:5000/api/itinerary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Itinerary deleted');
      loadSavedItineraries();
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      toast.error('Failed to delete itinerary');
    }
  };

  return (
    <div className={styles.locationContainer}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h1 className="text-center mb-4" style={{ color: '#ff6b35' }}>
              AI Travel Itinerary Generator
            </h1>
            
            <div className="d-flex justify-content-center mb-4">
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => setShowSaved(false)}
              >
                Generate New
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={loadSavedItineraries}
              >
                My Saved Itineraries
              </button>
            </div>

            {!showSaved ? (
              <div className="card shadow-lg">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Destination</label>
                        <input
                          type="text"
                          className="form-control"
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          placeholder="e.g., Lonavala, Goa, Manali"
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Duration (days)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          min="1"
                          max="30"
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Budget</label>
                        <select
                          className="form-select"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          required
                        >
                          <option value="budget">Budget-Friendly</option>
                          <option value="moderate">Moderate</option>
                          <option value="luxury">Luxury</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Group Size</label>
                        <select
                          className="form-select"
                          name="groupSize"
                          value={formData.groupSize}
                          onChange={handleChange}
                          required
                        >
                          <option value="solo">Solo</option>
                          <option value="couple">Couple</option>
                          <option value="family">Family</option>
                          <option value="group">Group</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Start Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Interests (Select multiple)</label>
                        <div className="d-flex flex-wrap gap-2">
                          {interestOptions.map(interest => (
                            <button
                              key={interest}
                              type="button"
                              className={`btn btn-sm ${
                                formData.interests.includes(interest)
                                  ? 'btn-primary'
                                  : 'btn-outline-primary'
                              }`}
                              onClick={() => handleInterestToggle(interest)}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          disabled={loading}
                        >
                          {loading ? 'Generating...' : 'Generate AI Itinerary'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="card shadow-lg">
                <div className="card-body p-4">
                  <h3 className="mb-4">Saved Itineraries</h3>
                  {savedItineraries.length === 0 ? (
                    <p className="text-center text-muted">No saved itineraries yet</p>
                  ) : (
                    <div className="row">
                      {savedItineraries.map(item => (
                        <div key={item._id} className="col-md-6 mb-3">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">{item.destination}</h5>
                              <p className="card-text">
                                <strong>Duration:</strong> {item.duration} days<br />
                                <strong>Budget:</strong> {item.budget}<br />
                                <strong>Start:</strong> {new Date(item.startDate).toLocaleDateString()}
                              </p>
                              <button
                                className="btn btn-sm btn-primary me-2"
                                onClick={() => {
                                  setItinerary(item.itinerary);
                                  setShowSaved(false);
                                }}
                              >
                                View
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteItinerary(item._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {itinerary && !showSaved && (
              <div className="card shadow-lg mt-4">
                <div className="card-body p-4">
                  <h3 className="mb-4">Your Personalized Itinerary</h3>
                  
                  {itinerary.overview && (
                    <div className="alert alert-info">
                      <strong>Overview:</strong> {itinerary.overview}
                    </div>
                  )}

                  {itinerary.totalEstimatedCost && (
                    <div className="alert alert-success">
                      <strong>Estimated Cost:</strong> {itinerary.totalEstimatedCost}
                    </div>
                  )}

                  {itinerary.days && itinerary.days.length > 0 ? (
                    itinerary.days.map((day, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="border-bottom pb-2">
                          Day {day.day}: {day.title}
                        </h4>
                        
                        {day.activities && (
                          <div className="mb-3">
                            <h6>Activities:</h6>
                            {day.activities.map((activity, idx) => (
                              <div key={idx} className="card mb-2">
                                <div className="card-body">
                                  <div className="d-flex justify-content-between">
                                    <strong>{activity.time}</strong>
                                    <span className="badge bg-primary">{activity.estimatedCost}</span>
                                  </div>
                                  <h6 className="mt-2">{activity.activity}</h6>
                                  <p className="mb-1">{activity.description}</p>
                                  <small className="text-muted">📍 {activity.location}</small>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {day.meals && (
                          <div className="mb-3">
                            <h6>Meals:</h6>
                            <ul>
                              <li><strong>Breakfast:</strong> {day.meals.breakfast}</li>
                              <li><strong>Lunch:</strong> {day.meals.lunch}</li>
                              <li><strong>Dinner:</strong> {day.meals.dinner}</li>
                            </ul>
                          </div>
                        )}

                        {day.tips && (
                          <div className="alert alert-warning">
                            <strong>💡 Tips:</strong> {day.tips}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="alert alert-info">
                      <pre style={{ whiteSpace: 'pre-wrap' }}>{itinerary.rawContent}</pre>
                    </div>
                  )}

                  {itinerary.packingList && itinerary.packingList.length > 0 && (
                    <div className="mb-3">
                      <h5>📦 Packing List:</h5>
                      <ul>
                        {itinerary.packingList.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {itinerary.importantNotes && itinerary.importantNotes.length > 0 && (
                    <div className="alert alert-danger">
                      <h5>⚠️ Important Notes:</h5>
                      <ul>
                        {itinerary.importantNotes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={() => window.print()}
                  >
                    Print / Save as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIItinerary;
