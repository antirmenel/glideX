import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UnderConstruction from "./404";
import Cursor from "./components/Cursor";

// Main application component with routing and shared UI components
const App = () => (
  <Router>
    <Cursor />
    <Navbar />
    <Routes>
      <Route path="/" element={<Hero />} />
      {/* Placeholder for additional routes */}
      <Route path="*" element={<UnderConstruction />} />
    </Routes>
  </Router>
);

export default App;
