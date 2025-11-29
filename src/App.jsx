// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobPortal from "./pages/jobpage/JobPortal";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgetPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import OtpVerification from "./pages/Auth/OtpVerification";
import OtpForgetVerification from "./pages/Auth/OtpForgetVerification";
import { PrivateRoute, PublicRoute } from "./pages/Auth/ProtectRoute";
import AdminPages from "./pages/Admin/AdminPages";
import StudentPages from "./pages/Students/StudentPages";
import UnauthorizedAccess from "./pages/shared/UnauthorizedAccess";
import InternalError from "./pages/shared/InternalError";
import MaintenancePage from "./pages/shared/MaintenancePage";
import NotFound from "./pages/shared/NotFound";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <PrivateRoute role="admin">
                <AdminPages />
              </PrivateRoute>
            }
          />

          <Route
            path="/student/*"
            element={
              <PrivateRoute role="student">
                <StudentPages />
              </PrivateRoute>
            }
          />

          <Route
            path="/*"
            element={
              <PublicRoute>
                <Header />
                <Routes>
                  <Route path="/" element={<JobPortal />} />
                  <Route path="/:id" element={<JobPortal />} />
                  <Route path="/signin" element={<Login />} />
                  <Route path="/signup" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgetPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route
                    path="/otpverification"
                    element={<OtpVerification />}
                  />
                  <Route
                    path="/verifyforgetotp"
                    element={<OtpForgetVerification />}
                  />
                  <Route
                    path="/unauthorized"
                    element={<UnauthorizedAccess />}
                  />
                  <Route
                    path="/not-authorized"
                    element={<UnauthorizedAccess />}
                  />
                  <Route path="/internalerror" element={<InternalError />} />
                  <Route path="/maintanance" element={<MaintenancePage />} />
                  <Route path="/notfound" element={<NotFound />} />
                </Routes>
              </PublicRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
