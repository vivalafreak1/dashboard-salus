import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationDrawer from "./components/NavigationDrawer";
import Loading from "./components/Loading"; // Import the Loading component

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Doctor = lazy(() => import("./pages/Doctor"));
const Nurse = lazy(() => import("./pages/Nurse"));
const Inventory = lazy(() => import("./pages/Inventory"));

function App() {
  return (
    <Router>
      <div className="flex">
        <NavigationDrawer />
        <div className="flex-1 p-6">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/nurse" element={<Nurse />} />
              <Route path="/inventory" element={<Inventory />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
