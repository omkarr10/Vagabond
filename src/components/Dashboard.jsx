import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalItineraries: 0,
    recentItineraries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/itinerary/my-itineraries',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const itineraries = response.data.itineraries;
      setStats({
        totalItineraries: itineraries.length,
        recentItineraries: itineraries.slice(0, 3),
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-2">Welcome back, {user?.username}!</h1>
              <p className="text-muted">{user?.email}</p>
            </div>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title text-muted">Total Itineraries</h5>
              <h2 className="display-4">{stats.totalItineraries}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title text-muted">Account Type</h5>
              <h2 className="display-6">
                {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title text-muted">Member Since</h5>
              <h2 className="display-6">
                {user?.createdAt 
                  ? new Date(user.createdAt).getFullYear() 
                  : new Date().getFullYear()}
              </h2>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title mb-3">Quick Actions</h4>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/AIItinerary" className="btn btn-primary">
                  🤖 Generate New Itinerary
                </Link>
                <Link to="/Explore" className="btn btn-secondary">
                  🏔️ Explore Destinations
                </Link>
                <Link to="/BookNow" className="btn btn-success">
                  📅 Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Itineraries */}
        <div className="col-12">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="card-title mb-0">Recent Itineraries</h4>
                <Link to="/AIItinerary" className="btn btn-sm btn-outline-primary">
                  View All
                </Link>
              </div>
              
              {stats.recentItineraries.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-3">No itineraries yet</p>
                  <Link to="/AIItinerary" className="btn btn-primary">
                    Create Your First Itinerary
                  </Link>
                </div>
              ) : (
                <div className="row">
                  {stats.recentItineraries.map((itinerary) => (
                    <div key={itinerary._id} className="col-md-4 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">{itinerary.destination}</h5>
                          <p className="card-text">
                            <small className="text-muted">
                              📅 {itinerary.duration} days<br />
                              💰 {itinerary.budget}<br />
                              👥 {itinerary.groupSize}<br />
                              🗓️ {new Date(itinerary.startDate).toLocaleDateString()}
                            </small>
                          </p>
                          <Link
                            to="/AIItinerary"
                            state={{ itinerary }}
                            className="btn btn-sm btn-primary"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
