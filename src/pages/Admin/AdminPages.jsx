import React , { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import UserList from './usermanage/UserList'
import Sidebar from '../../Components/AdminDash/Sidebar'
import Header from '../../Components/AdminDash/Header'
import CreateAdPage from './Ads/CreateAdPage'
import AdsListPage from './Ads/AdsListPage'
import AddCompany from './Job/AddCompany'
import ApplicationList from './Application/ApplicationList'
import ResumeViewer from './Application/ResumeViewer'
import UserDetails from './usermanage/UserDetails'
import PostJobForm from './Job/PostJobForm'
import AdminJobsList from './Job/AdminJobsList'

const AdminPages = () => {
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [darkMode, setDarkMode] = useState(false);
        useEffect(() => {
          document.body.className = darkMode ? 'dark-mode' : '';
        }, [darkMode]);
  return (
      <>
      
      {/* <div className='admin-pages-container-box'> */}
         <div className={`admin-dashboard ${darkMode ? 'admin-dashboard--dark' : ''}`}>
            <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

       <div className="admin-dashboard__main">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />
    <Routes >
        <Route path='/' element={<AdminDashboard dark={darkMode}  />} />
        <Route path='/dashboard' element={<AdminDashboard dark={darkMode}  />} />
        <Route path='/userlist' element ={<UserList dark={darkMode}  />} />
        <Route path='/userprofile/:id' element ={<UserDetails dark={darkMode}  />} />

        {/* ads */}
        <Route path='/create/ads' element={<CreateAdPage dark={darkMode} />} />
        <Route path='/adslist' element={<AdsListPage dark={darkMode} />} />

        {/********************job Routes *********************/}
        <Route path='/addcompany' element={<AddCompany dark={darkMode} />} />
        <Route path='/joblist' element={<AdminJobsList dark={darkMode} />} />
        <Route path='/applicationlist' element={<ApplicationList dark={darkMode} />} />
        <Route path='/resume/:publicId' element={<ResumeViewer dark={darkMode} />} />
        <Route path='/postjob' element={<PostJobForm dark={darkMode} />} />
        {/* <Route path='/create/ads' element={<CreateTechStack dark={darkMode} />} /> */}
    </Routes>
    </div>
    </div>
    {/* </div> */}
    </>
  )
}

export default AdminPages