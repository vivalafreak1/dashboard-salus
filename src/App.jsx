import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationDrawer from "./components/NavigationDrawer";
import Loading from "./components/Loading"; // Import the Loading component

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Doctor = lazy(() => import("./pages/Doctor"));
const CreateDoctor = lazy(() => import("./pages/CreateDoctor")); // Import the new CreateDoctor page
const Nurse = lazy(() => import("./pages/Nurse"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Emergency = lazy(() => import("./pages/Emergency"));

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
              <Route path="/doctor/create" element={<CreateDoctor />} />
              <Route path="/nurse" element={<Nurse />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/emergency" element={<Emergency />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
