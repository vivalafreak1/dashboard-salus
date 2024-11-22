import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationDrawer from "./components/NavigationDrawer";
import Loading from "./components/Loading";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Doctor = lazy(() => import("./pages/Doctor"));
const CreateDoctor = lazy(() => import("./pages/CreateDoctor"));
const Nurse = lazy(() => import("./pages/Nurse"));
const CreateNurse = lazy(() => import("./pages/CreateNurse"));
const Inventory = lazy(() => import("./pages/Inventory"));
const CreateInventory = lazy(() => import("./pages/CreateInventory"));
const Emergency = lazy(() => import("./pages/Emergency"));
const Report = lazy(() => import("./pages/Reports"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

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
              <Route path="/nurse/create" element={<CreateNurse />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/create" element={<CreateInventory />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/report" element={<Report />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
