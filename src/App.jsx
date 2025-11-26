// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import JobPortal from './pages/jobpage/JobPortal'
import Header from './Components/Common/Header'
import Footer from './Components/Common/Footer'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<JobPortal />} />
          {/* <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/otpverification' element={<OtpVerification />} />
          <Route path='/verifyforgetotp' element={<OtpForgetVerification />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
