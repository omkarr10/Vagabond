import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import styles from "../assets/css/Home.module.css";
import {
  FaBars, FaUser, FaMapMarkerAlt, FaEnvelope,
  FaPaintBrush, FaChartLine, FaCode, FaRegCopyright,
} from "react-icons/fa";

const TYPING_STRINGS = [
  "the Best Destinations",
  "at Reasonable Prices",
  "with Quality Plans",
];

function useTypingAnimation(words, typingSpeed = 100, backSpeed = 60, loop = true) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);
  const charIndex = useRef(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        setText(currentWord.slice(0, charIndex.current + 1));
        charIndex.current += 1;
        if (charIndex.current === currentWord.length) {
          setIsDeleting(true);
          setTypingDelay(1000);
        } else {
          setTypingDelay(typingSpeed);
        }
      } else {
        setText(currentWord.slice(0, charIndex.current - 1));
        charIndex.current -= 1;
        if (charIndex.current === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingDelay(500);
        } else {
          setTypingDelay(backSpeed);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingDelay);
    return () => clearTimeout(timer);
  }, [text, isDeleting, typingDelay, wordIndex, words, typingSpeed, backSpeed]);

  return text;
}

export default function Home() {
  const [menuActive, setMenuActive] = useState(false);
  const [navbarSticky, setNavbarSticky] = useState(false);
  const [scrollUpVisible, setScrollUpVisible] = useState(false);
  const typingText = useTypingAnimation(TYPING_STRINGS, 100, 60);

  useEffect(() => {
    const onScroll = () => {
      setNavbarSticky(window.scrollY > 20);
      setScrollUpVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setMenuActive(!menuActive);
  const smoothScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuActive(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      //alert(data.msg || "Message sent successfully.");
      form.reset();
    } catch (err) {
      //alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`${styles.navbar} ${navbarSticky ? styles.sticky : ""}`}>
        <div className={styles["max-width"]}>
          <div className={styles.logo}>
            <a href="#" onClick={() => smoothScrollTo("home")}>
              <span>Vagabond </span>Inc.
            </a>
          </div>
          <ul className={`${styles.menu} ${menuActive ? styles.active : ""}`}>
            {["home", "about", "services", "contact"].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={styles["menu-btn"]}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(section);
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={styles["menu-btn"]}
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && toggleMenu()}
          >
            <FaBars className={menuActive ? styles.active : ""} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.home} id="home">
        <div className={styles["max-width"]}>
          <div className={styles["home-content"]}>
            <div className={styles["text-1"]}>Welcome to the</div>
            <div className={styles["text-2"]}>World of Camps & Treks</div>
            <div className={styles["text-3"]}>
              We provide <span className={styles.typing}>{typingText}</span>
            </div>
            <Link to="/login">View Campgrounds</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about} id="about">
        <div className={styles["max-width"]}>
          <h2 className={styles.title}>About Us</h2>
          <div className={styles["about-content"]}>
            <div className={styles.column + " " + styles.left}>
              <div className={styles.card}>
                <div className={styles.content}>
                  <div className={styles.front}>
                    <img src="/home/logo.png" alt="Vagabond Logo Front" className={styles["flip-image"]} />
                  </div>
                  <div className={styles.back}>
                    <div className={styles["back-content"]}>
                      <img src="/home/logo.png" alt="Vagabond Logo Back" className={styles["flip-image"]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.column + " " + styles.right}>
              <div className={styles.text}>Context</div>
              <p>
                Vagabond allows a user easy access to suitable locations to camp
                at while on vacation. Vagabond allows a user to look for camping
                grounds based on the location. Our system is digital, portable,
                simple to use and easier than asking around in the community for
                a good location for camping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services} id="services">
        <div className={styles["max-width"]}>
          <h2 className={styles.title}>Our Services</h2>
          <div className={styles["serv-content"]}>
            <div className={styles.card}>
              <div className={styles.box}>
                <FaPaintBrush />
                <div className={styles.text}>Best Destinations</div>
                <p>Visit your dream destination with Vagabond</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.box}>
                <FaChartLine />
                <div className={styles.text}>Quality Plans</div>
                <p>Have a great time with your family and friends</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.box}>
                <FaCode />
                <div className={styles.text}>Reasonable Prices</div>
                <p>Find suitable packages according to your budget</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contact} id="contact">
        <div className={styles["max-width"]}>
          <h2 className={styles.title}>Contact Us</h2>
          <div className={styles["contact-content"]}>
            <div className={styles.column + " " + styles.left}>
              <div className={styles.text}>Get in Touch</div>
              <div className={styles.icons}>
                <div className={styles.row}>
                  <FaUser />
                  <div className={styles.info}>
                    <div className={styles.head}>Name</div>
                    <div className={styles["sub-title"]}>Vagabond Inc.</div>
                  </div>
                </div>
                <div className={styles.row}>
                  <FaMapMarkerAlt />
                  <div className={styles.info}>
                    <div className={styles.head}>Address</div>
                    <div className={styles["sub-title"]}>Vasai, Maharashtra, India</div>
                  </div>
                </div>
                <div className={styles.row}>
                  <FaEnvelope />
                  <div className={styles.info}>
                    <div className={styles.head}>Email</div>
                    <div className={styles["sub-title"]}>contact@vgbnd.xyz</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.column + " " + styles.right}>
              <div className={styles.text}>Message Us</div>
              <form onSubmit={handleContactSubmit}>
                <div className={styles.fields}>
                  <div className={styles.field + " " + styles.name}>
                    <input type="text" placeholder="Name" name="name" required />
                  </div>
                  <div className={styles.field + " " + styles.email}>
                    <input type="email" placeholder="Email" name="email" required />
                  </div>
                </div>
                <div className={styles.field}>
                  <input type="text" placeholder="Subject" name="subject" required />
                </div>
                <div className={styles.textarea}>
                  <textarea placeholder="Message" name="message" required />
                </div>
                <br />
                <div className={styles["button-area"]}>
                  <button type="submit" name="send">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>
          <FaRegCopyright /> 2025 Vagabond Inc. All Rights Reserved
        </span>
      </footer>

      {/* Scroll to Top */}
      {scrollUpVisible && (
        <button
          className={`${styles["scroll-up-btn"]} ${styles.show}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          &#8673;
        </button>
      )}
    </>
  );
}
