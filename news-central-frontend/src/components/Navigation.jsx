import { useState } from 'react';
import './Navigation.css';


const Navigation = () => {
   // État pour gérer l'image de fond
    const [backgroundImage, setBackgroundImage] = useState(
      "url('https://i.pinimg.com/736x/ee/d2/3e/eed23e06ccb7daf40cb7d7ad77b13d1c.jpg')" // Image par défaut
    );
  
    // Fonction pour changer l'image en fonction du filtre
    const handleNavigationClick = (category) => {
      switch (category) {
        case 'HOME':
          setBackgroundImage("url('https://i.pinimg.com/736x/ee/d2/3e/eed23e06ccb7daf40cb7d7ad77b13d1c.jpg')");
          break;
        case 'ENTERTAINMENT':
          setBackgroundImage("url('https://example.com/entertainment.jpg')");
          break;
        case 'BUSINESS':
          setBackgroundImage("url('https://example.com/business.jpg')");
          break;
        case 'LIFESTYLE':
          setBackgroundImage("url('https://example.com/lifestyle.jpg')");
          break;
        case 'TECHNOLOGY':
          setBackgroundImage("url('https://example.com/technology.jpg')");
          break;
        case 'PAGES':
          setBackgroundImage("url('https://example.com/pages.jpg')");
          break;
        default:
          setBackgroundImage("url('https://i.pinimg.com/736x/ee/d2/3e/eed23e06ccb7daf40cb7d7ad77b13d1c.jpg')");
      }
    };
    return (
      <nav className="main-nav">
        <div className="container">
          <div className="logo">
            <a href="/">
              <img src="https://i.pinimg.com/736x/e9/05/88/e905887f0889e833e7d02cb7e8978676.jpg" alt="ECHOIZ" />
              <span>News Central</span>
            </a>
          </div>
          <div className="nav-links">
            <ul>
              <li><a onClick={() => handleNavigationClick('HOME')} href="#">HOME</a></li>
              <li><a onClick={() => handleNavigationClick('ENTERTAINMENT')} href="#">ENTERTAINMENT</a></li>
              <li><a onClick={() => handleNavigationClick('BUSINESS')} href="#">BUSINESS</a></li>
              <li><a onClick={() => handleNavigationClick('LIFESTYLE')} href="#">LIFESTYLE</a></li>
              <li><a onClick={() => handleNavigationClick('TECHNOLOGY')} href="#">TECHNOLOGY</a></li>
              <li><a onClick={() => handleNavigationClick('PAGES')} href="#">PAGES</a></li>
            </ul>
          </div>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
          <div className="search-icon">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navigation;