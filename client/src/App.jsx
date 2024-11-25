import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RealTimeEvents from "./components/RealTimeEvents";
import EventSearch from "./components/EventSearch";
import ChainValidation from "./components/ChainValidation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/realtime" element={<RealTimeEvents />} />
        <Route path="/search" element={<EventSearch />} />
        <Route path="/validate" element={<ChainValidation />} />
      </Routes>
    </Router>
  );
};

export default App;
