import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Icônes pour afficher/masquer le mot de passe
import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "User name",
    email: "mi@xpaytech.co",
    password: "",
  });

  const [editData, setEditData] = useState({ ...userData });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSave = () => {
    let valid = true;

    if (!validateEmail(editData.email)) {
      setEmailError("Veuillez entrer une adresse email valide.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(editData.password)) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    setUserData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEmailError("");
    setPasswordError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "/placeholder-profile.png"
  );
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);

      // 🔥 Déclenche l'événement pour que Header.jsx détecte la mise à jour
      window.dispatchEvent(new Event("storage"));
    }
  };
  

  

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">{isEditing ? "Edit Profile" : "Profile"}</div>
        <button className="back-button" onClick={() => navigate("/")}>Retour</button>
      </div>

      <div className="profile-content">
        <div className="profile-image-section">
         <div className="profile-image-container">
           <img src={profileImage} alt="Profile" className="profile-image" />
            <div className="camera-icon">
             <label htmlFor="profile-upload">
              <FaCamera />
             </label>
             <input
              id="profile-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
             />
            </div>
          </div>


          <div className="document-buttons">
            <button className="logo-btn">LOGO</button>
            <button className="vendor-docs-btn">
              <span className="upload-icon">↑</span>
              VENDOR DOCUMENTS
            </button>
          </div>
        </div>

        <div className="profile-details">
          {isEditing ? (
            <>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={editData.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={editData.email} onChange={handleChange} />
                {emailError && <p className="error-text">{emailError}</p>}
              </div>

              <div className="form-group password-group">
                <label>Password:</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={editData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
                {passwordError && <p className="error-text">{passwordError}</p>}
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>SAVE</button>
                <button className="cancel-btn" onClick={handleCancel}>CANCEL</button>
              </div>
            </>
          ) : (
            <>
              <div className="info-row">
                <div className="info-label">Name:</div>
                <div className="info-value">{userData.name}</div>
              </div>

              <div className="info-row">
                <div className="info-label">Email:</div>
                <div className="info-value">{userData.email}</div>
              </div>

              <button className="edit-profile-btn" onClick={handleEditClick}>
                <MdEdit /> EDIT PROFILE
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
