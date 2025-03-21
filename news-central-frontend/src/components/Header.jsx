import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");

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

  return (
    <header className="top-header">
      <div className="container">
        <div className="date-info">
          <span>{currentDate}</span>
        </div>
        <nav className="top-links">
          <a href="#">À Propos</a>
          <a href="#">Contact</a>
          <a href="#">Publicité</a>
          <button className="subscription-btn">S'abonner</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
