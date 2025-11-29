// components/Sidebar.js
import React from 'react';
import '../../CSSFiles/Admin/AdminDashboard.css';
import { MdDashboard, MdPersonOutline , MdLibraryBooks, MdLogout, MdSupportAgent } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoMdBook } from "react-icons/io";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaCode } from "react-icons/fa";
import { RiChatAiLine } from "react-icons/ri";
import { FaArrowTrendUp } from "react-icons/fa6";
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {clearStorage} from '../../utils/localstorage';
import { BsSuitcaseLgFill } from "react-icons/bs";
const Sidebar = ({ isOpen, onClose, darkMode }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: <MdDashboard />, label: 'Dashboard', active: false,  path: '/student/'},
    { icon: <MdPersonOutline />, label: 'My Profile', path: '/student/profile' },
    // { icon: <IoMdBook />, label: 'Books', path: '/student/books' },
    { icon: < BsSuitcaseLgFill/>, label: 'Jobs', path: '/' },
    // { icon: <LiaCertificateSolid />, label: 'Cirtificates', path: '/student/certificates' },
    // { icon: <FaCode />, label: 'Code Editor', path: '/student/codeediter' },
    { icon: <MdLibraryBooks />, label: 'My Applications', path: '/student/applications' },
    // { icon: <RiChatAiLine />, label: 'Ask to AI', path: '/student/asktoai' },
    { icon: <MdSupportAgent />, label: 'Support', path: '/student/support' }
  ];

  const handleLogout = () => {
    // Perform logout logic here
    clearStorage();
    toast.success('Logout successful');
    navigate('/');
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--active' : ''}`}
        onClick={onClose}
      ></div>
      
      <aside className={`admin-sidebar ${isOpen ? 'admin-sidebar--open' : ''} ${darkMode ? 'admin-sidebar--dark' : ''}`}>
        <div className="admin-sidebar__header">
          <h2 className="admin-sidebar__logo">KIT Job Portal</h2>
          <button className="admin-sidebar__close" onClick={onClose}>×</button>
        </div>
        
        <nav className="admin-sidebar__nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`admin-sidebar__nav-item ${item.active ? 'admin-sidebar__nav-item--active' : ''}`}
            >
              <span className="admin-sidebar__nav-icon">{item.icon}</span>
              <span className="admin-sidebar__nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__user-avatar">👨‍💼</div>
            {/* <div className="admin-sidebar__user-info">
              <div className="admin-sidebar__user-name">John Doe</div>
              <div className="admin-sidebar__user-role">Administrator</div>
            </div> */}
              <button onClick={handleLogout} className="admin-sidebar__logout-btn">
              <MdLogout />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;