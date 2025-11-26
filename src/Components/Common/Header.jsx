import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { TfiYoutube } from "react-icons/tfi";
import { MdOutlineDashboard } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { isUserLoggedIn, getUserRole } from "../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  /* ----------------------------------------
     CLOSE MENU ON CLICK OUTSIDE
  ---------------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  /* ----------------------------------------
     NAVIGATION HANDLER
  ---------------------------------------- */
  const handleNavClick = (section) => {
    if (section.startsWith("#")) {
      const element = document.querySelector(section);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(section);
    }
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active-nav" : "";
  };

  return (
    <header className="header-bar" ref={menuRef}>
      {/* 🔹 TOP BAR */}
      <div className="header-bar-top">
        <div className="header-bar-top-inner">
          <div className="header-bar-phones">
            <FaMobileAlt />
            <a className="header-kit-icons" href="tel:+917725064078">
              +91 7725064078
            </a>
            <span className="divider">/</span>
            <a className="header-kit-icons" href="tel:+918451924078">
              +91 8451924078
            </a>
          </div>

          <div className="header-bar-social">
            <ul className="header-bar-social-list">
              <li className="heder-bar-social-icon-list">
                <a
                  className="header-kit-icons"
                  href="https://www.facebook.com/kumarinfotech020"
                >
                  <FaFacebookF />
                </a>
              </li>
              |
              <li className="heder-bar-social-icon-list">
                {" "}
                <a
                  className="header-kit-icons"
                  href="https://www.instagram.com/kumarinfotech_it_services"
                >
                  <FaInstagram />
                </a>
              </li>
              |
              <li className="heder-bar-social-icon-list">
                <a
                  className="header-kit-icons"
                  href="https://www.linkedin.com/in/kumarinfotech20"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              |
              <li className="heder-bar-social-icon-list">
                <a
                  className="header-kit-icons"
                  href="https://twitter.com/kumarinfotech20"
                >
                  <IoLogoTwitter />
                </a>
              </li>
              |
              <li className="heder-bar-social-icon-list">
                <a
                  className="header-kit-icons"
                  href="https://www.youtube.com/kumarinfotech20"
                >
                  <TfiYoutube />
                </a>
              </li>
              |
              <li className="heder-bar-social-icon-list">
                <a
                  className="header-kit-icons google-review-navbar-link"
                  href="https://g.page/r/CaTVvcqNsGqVEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.kumarinfotech.com/img/reviewImage.png"
                    alt="Google Review"
                    className="google-review"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🔸 MAIN HEADER */}
      <div className="header-bar-main">
        <div className="header-bar-main-inner-logo-btn">
          <div className="header-bar-logo">
            <a href="https://www.kumarinfotech.net/">
              <img
                src="https://www.kumarinfotech.com/img/logo/kitlogonew.webp"
                alt="Kumarinfotech Logo"
                className="logo-img"
              />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="menu-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <HiX /> : <FaBars />}
          </button>
        </div>

        {/* Mobile + Desktop Menu */}
        <div className={`public-header-bar-btn ${menuOpen ? "active" : ""}`}>
          <nav className="public-header-bar-links">
            <ul className="public-header-list-ul">
              <li className="public-header-list-li">
                <a
                  className={
                    window.location.href.includes("it-training-centre")
                      ? "active-nav"
                      : ""
                  }
                  href="https://www.kumarinfotech.net/"
                >
                  Home
                </a>
              </li>
              <li className="public-header-list-li">
               <a
                  className={
                    window.location.href.includes("elearning")
                      ? "active-nav"
                      : ""
                  }
                  href="https://www.elearning.kumarinfotech.net/"
                >
                  E Learning
                </a>
              </li>
              <li className="public-header-list-li">
                <button
                  className={isActive("/")}
                  onClick={() => handleNavClick("/jobportal")}
                >
                  Jobs
                </button>
              </li>
              {/* make the redirect to on the links */}
              <li className="public-header-list-li">
                <a
                  className={
                    window.location.href.includes("it-training-centre")
                      ? "active-nav"
                      : ""
                  }
                  href="https://www.kumarinfotech.net/it-training-centre"
                >
                  IT Training
                </a>
              </li>

              <li className="public-header-list-li">
                <a
                  className={
                    window.location.href.includes("aboutus") ? "active-nav" : ""
                  }
                  href="https://www.kumarinfotech.net/aboutus"
                >
                  About Us
                </a>
              </li>
              {/* <li><button onClick={() => handleNavClick("#services")}>Services</button></li> */}
              <li className="public-header-list-li">
                <a
                  className={
                    window.location.href.includes("internship")
                      ? "active-nav"
                      : ""
                  }
                  href="https://www.kumarinfotech.net/it-internship-training"
                >
                  Internship
                </a>
              </li>
              <li className="public-header-list-li">
                <a
                  className={
                    window.location.href.includes("career") ? "active-nav" : ""
                  }
                  href="https://www.kumarinfotech.net/career"
                >
                  Career
                </a>
              </li>
              <li className="public-header-list-li">
                <a
                  className={
                    window.location.href.includes("contactus")
                      ? "active-nav"
                      : ""
                  }
                  href="https://www.kumarinfotech.net/contactus"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Buttons */}
          {/* <div className="header-btn-actions">
            {isUserLoggedIn() && getUserRole() === "admin" && (
              <button
                className="header-dashboard-button"
                onClick={() => navigate("/admin/dashboard")}
              >
                <MdOutlineDashboard />
              </button>
            )}

            {isUserLoggedIn() && getUserRole() === "student" && (
              <button
                className="header-dashboard-button"
                onClick={() => navigate("/student/dashboard")}
              >
                <MdOutlineDashboard />
              </button>
            )}

            {!isUserLoggedIn() && (
              <button
                className="header-login-button"
                onClick={() => navigate("/signin")}
              >
                LOGIN
              </button>
            )}
          </div> */}
        </div>
      </div>

      {/* 🔻 MARQUEE */}
      <div
        className="header-bar-marquee"
        // style={{ display: menuOpen ? "none" : "block" }}
      >
        <marquee
          className="marquee-text"
          scrollamount="6"
          onMouseOver={(e) => e.target.stop()}
          onMouseOut={(e) => e.target.start()}
        >
          ⭐ Internship ⭐ Corporate IT Training ⭐ 100% Job Assistance ⭐
          Highly Experience Trainers ⭐ Cyber Security ⭐ Python ⭐ Fullstack in
          Dotnet ⭐ Mernstack Development ⭐ Fullstack Development
        </marquee>
      </div>
    </header>
  );
};

export default Header;

// import React, { useState } from "react";
// import "../../CSSFiles/component/public/Header.css";
// import { FaFacebookF, FaLinkedinIn} from "react-icons/fa6";
// import { FaMobileAlt } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { IoLogoTwitter } from "react-icons/io";
// import { TfiYoutube } from "react-icons/tfi";
// import { MdOutlineDashboard } from "react-icons/md";
// import { isUserLoggedIn, getUserRole } from "../../utils/localstorage";
// import { useNavigate } from "react-router-dom";
// import { HiMenuAlt3, HiX } from "react-icons/hi";

// const Header = () => {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleNavClick = (section) => {
//     if (section.startsWith("#")) {
//       const element = document.querySelector(section);
//       if (element) element.scrollIntoView({ behavior: "smooth" });
//     } else {
//       navigate(section);
//     }
//     setMenuOpen(false);
//   };

//   return (
//     <header className="header-bar">
//       {/* 🔹 Top Bar */}
//       <div className="header-bar-top">
//         <div className="header-bar-top-inner">
//           <div className="header-bar-phones">
//             <FaMobileAlt />
//             <a href="tel:+917725064078">+91 7725064078</a>
//             <span className="divider">/</span>
//             <a href="tel:+918451924078">+91 8451924078</a>
//           </div>

//           <div className="header-bar-social">
//             <a href="https://www.facebook.com/kumarinfotech020"><FaFacebookF /></a>
//             <a href="https://www.instagram.com/kumarinfotech_it_services"><FaInstagram /></a>
//             <a href="https://www.linkedin.com/in/kumarinfotech20"><FaLinkedinIn /></a>
//             <a href="https://twitter.com/kumarinfotech20"><IoLogoTwitter /></a>
//             <a href="https://www.youtube.com/kumarinfotech20"><TfiYoutube /></a>
//             <a href="https://g.page/r/CaTVvcqNsGqVEBM/review" target="_blank" rel="noopener noreferrer">
//               <img src="https://www.kumarinfotech.com/img/reviewImage.png" alt="Google Review" className="google-review" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* 🔸 Main Header */}
//       <div className="header-bar-main">
//         <div className="header-bar-logo">
//           <a href="/">
//             <img
//               src="https://www.kumarinfotech.com/img/logo/kitlogonew.webp"
//               alt="Kumarinfotech Logo"
//               className="logo-img"
//             />
//           </a>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="menu-toggle"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <HiX /> : <HiMenuAlt3 />}
//         </button>

//         <div className={`header-bar-btn ${menuOpen ? "active" : ""}`}>
//           <nav className="header-bar-links">
//             <ul>
//               <li><button onClick={() => handleNavClick("/")}>Home</button></li>
//               <li><button onClick={() => handleNavClick("/")}>E-Learning</button></li>
//               <li><button onClick={() => handleNavClick("/jobportal")}>Jobs</button></li>
//               <li><button onClick={() => handleNavClick("#about")}>About Us</button></li>
//               <li><button onClick={() => handleNavClick("#services")}>Services</button></li>
//               <li><button onClick={() => handleNavClick("#portfolio")}>Portfolio</button></li>
//               <li><button onClick={() => handleNavClick("#blog")}>Blog</button></li>
//               <li><button onClick={() => handleNavClick("#contact")}>Contact</button></li>
//             </ul>
//           </nav>

//           <div className="header-btn-actions">
//             {/* <button className="header-enquiry-button">ENQUIRY NOW</button> */}
//             {isUserLoggedIn() && getUserRole() === "admin" && (
//               <button
//                 className="header-dashboard-button"
//                 title="Dashboard"
//                 onClick={() => navigate("/admin/dashboard")}
//               >
//                 <MdOutlineDashboard />
//               </button>
//             )}
//             {isUserLoggedIn() && getUserRole() === "student" && (
//               <button
//                 className="header-dashboard-button"
//                 title="Dashboard"
//                 onClick={() => navigate("/student/dashboard")}
//               >
//                 <MdOutlineDashboard />
//               </button>
//             )}
//             {!isUserLoggedIn() && (
//               <button
//                 className="header-login-button"
//                 onClick={() => navigate("/signin")}
//               >
//                 Login / Signin
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 🔻 Bottom Marquee */}
//       <div className="header-bar-marquee">
//         <marquee
//           className="marquee-text"
//           scrollamount="6"
//           onMouseOver={(e) => e.target.stop()}
//           onMouseOut={(e) => e.target.start()}
//         >
//           ⭐ 100% CLIENT SATISFACTION ⭐ ON-TIME PROJECT DELIVERY ⭐ LIVE & REAL-TIME PROJECTS ⭐ HIGHLY EXPERIENCED PROFESSIONALS ⭐ TRUSTED BY LEADING BUSINESSES ⭐ DEDICATED SUPPORT & MAINTENANCE
//         </marquee>
//       </div>
//     </header>
//   );
// };

// export default Header;
