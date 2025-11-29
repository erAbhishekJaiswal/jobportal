import React, { useState } from "react";
import axios from "axios";
import "./CreateAdPage.css"; // import custom CSS
const BasseUrl = import.meta.env.VITE_BASE_URL
// === Helper functions ===
const getCloudinarySignature = async (folder = "ads_images") => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cloudinary/signature?folder=${folder}`);
  return res.data;
};

const uploadImagesToCloudinary = async (imageFiles, signatureData) => {
  const { timestamp, signature, cloudName, apiKey } = signatureData;
  const uploadedImages = [];

  for (const image of imageFiles) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", "ads_images");

    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    uploadedImages.push({
      public_id: uploadRes.data.public_id,
      url: uploadRes.data.secure_url,
    });
  }

  return uploadedImages;
};

// === Main Component ===
const CreateAdPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    contact: { name: "", phone: "", email: "" },
    tags: "",
    link: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["name", "phone", "email"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const signatureData = await getCloudinarySignature("ads_images");
      const uploadedImages = await uploadImagesToCloudinary(imageFiles, signatureData);

      const adPayload = {
        ...formData,
        image: uploadedImages[0]?.url,
        tags: formData.tags.split(",").map((t) => t.trim()),
      };

      const res = await axios.post(`${BasseUrl}/ads/`, adPayload);

      setMessage("✅ Ad created successfully!");
      console.log("Created Ad:", res.data);

      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        contact: { name: "", phone: "", email: "" },
        tags: "",
        link: "",
      });
      setImageFiles([]);
    } catch (error) {
      console.error("Error creating ad:", error);
      setMessage("❌ Failed to create ad. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-ad-container">
      <h2 className="create-ad-title">Create a New Ad</h2>

      <form className="create-ad-form" onSubmit={handleSubmit}>
        <div className="create-ad-field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Ad title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="create-ad-field">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Ad description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="create-ad-row">
          <div className="create-ad-field">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="create-ad-field">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="create-ad-section">
          <h4>Contact Information</h4>
          <div className="create-ad-fields">
          <div className="create-ad-field">
            <input
              type="text"
              name="name"
              placeholder="Contact Name"
              value={formData.contact.name}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="create-ad-field">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.contact.phone}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="create-ad-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.contact.email}
            className="input"
            onChange={handleChange}
          />
          </div>
          </div>
        </div>

        <div className="create-ad-field">
          <label>Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="create-ad-field">
          <label>Link</label>
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>

        <div className="create-ad-field">
          <label>Upload Image</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        </div>

        <button className="create-ad-btn" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Ad"}
        </button>
      </form>

      {message && <p className="create-ad-message">{message}</p>}
    </div>
  );
};

export default CreateAdPage;
