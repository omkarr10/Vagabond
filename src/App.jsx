import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Explore from './components/Explore';
import Alibaug from './components/Alibaug';
import Bhandardara from './components/Bhandardara';
import Kolad from './components/Kolad';
import Lonavala from './components/Lonavala';
import Matheran from './components/Matheran';
import Karjat from './components/Karjat';
import Pawna from './components/Pawna';
import Revdanda from './components/Revdanda';
import Devkund from './components/Devkund';
import Sandhan from './components/Sandhan';
import Harishchandragad from './components/Harishchandragad';
import Kalsubai from './components/Kalsubai';
import Ratangad from './components/Ratangad';
import Vasota from './components/Vasota';
import Rajmachi from './components/Rajmachi';
import BookNow from './components/BookNow';
import Privacy from './components/Privacy';
import AIItinerary from './components/AIItinerary';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/"element={<Home />}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/AIItinerary" element={
          <ProtectedRoute>
            <AIItinerary />
          </ProtectedRoute>
        } />
        <Route path="/Alibaug" element={<Alibaug />} />
        <Route path="/Bhandardara" element={<Bhandardara />} />
        <Route path="/Kolad" element={<Kolad />} />
        <Route path="/Lonavala" element={<Lonavala />} />
        <Route path="/Matheran" element={<Matheran />} />
        <Route path="/Karjat" element={<Karjat />} />
        <Route path="/Pawna" element={<Pawna />} />
        <Route path="/Revdanda" element={<Revdanda />} />
        <Route path="/Devkund" element={<Devkund />} />
        <Route path="/Sandhan" element={<Sandhan />} />
        <Route path="/Harishchandragad" element={<Harishchandragad />} />
        <Route path="/Kalsubai" element={<Kalsubai />} />
        <Route path="/Ratangad" element={<Ratangad />} />
        <Route path="/Vasota" element={<Vasota />} />
        <Route path="/Rajmachi" element={<Rajmachi />} />
        <Route path="/BookNow" element={<BookNow />} />

      </Routes>
    </>
  );
};

export default App;