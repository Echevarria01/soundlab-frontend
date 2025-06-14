import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedAlbums from './components/FeaturedAlbums';
import Footer from './components/Footer';

const App = () => (
  <div className="App">
    <NavigationBar />
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Edit <code>src/App.js</code> and save to reload.</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
    <HeroSection />
    <FeaturedAlbums />
    <Footer />
  </div>
);

export default App;

