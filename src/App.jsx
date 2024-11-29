import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavigationDrawer from "./components/NavigationDrawer";
import Loading from "./components/Loading";
import TopBar from "./components/TopBar";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Doctor = lazy(() => import("./pages/Doctor"));
const CreateDoctor = lazy(() => import("./pages/CreateDoctor"));
const Nurse = lazy(() => import("./pages/Nurse"));
const CreateNurse = lazy(() => import("./pages/CreateNurse"));
const Patients = lazy(() => import("./pages/Patients"));
const PatientDetail = lazy(() => import("./pages/PatientDetail"));
const Inventory = lazy(() => import("./pages/Inventory"));
const CreateInventory = lazy(() => import("./pages/CreateInventory"));
const Admission = lazy(() => import("./pages/Admission"));
const CreateAdmission = lazy(() => import("./pages/CreateAdmission"));
const Emergency = lazy(() => import("./pages/Emergency"));
const Report = lazy(() => import("./pages/Reports"));
const DoctorAppointment = lazy(() => import("./pages/DoctorAppointment"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* Conditionally render TopBar and NavigationDrawer */}
      {!isLoginPage && <TopBar />}
      <div className="flex">
        {!isLoginPage && <NavigationDrawer />}
        <div className="flex-1 p-6">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/doctor/create" element={<CreateDoctor />} />
              <Route path="/nurse" element={<Nurse />} />
              <Route path="/nurse/create" element={<CreateNurse />} />
              <Route path="/patients" element={<Patients />} />
              <Route
                path="/patients/detail/:patientId"
                element={<PatientDetail />}
              />
              <Route path="/appointment" element={<DoctorAppointment />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/admission/create" element={<CreateAdmission />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/create" element={<CreateInventory />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/report" element={<Report />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
