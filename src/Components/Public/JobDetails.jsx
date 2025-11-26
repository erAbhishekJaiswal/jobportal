import React from "react";
import "./JobDetails.css";

const JobDetails = ({ job, onApply }) => {
  if (!job) {
    return (
      <div className="job-details-empty">
        <p>Select a job to view its details.</p>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      {/* ✅ Header Section */}
      <div className="job-details-header">
        {/* <img
          src={job.company?.logoUrl || "https://via.placeholder.com/80"}
          alt={job.company?.name}
          className="job-company-logo"
        /> */}
        <div className="job-header-info">
          <h2 className="job-title">{job.title}</h2>
          <p className="company-name">{job.company?.name}</p>
          <p className="job-location">
            📍 {job.location || "Location not specified"}
          </p>
        </div>
      </div>

      {/* ✅ Job Summary */}
      <div className="job-summary">
        <div className="summary-item">
          <strong>💰 Salary:</strong> {job.salaryRange || "Not disclosed"}
        </div>
        <div className="summary-item">
          <strong>🕒 Type:</strong> {job.jobType}
        </div>
        <div className="summary-item">
          <strong>🎯 Level:</strong> {job.experienceLevel || "Not specified"}
        </div>
        <div className="summary-item">
          <strong>📅 Posted:</strong>{" "}
          {new Date(job.postedDate).toLocaleDateString()}
        </div>
      </div>

      {/* ✅ Description */}
      {job.description && (
        <div className="job-section">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>
      )}

      {/* ✅ Responsibilities */}
      {job.responsibilities && job.responsibilities.length > 0 && (
        <div className="job-section">
          <h3>Responsibilities</h3>
          <ul>
            {job.responsibilities.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Requirements */}
      {job.requirements && job.requirements.length > 0 && (
        <div className="job-section">
          <h3>Requirements</h3>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>📘 {req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Skills */}
      {job.skillsRequired && job.skillsRequired.length > 0 && (
        <div className="job-section">
          <h3>Required Skills</h3>
          <div className="skills-list">
            {job.skillsRequired.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Perks */}
      {job.perks && job.perks.length > 0 && (
        <div className="job-section">
          <h3>Perks & Benefits</h3>
          <ul>
            {job.perks.map((perk, index) => (
              <li key={index}>💼 {perk}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Company Info */}
      {job.company && (
        <div className="job-section company-info">
          <h3>About {job.company.name}</h3>
          <p>{job.company.about || "No company information available."}</p>

          <div className="company-meta">
            {job.company.mission && (
              <p>
                <strong>Mission:</strong> {job.company.mission}
              </p>
            )}
            {job.company.foundedYear && (
              <p>
                <strong>Founded:</strong> {job.company.foundedYear}
              </p>
            )}
            {job.company.industry && (
              <p>
                <strong>Industry:</strong> {job.company.industry}
              </p>
            )}
            {job.company.companySize && (
              <p>
                <strong>Size:</strong> {job.company.companySize}
              </p>
            )}
            {job.company.headquarters && (
              <p>
                <strong>Headquarters:</strong> {job.company.headquarters}
              </p>
            )}
          </div>

          {job.company.website && (
            <a
              href={job.company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="company-link"
            >
              🌐 Visit Company Website
            </a>
          )}
        </div>
      )}

      {/* ✅ Apply Button */}
      <div className="apply-section">
        <button className="apply-now-btn" onClick={onApply}>
          Apply Now
        </button>
        {job.applyLink && (
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="external-apply-btn"
          >
            Apply via Company Site
          </a>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
