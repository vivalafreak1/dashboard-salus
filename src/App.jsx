import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationDrawer from "./components/NavigationDrawer";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Nurse from "./pages/Nurse";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <Router>
      <div className="flex">
        <NavigationDrawer />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/nurse" element={<Nurse />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
