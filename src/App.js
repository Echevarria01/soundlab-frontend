import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedAlbums from './components/FeaturedAlbums';
import Footer from './components/Footer';

const App = () => (
  <div className="App">
    <NavigationBar />
    <HeroSection />
    <FeaturedAlbums />
    <Footer />
  </div>
);

export default App;

