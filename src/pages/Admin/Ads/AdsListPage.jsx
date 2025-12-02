import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdsListPage.css";
import { useNavigate } from "react-router-dom";
const BasseUrl = import.meta.env.VITE_BASE_URL
import { toast } from "react-hot-toast";
import { getToken} from "../../../utils/localstorage";

const AdsListPage = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingAd, setEditingAd] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    status: "",
    tags: "",
    contactEmail: "",
    contactPhone: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch ads
  const fetchAds = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BasseUrl}/ads`, {
        params: { search, category, status, page },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAds(res.data.ads);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching ads:", err);
      setMessage("Failed to load ads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [search, category, status, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      await axios.delete(`${BasseUrl}/ads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Ad deleted successfully");
      fetchAds();
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("Error deleting ad.");
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title || "",
      description: ad.description || "",
      price: ad.price || "",
      category: ad.category || "",
      status: ad.status || "pending",
      tags: Array.isArray(ad.tags) ? ad.tags.join(", ") : ad.tags || "",
      contactEmail: ad.contactEmail || "",
      contactPhone: ad.contactPhone || ""
    });
    setIsEditModalOpen(true);
  };

  // ✅ Close Edit Modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingAd(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      status: "",
      tags: "",
      contactEmail: "",
      contactPhone: ""
    });
  };

  // ✅ Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Submit Edit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        price: formData.price ? parseInt(formData.price) : 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await axios.put(
        `${BasseUrl}/ads/${editingAd._id}`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the ads list with the updated ad
      setAds(ads.map(ad => 
        ad._id === editingAd._id ? response.data.ad : ad
      ));
      
      handleCloseModal();
      toast.success("Ad updated successfully");
      setMessage("Ad updated successfully!");
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      toast.error("Failed to update ad");
      console.error("Update failed:", err);
      setMessage("Failed to update ad.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ads-list-container">
      
      <div className="created-new-ad-button">
        <h2 className="ads-list-title">Manage Ads</h2>
        <button
          className="ads-list-btn"
          onClick={() => navigate("/admin/create/ads")}
        >
          Add New Ad
        </button>
      </div>

      {/* Filters */}
      <div className="ads-list-filters">
        <input
          type="text"
          placeholder="Search by title or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="real_estate">Real Estate</option>
          <option value="vehicles">Vehicles</option>
          <option value="jobs">Jobs</option>
          <option value="services">Services</option>
          <option value="electronics">Electronics</option>
          <option value="others">Others</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Ad List */}
      {loading ? (
        <p className="ads-list-loading">Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="ads-list-empty">No ads found.</p>
      ) : (
        <div className="ads-list-grid">
          {ads?.map((ad) => (
            <div key={ad?._id} className="ads-list-card">
              <img
                src={ad?.image || "https://via.placeholder.com/150"}
                alt={ad?.title}
                className="ads-list-img"
              />
              <div className="ads-list-info">
                <h3>{ad?.title}</h3>
                <p className="ads-list-category">{ad?.category}</p>
                <div className="ads-list-price-status">
                  <p className="ads-list-price">₹{ad?.price || "N/A"}</p>
                  <p className={`ads-list-status status-${ad?.status}`}>{ad?.status}</p>
                </div>
              </div>
              <div className="ads-list-actions">
                <button 
                  className="btn-edit" 
                  onClick={() => handleEdit(ad)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(ad?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="ads-list-pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀ Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next ▶
        </button>
      </div>

      {message && <p className="ads-list-message">{message}</p>}

      {/* ✅ Edit Modal */}
      {isEditModalOpen && (
        <div className="ads-modal-overlay">
          <div className="ads-modal">
            <div className="ads-modal-header">
              <h2>Edit Advertisement</h2>
              <button 
                className="ads-modal-close" 
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="ads-modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price (₹):</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category:</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="jobs">Jobs</option>
                    <option value="services">Services</option>
                    <option value="electronics">Electronics</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="sold">Sold</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactEmail">Contact Email:</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactPhone">Contact Phone:</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags (comma separated):</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="ads-modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-save"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsListPage;