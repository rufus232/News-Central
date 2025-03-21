import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import "./Header.css";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate(); // Hook pour la navigation
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage")||"/placeholder-profile.png"); // Image par défaut

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);


  useEffect(() => {
    // ✅ Écouteur pour détecter les mises à jour d'image
    const handleStorageChange = () => {
      const updatedImage = localStorage.getItem("profileImage");
      if (updatedImage) {
        setProfileImage(updatedImage);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  return (
    <header className="top-header">
      <div className="container">
        <div className="date-info">
          <span>{currentDate}</span>
        </div>

        
        {/* Avatar du User à l'extrême droite */}
        <img
          src={profileImage} // Remplace par l'URL de l'utilisateur
          alt="User Avatar"
          className="user-avatar"
          onClick={() => navigate("/profile")}
        />
      </div>
    </header>
  );
};

export default Header;