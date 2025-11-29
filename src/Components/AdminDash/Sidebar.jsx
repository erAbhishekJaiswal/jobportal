// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { FaAd } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdListBox } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import { MdLogout } from 'react-icons/md';
import { MdOutlineVisibility } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ isOpen, onClose, darkMode }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: <MdDashboard />, label: 'Dashboard', path: '/admin/dashboard' }, //active: true,
    { icon: <MdPeople />, label: 'Users', path: '/admin/userlist' },
    // { icon: <MdLibraryBooks />, label: 'TechStack', path: '/admin/techstack' },
    // { icon: <SiCoursera />, label: 'Courses', path: '/admin/courselist' },
    { icon: <FaAd />, label: 'Ads List', path: '/admin/adslist' },
    // { icon:  <FaBook />, label: 'Book List', path: '/admin/bookslist' },
    // { icon: <MdOutlineQuiz />, label: 'Test List', path: '/admin/testlist' },
    { icon: <IoIosAddCircleOutline />, label: 'Create Company', path: '/admin/addcompany' },
    { icon: <CiBoxList />, label: 'JobList', path: '/admin/joblist' },
    { icon: <IoMdListBox />, label: 'Job Applications', path: '/admin/applicationlist' },
    { icon: < MdOutlineVisibility/>, label: 'Visitor Analytics', path: '/admin/analytics' },
    // { icon: <MdSettings />, label: 'Settings', path: '/admin/settings' },
    // { icon: <MdSupportAgent />, label: 'Support', path: '/admin/support' }
  ];

    const handleLogout = () => {
    // Perform logout logic here
    sessionStorage.clear();
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
              to={item.path || '#'}
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
            <div className="admin-sidebar__user-info">
              {/* <div className="admin-sidebar__user-name">John Doe</div> */}
              <div className="admin-sidebar__user-role">Administrator</div>
            </div>
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