import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import SearchResults from './pages/SearchResults.js';
import Favorites from './pages/Favorites.js';
import Profile from './pages/Profile.js';
import ExtraSearch from "./pages/ExtraSearch.tsx";
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/extra-search" element={<ExtraSearch />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
