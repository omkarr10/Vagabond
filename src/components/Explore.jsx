import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/css/Explore.module.css';
import '../assets/css/animate.min.css';
import '../assets/css/bootstrap.min.css';

const locations = [
  { name: 'Alibaug Beach', img: 'camps/alibaug/al6.jpg', href: 'alibaug', style: 'style1', category: 'camp' },
  { name: 'Bhandardara', img: 'camps/bhandardara/bh6.webp', href: 'bhandardara', style: 'style2', category: 'camp' },
  { name: 'Kolad', img: 'camps/kolad/ko6.webp', href: 'kolad', style: 'style3', category: 'camp' },
  { name: 'Lonavala', img: 'camps/lonavala/loo.jpg', href: 'lonavala', style: 'style4', category: 'camp' },
  { name: 'Matheran', img: 'camps/matheran/ma6.jpg', href: 'matheran', style: 'style5', category: 'camp' },
  { name: 'Karjat Lakeside', img: 'camps/karjat/ka6.jpg', href: 'karjat', style: 'style6', category: 'camp' },
  { name: 'Pawna Lake', img: 'camps/pawna/pa6.webp', href: 'pawna', style: 'style2', category: 'camp' },
  { name: 'Revdanda Beach', img: 'camps/revdanda/re9.webp', href: 'revdanda', style: 'style3', category: 'camp' },
  { name: 'Devkund', img: 'treks/devkund/de1.jpg', href: 'devkund', style: 'style1', category: 'trek' },
  { name: 'Sandhan Valley', img: 'treks/sandhan/sn4.jpg', href: 'sandhan', style: 'style5', category: 'trek' },
  { name: 'Harishchandragad', img: 'treks/harishchandragad/hr9.jpg', href: 'harishchandragad', style: 'style6', category: 'trek' },
  { name: 'Kalsubai', img: 'treks/kalsubai/kl1.jpg', href: 'kalsubai', style: 'style4', category: 'trek' },
  { name: 'Ratangad', img: 'treks/ratangad/rt7.jpg', href: 'ratangad', style: 'style6', category: 'trek' },
  { name: 'Rajmachi', img: 'treks/rajmachi/rm.jpg', href: 'rajmachi', style: 'style4', category: 'trek' },
  { name: 'Vasota Jungle', img: 'treks/vasota/vf3.jpeg', href: 'vasota', style: 'style4', category: 'trek' },
];

const Explore = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    else window.location.href = '/login';
  }, []);

  const filtered = locations.filter(loc =>
    loc.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterTag === 'all' || loc.category === filterTag)
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headingRow}>
          <ul>
            <h1 className={styles.welcome}>Welcome, {user?.name || 'Guest'}</h1>
            <h2 className={styles.title}>
              <br />
              <img src="/home/logo.png" className={styles.lg} alt="logo" />
              Explore Scenic Locations
            </h2>
          </ul>
        </div>

        <input
          type="text"
          className={styles.input}
          placeholder="Search for destinations.."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      <div style={{ textAlign: 'center' }}>
        <br />
        <Link to="/AIItinerary" className={styles.btn} style={{ marginRight: '10px' }}>
          🤖 AI Trip Planner
        </Link>
        <button className={styles.btn} onClick={() => setFilterTag('all')}>Show All</button>
        <button className={styles.btn} onClick={() => setFilterTag('camp')}>Camps</button>
        <button className={styles.btn} onClick={() => setFilterTag('trek')}>Treks</button>
      </div>

      <div className={styles.grid}>
        {filtered.map((loc, i) => (
          <div key={i} className={styles.cardWrapper}>
            <Link to={`/${loc.href}`} className={styles.card}>
              <img src={loc.img} alt={loc.name} className={styles.cardImage} />
              <div className={styles.card__content}>
                <p className={styles.card__title}>Delve into {loc.name}</p>
              </div>
            </Link>
            <p className={styles.cardLabel}>{loc.name}</p>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <span>© 2025 Vagabond Inc. All Rights Reserved</span>
      </footer>
    </div>
  );
};

export default Explore;