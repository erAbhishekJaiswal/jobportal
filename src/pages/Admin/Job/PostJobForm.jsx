import React, { useState } from "react";
import axios from "axios";
import "./PostJobForm.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJobForm = () => {
    const navigate = useNavigate();
  const [companySearch, setCompanySearch] = useState("");
  const [companyResults, setCompanyResults] = useState([]);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: "",
    location: "",
    salaryRange: "",
    jobType: "Full-time",
    company: "",
    companyName: "",

    // Step 2: Job Details
    description: "",
    experienceLevel: "",
    education: "",
    applyLink: "",

    // Step 3: Requirements & Responsibilities
    responsibilities: [],
    requirements: [],
    skillsRequired: [],
    perks: [],

    // Step 4: Additional Settings
    isActive: true,
  });

  const [tempInput, setTempInput] = useState({
    responsibility: "",
    requirement: "",
    skill: "",
    perk: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle array field additions
  const handleAddArrayItem = (field, value) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setTempInput((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Debounce timer
  let searchTimer;

  const searchCompanies = (query) => {
    if (!query.trim()) {
      setCompanyResults([]);
      return;
    }

    clearTimeout(searchTimer);
    searchTimer = setTimeout(async () => {
      setCompanyLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/companies/search?query=${query}`
        );
        console.log(res);
        
        setCompanyResults(res.data?.companies || []);
        setShowCompanyDropdown(true);
      } catch (error) {
        console.error("Company search error:", error);
      } finally {
        setCompanyLoading(false);
      }
    }, 400); // 400ms debounce
  };

  // Navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Validation
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.company;
      case 2:
        return formData.description;
      case 3:
        return formData.requirements.length > 0;
      default:
        return true;
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/jobs`,
        formData
      );

      if (response.data.success) {
        alert("Job posted successfully!");
        // Reset form or redirect
        navigate('/jobportal');
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step progress
  const steps = [
    { number: 1, title: "Basic Info", description: "Job title and company" },
    {
      number: 2,
      title: "Job Details",
      description: "Description and requirements",
    },
    { number: 3, title: "Responsibilities", description: "Roles and skills" },
    { number: 4, title: "Review", description: "Final review and submit" },
  ];

  return (
    <div className="post-job-container">
      <div className="post-job-header">
        <div className="header-content">
          <h1>Post a New Job</h1>
          <p>Fill in the details below to create your job posting</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`step-item ${
              currentStep === step.number ? "active" : ""
            } ${currentStep > step.number ? "completed" : ""}`}
          >
            <div className="step-number">
              {currentStep > step.number ? "✓" : step.number}
            </div>
            <div className="step-info">
              <span className="step-title">{step.title}</span>
              <span className="step-description">{step.description}</span>
            </div>
            {index < steps.length - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="job-form">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <div className="step-header">
              <h2>Basic Information</h2>
              <p>Provide the essential details about the job position</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">
                  Job Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="form-input"
                  placeholder="e.g., Senior Frontend Developer"
                  required
                />
              </div>

              {/* <div className="form-group full-width">
                <label className="form-label">
                  Company ID <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="form-input"
                  placeholder="Enter company ID"
                  required
                />
                <span className="input-hint">The unique identifier for your company</span>
              </div> */}

              <div
                className="form-group full-width"
                style={{ position: "relative" }}
              >
                <label className="form-label">
                  Company (Search & Select) <span className="required">*</span>
                </label>

                <input
                  type="text"
                  value={companySearch}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCompanySearch(value);
                    searchCompanies(value);
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowCompanyDropdown(false), 200)
                  }
                  onFocus={() =>
                    companyResults.length > 0 && setShowCompanyDropdown(true)
                  }
                  className="form-input"
                  placeholder="Search by company name or ID..."
                  required
                />

                {/* Loading Spinner */}
                {companyLoading && <div className="input-loader"></div>}

                {/* Dropdown */}
                {showCompanyDropdown && companyResults.length > 0 && (
                  <div className="dropdown-results">
                    {companyResults.map((company) => (
                      <div
                        key={company._id}
                        className="dropdown-item"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            company: company._id,
                            companyName: company.name,
                          }));
                          setCompanySearch(company.name);
                          setShowCompanyDropdown(false);
                        }}
                      >
                        <strong>{company.name}</strong>
                        <span className="dropdown-sub">{company._id}</span>
                      </div>
                    ))}
                  </div>
                )}

                <span className="input-hint">
                  Select your company from the list
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="form-input"
                  placeholder="e.g., New York, NY or Remote"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Type</label>
                <select
                  value={formData.jobType}
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                  className="form-select"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Salary Range</label>
                <input
                  type="text"
                  value={formData.salaryRange}
                  onChange={(e) =>
                    handleInputChange("salaryRange", e.target.value)
                  }
                  className="form-input"
                  placeholder="e.g., $120,000 - $150,000"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Experience Level</label>
                <input
                  type="text"
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    handleInputChange("experienceLevel", e.target.value)
                  }
                  className="form-input"
                  placeholder="e.g., Senior, Mid-level, Entry"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Job Details */}
        {currentStep === 2 && (
          <div className="form-step">
            <div className="step-header">
              <h2>Job Details</h2>
              <p>Describe the role and what you're looking for</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">
                  Job Description <span className="required">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="form-textarea"
                  placeholder="Describe the role, team, and company culture..."
                  rows="6"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Education Requirements</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  className="form-input"
                  placeholder="e.g., Bachelor's in Computer Science"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Application Link</label>
                <input
                  type="url"
                  value={formData.applyLink}
                  onChange={(e) =>
                    handleInputChange("applyLink", e.target.value)
                  }
                  className="form-input"
                  placeholder="https://company.com/apply"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Responsibilities & Requirements */}
        {currentStep === 3 && (
          <div className="form-step">
            <div className="step-header">
              <h2>Responsibilities & Requirements</h2>
              <p>Define what the role entails and what skills are needed</p>
            </div>

            <div className="form-grid">
              {/* Responsibilities */}
              <div className="form-group full-width">
                <label className="form-label">
                  Key Responsibilities <span className="required">*</span>
                </label>
                <div className="array-input-group">
                  <div className="input-with-button">
                    <input
                      type="text"
                      value={tempInput.responsibility}
                      onChange={(e) =>
                        setTempInput((prev) => ({
                          ...prev,
                          responsibility: e.target.value,
                        }))
                      }
                      className="form-input"
                      placeholder="e.g., Develop and maintain web applications"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(),
                        handleAddArrayItem(
                          "responsibilities",
                          tempInput.responsibility
                        ))
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleAddArrayItem(
                          "responsibilities",
                          tempInput.responsibility
                        )
                      }
                      className="add-item-btn"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="array-items-list">
                  {formData.responsibilities.map((item, index) => (
                    <div key={index} className="array-item">
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveArrayItem("responsibilities", index)
                        }
                        className="remove-item-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="form-group full-width">
                <label className="form-label">
                  Requirements <span className="required">*</span>
                </label>
                <div className="array-input-group">
                  <div className="input-with-button">
                    <input
                      type="text"
                      value={tempInput.requirement}
                      onChange={(e) =>
                        setTempInput((prev) => ({
                          ...prev,
                          requirement: e.target.value,
                        }))
                      }
                      className="form-input"
                      placeholder="e.g., 5+ years of experience in React"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(),
                        handleAddArrayItem(
                          "requirements",
                          tempInput.requirement
                        ))
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleAddArrayItem(
                          "requirements",
                          tempInput.requirement
                        )
                      }
                      className="add-item-btn"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="array-items-list">
                  {formData.requirements.map((item, index) => (
                    <div key={index} className="array-item">
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveArrayItem("requirements", index)
                        }
                        className="remove-item-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Required */}
              <div className="form-group full-width">
                <label className="form-label">Skills Required</label>
                <div className="array-input-group">
                  <div className="input-with-button">
                    <input
                      type="text"
                      value={tempInput.skill}
                      onChange={(e) =>
                        setTempInput((prev) => ({
                          ...prev,
                          skill: e.target.value,
                        }))
                      }
                      className="form-input"
                      placeholder="e.g., React, JavaScript, TypeScript"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(),
                        handleAddArrayItem("skillsRequired", tempInput.skill))
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleAddArrayItem("skillsRequired", tempInput.skill)
                      }
                      className="add-item-btn"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="array-items-list">
                  {formData.skillsRequired.map((item, index) => (
                    <div key={index} className="array-item">
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveArrayItem("skillsRequired", index)
                        }
                        className="remove-item-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perks & Benefits */}
              <div className="form-group full-width">
                <label className="form-label">Perks & Benefits</label>
                <div className="array-input-group">
                  <div className="input-with-button">
                    <input
                      type="text"
                      value={tempInput.perk}
                      onChange={(e) =>
                        setTempInput((prev) => ({
                          ...prev,
                          perk: e.target.value,
                        }))
                      }
                      className="form-input"
                      placeholder="e.g., Remote work flexibility, Health insurance"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(),
                        handleAddArrayItem("perks", tempInput.perk))
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleAddArrayItem("perks", tempInput.perk)
                      }
                      className="add-item-btn"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="array-items-list">
                  {formData.perks.map((item, index) => (
                    <div key={index} className="array-item">
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("perks", index)}
                        className="remove-item-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="form-step">
            <div className="step-header">
              <h2>Review & Submit</h2>
              <p>Review your job posting before publishing</p>
            </div>

            <div className="review-section">
              <div className="review-grid">
                <div className="review-group">
                  <h3>Basic Information</h3>
                  <div className="review-item">
                    <span className="review-label">Job Title:</span>
                    <span className="review-value">{formData.title}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Company ID:</span>
                    <span className="review-value">{formData.company}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Location:</span>
                    <span className="review-value">
                      {formData.location || "Not specified"}
                    </span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Job Type:</span>
                    <span className="review-value">{formData.jobType}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Salary Range:</span>
                    <span className="review-value">
                      {formData.salaryRange || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="review-group">
                  <h3>Job Details</h3>
                  <div className="review-item full-width">
                    <span className="review-label">Description:</span>
                    <span className="review-value">{formData.description}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Experience Level:</span>
                    <span className="review-value">
                      {formData.experienceLevel || "Not specified"}
                    </span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Education:</span>
                    <span className="review-value">
                      {formData.education || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="review-group full-width">
                  <h3>Requirements</h3>
                  <div className="review-array">
                    <div className="review-array-section">
                      <strong>Responsibilities:</strong>
                      {formData.responsibilities.length > 0 ? (
                        <ul>
                          {formData.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="review-empty">
                          No responsibilities specified
                        </span>
                      )}
                    </div>
                    <div className="review-array-section">
                      <strong>Requirements:</strong>
                      {formData.requirements.length > 0 ? (
                        <ul>
                          {formData.requirements.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="review-empty">
                          No requirements specified
                        </span>
                      )}
                    </div>
                    <div className="review-array-section">
                      <strong>Skills:</strong>
                      {formData.skillsRequired.length > 0 ? (
                        <ul>
                          {formData.skillsRequired.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="review-empty">
                          No skills specified
                        </span>
                      )}
                    </div>
                    <div className="review-array-section">
                      <strong>Perks:</strong>
                      {formData.perks.length > 0 ? (
                        <ul>
                          {formData.perks.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="review-empty">No perks specified</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        handleInputChange("isActive", e.target.checked)
                      }
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    Publish job immediately
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          <div className="nav-buttons">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="nav-btn secondary"
              >
                Previous
              </button>
            )}

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="nav-btn primary"
                disabled={!validateStep(currentStep)}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="nav-btn submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Posting Job...
                  </>
                ) : (
                  "Post Job"
                )}
              </button>
            )}
          </div>

          <div className="step-indicator">
            Step {currentStep} of {steps.length}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;
