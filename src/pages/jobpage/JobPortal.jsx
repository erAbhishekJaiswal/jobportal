import React, { useState, useEffect } from "react";
import "./JobPortal.css";
// import "../../CSSFiles/PublicPages/ELibraryBooks.css";
import axios from "axios";
import ApplyPopup from "../../Components/Public/ApplyPopup";
import JobDetails from "../../Components/Public/JobDetails";
import Loader from "../../Components/Public/Loader";

const BasseUrl = import.meta.env.VITE_BASE_URL;

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [ads, setAds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [adloading, setadLoading] = useState(false);
  const [jobloading, setjobLoading] = useState(false);

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch Ads
  const fetchAds = async () => {
    try {
      setadLoading(true);
      const response = await axios.get(`${BasseUrl}/ads/landingpage`);
      setAds(response.data);
      setadLoading(false);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      setjobLoading(true);
      const response = await axios.get(`${BasseUrl}/jobs/`);
      setJobs(response.data);
      setjobLoading(false);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchAds();
    fetchJobs();
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      location === "" ||
      job.location.toLowerCase().includes(location.toLowerCase());

    if (activeFilter === "featured") {
      return matchesSearch && matchesLocation && job.isActive;
    }
    if (activeFilter === "remote") {
      return (
        matchesSearch &&
        matchesLocation &&
        job.location.toLowerCase().includes("remote")
      );
    }
    return matchesSearch && matchesLocation;
  });

  // --------------------------------------------
  // ✅ UPDATED: MERGE JOBS + ADS IN MOBILE VIEW
  // --------------------------------------------
  const getJobsWithAds = () => {
    if (!isMobile) return filteredJobs.map((j) => ({ type: "job", data: j }));

    const merged = [];
    const adFrequency = 3; // insert ad every 3 jobs

    filteredJobs.forEach((job, index) => {
      merged.push({ type: "job", data: job });

      if ((index + 1) % adFrequency === 0 && ads.length > 0) {
        const adIndex = Math.floor(index / adFrequency) % ads.length;
        merged.push({ type: "ad", data: ads[adIndex] });
      }
    });

    return merged;
  };

  // Handle job click
  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);

    if (isMobile) {
      setShowSidebar(true);
    }
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
    setSelectedJob(null);
    setShowJobDetails(false);
  };

  return (
    <div className="career-portal">
      {/* Apply Popup */}
      {showApplyPopup && selectedJob && (
        <ApplyPopup
          job={selectedJob}
          isOpen={showApplyPopup}
          onClose={() => {
            setShowApplyPopup(false);
            setSelectedJob(null);
          }}
          onSubmit={(formData) => {
            alert(`Application submitted for ${selectedJob.title}`);
          }}
        />
      )}

      {/* Mobile Job Drawer */}
      {isMobile && showSidebar && (
        <div className="mobile-sidebar-overlay" onClick={handleCloseSidebar}>
          <div
            className="mobile-sidebar-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-sidebar-btn" onClick={handleCloseSidebar}>
              ✕
            </button>
            {selectedJob && (
              <JobDetails
                job={selectedJob}
                onApply={() => {
                  setShowApplyPopup(true);
                  setShowSidebar(false);
                }}
                onClose={handleCloseSidebar}
              />
            )}
          </div>
        </div>
      )}

      {/* Search Hero */}
      <section className="search-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h2 className="hero-title">Find Your Dream Job</h2>
            <p className="hero-subtitle">Discover job opportunities</p>
          </div>

          <div className="search-container">
            <div className="search-input-group">
              <div className="input-wrapper">
                <span className="input-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Job title or company"
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="quick-filters">
        <div className="filters-container">
          {["all", "featured", "remote"].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all"
                ? "All Jobs"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="portal-main">
        <div className="job-portal-main-container">
          <div className="job-portal-main-container-box">
            <section className="job-listings">
              <div className="listings-header">
                <h3 className="listings-title">
                  {filteredJobs.length} Jobs Found
                </h3>
              </div>

              { jobloading ? <Loader /> : <div className="jobportal-card-container">
                {/* 🟢 RENDER JOBS + ADS MERGED */}
                {  getJobsWithAds().map((item, index) =>
                  item.type === "job" ? (
                    <JobCard
                      key={`job-${item.data._id}`}
                      job={item.data}
                      isMobile={isMobile}
                      onSelect={handleJobSelect}
                      setShowApplyPopup={setShowApplyPopup}
                      setSelectedJob={setSelectedJob}
                    />
                  ) : (
                    // <AdCard key={`ad-${index}`} ad={item.data} isMobile={true} />
                    <div className="jobportal__mobile-ad-card">
                      <div className="jobportal__mobile-ad-content">
                        <span className="jobportal__mobile-ad-badge">
                          Sponsored
                        </span>

                        <div className="jobportal__mobile-ad-main">
                          <div className="jobportal__mobile-ad-image">
                            <img src={item.data.image} alt={item.data.title} />
                          </div>

                          <div className="jobportal__mobile-ad-text">
                            <h4 className="jobportal__mobile-ad-title">
                              {item.data.title}
                            </h4>
                            <p className="jobportal__mobile-ad-description">
                              {item.data.description}
                            </p>
                          </div>
                        </div>

                        <button
                          className="jobportal__mobile-ad-cta"
                          onClick={() => window.open(item.data.link, "_blank")}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
              }
            </section>

            {/* Desktop Right Sidebar */}
            {!isMobile && (
              <aside className="portal-sidebar">
                {selectedJob ? (
                  <JobDetails
                    job={selectedJob}
                    onApply={() => setShowApplyPopup(true)}
                  />
                ) : (
                   <div className="sidebar-widget">
                <h4 className="widget-title">Top Companies</h4>
                <div className="companies-list">
                  {jobs.slice(0, 3).map((job, i) => (
                    <div className="company-item" key={i}>
                      {/* <img
                        src={job.company.logoUrl || "https://cdn.pixabay.com/photo/2023/03/06/13/58/logo-7833521_1280.png"}
                        alt={job.company.name}
                        className="company-logo-small"
                      /> */}
                      <span>{job.company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
                )}
              </aside>
            )}
          </div>

          {/* Desktop Ads */}
          {!isMobile && adloading ? <Loader /> : (
            <div className="jobportal_elibrary__ads-container">
              {ads.map((ad) => (
                <AdCard key={ad._id} ad={ad} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Job Card Component
const JobCard = ({
  job,
  isMobile,
  onSelect,
  setShowApplyPopup,
  setSelectedJob,
}) => (
  <div
    className={`jobportal-card ${job.isActive ? "featured" : ""}`}
    onClick={() => onSelect(job)}
  >
    {job.isActive && <div className="featured-badge">Active</div>}

    <div className="job-header">
      {/* <div className="company-logo">
        <img
          src={
            job.company.logoUrl ||
            "https://cdn.pixabay.com/photo/2023/03/06/13/58/logo-7833521_1280.png"
          }
          alt={job.company.name}
        />
      </div> */}

      <div className="job-info">
        <h4>{job.title}</h4>
        <p>{job.company.name}</p>
        {isMobile && <p className="job-location-mobile">{job.location}</p>}
      </div>
    </div>

    <div className="job-details">
      {!isMobile && <span className="detail-tag">{job.location}</span>}
      <span className="detail-tag">{job.salaryRange}</span>
      <span className="detail-tag">{job.jobType}</span>
    </div>

    <p className="job-description">
      {job.description.length > (isMobile ? 80 : 100)
        ? job.description.slice(0, isMobile ? 80 : 100) + "..."
        : job.description}
    </p>

    <div className="job-footer">
      <span>{new Date(job.postedDate).toLocaleDateString()}</span>

      <button
        className="apply-btn"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedJob(job);
          setShowApplyPopup(true);
        }}
      >
        {isMobile ? "Apply" : "Apply Now"}
      </button>
    </div>
  </div>
);

// Ad Component
const AdCard = ({ ad, isMobile = false }) => (
  <div className={`elibrary__ad-card ${isMobile ? "mobile-ad-card" : ""}`}>
    <div className="elibrary__ad-image">
      <img src={ad.image} alt={ad.title} />
    </div>

    <div className="elibrary__ad-content">
      <h4>{ad.title}</h4>

      <p>{isMobile ? ad.description.slice(0, 60) + "..." : ad.description}</p>

      <button
        className="elibrary__ad-cta-btn"
        onClick={() => window.open(ad.link, "_blank")}
      >
        View More
      </button>
    </div>
  </div>
);

export default JobPortal;