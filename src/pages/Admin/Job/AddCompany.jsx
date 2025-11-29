import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./AddCompany.css";
const BasseUrl = import.meta.env.VITE_BASE_URL

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    mission: "",
    foundedYear: "",
    industry: "",
    companySize: "",
    headquarters: "",
    culture: "",
    benefitsAndPerks: "",
    logoUrl: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Company name is required!");
      return;
    }

    const payload = {
      ...formData,
      culture: formData.culture.split(",").map((item) => item.trim()),
      benefitsAndPerks: formData.benefitsAndPerks
        .split(",")
        .map((item) => item.trim()),
    };

    try {
      setLoading(true);
      const response = await axios.post(`${BasseUrl}/companies/`, payload);
      toast.success("✅ Company created successfully!");
      console.log(response.data);

      setFormData({
        name: "",
        about: "",
        mission: "",
        foundedYear: "",
        industry: "",
        companySize: "",
        headquarters: "",
        culture: "",
        benefitsAndPerks: "",
        logoUrl: "",
        website: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Something went wrong while adding company."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addcompany-container">
      <div className="addcompany-card">
        <h2 className="addcompany-title">Add New Company</h2>

        <form onSubmit={handleSubmit} className="addcompany-form">
          {/* Company Name */}
          <div className="addcompany-field">
            <label className="addcompany-label">Company Name *</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. KumarInfoTech"
              value={formData.name}
              onChange={handleChange}
              className="addcompany-input"
              required
            />
          </div>

          {/* About */}
          <div className="addcompany-field">
            <label className="addcompany-label">About</label>
            <textarea
              name="about"
              rows="3"
              placeholder="Write a brief about the company..."
              value={formData.about}
              onChange={handleChange}
              className="addcompany-textarea"
            />
          </div>

          {/* Mission */}
          <div className="addcompany-field">
            <label className="addcompany-label">Mission</label>
            <input
              type="text"
              name="mission"
              placeholder="e.g. Empower businesses with AI solutions"
              value={formData.mission}
              onChange={handleChange}
              className="addcompany-input"
            />
          </div>

          {/* Founded Year, Industry */}
          <div className="addcompany-row">
            <div className="addcompany-field">
              <label className="addcompany-label">Founded Year</label>
              <input
                type="number"
                name="foundedYear"
                placeholder="e.g. 2020"
                value={formData.foundedYear}
                onChange={handleChange}
                className="addcompany-input"
              />
            </div>
            <div className="addcompany-field">
              <label className="addcompany-label">Industry</label>
              <input
                type="text"
                name="industry"
                placeholder="e.g. Software Development"
                value={formData.industry}
                onChange={handleChange}
                className="addcompany-input"
              />
            </div>
          </div>

          {/* Size & Headquarters */}
          <div className="addcompany-row">
            <div className="addcompany-field">
              <label className="addcompany-label">Company Size</label>
              <input
                type="text"
                name="companySize"
                placeholder="e.g. 51-200 employees"
                value={formData.companySize}
                onChange={handleChange}
                className="addcompany-input"
              />
            </div>
            <div className="addcompany-field">
              <label className="addcompany-label">Headquarters</label>
              <input
                type="text"
                name="headquarters"
                placeholder="e.g. Bangalore, India"
                value={formData.headquarters}
                onChange={handleChange}
                className="addcompany-input"
              />
            </div>
          </div>

          {/* Culture */}
          <div className="addcompany-field">
            <label className="addcompany-label">Culture (comma separated)</label>
            <input
              type="text"
              name="culture"
              placeholder="e.g. Innovation-driven, Remote-first"
              value={formData.culture}
              onChange={handleChange}
              className="addcompany-input"
            />
          </div>

          {/* Benefits */}
          <div className="addcompany-field">
            <label className="addcompany-label">Benefits & Perks (comma separated)</label>
            <input
              type="text"
              name="benefitsAndPerks"
              placeholder="e.g. Health insurance, Paid leaves"
              value={formData.benefitsAndPerks}
              onChange={handleChange}
              className="addcompany-input"
            />
          </div>

          {/* Logo URL & Website */}
          <div className="addcompany-row">
            <div className="addcompany-field">
              <label className="addcompany-label">Logo URL</label>
              <input
                type="text"
                name="logoUrl"
                placeholder="https://example.com/logo.png"
                value={formData.logoUrl}
                onChange={handleChange}
                className="addcompany-input"
              />
            </div>
            <div className="addcompany-field">
              <label className="addcompany-label">Website</label>
              <input
                type="text"
                name="website"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleChange}
                className="addcompany-input"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="addcompany-submitbtn"
          >
            {loading ? "Creating Company..." : "Add Company"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
