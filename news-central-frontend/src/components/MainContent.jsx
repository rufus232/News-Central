import React, { useState } from 'react';
import './MainContent.css';

const MainContent = () => {
  // État pour gérer l'image de fond
  const [backgroundImage, setBackgroundImage] = useState(
    "url('https://i.pinimg.com/736x/ee/d2/3e/eed23e06ccb7daf40cb7d7ad77b13d1c.jpg')" // Image par défaut
  );

  // État pour gérer le titre et la description
  const [content, setContent] = useState({
    title: 'Latest News & Article',
    description: 'Archives',
  });

  // Fonction pour changer l'image et le contenu en fonction du filtre
  const handleNavigationClick = (category) => {
    switch (category) {
      case 'HOME':
        setBackgroundImage("url('https://i.pinimg.com/736x/ee/d2/3e/eed23e06ccb7daf40cb7d7ad77b13d1c.jpg')");
        setContent({
          title: 'Welcome to News Central',
          description: 'Stay updated with the latest news.',
        });
        break;
      case 'ENTERTAINMENT':
        setBackgroundImage("url('https://i.pinimg.com/736x/6e/71/35/6e7135af455f4143c8eaf363c58d6f42.jpg')");
        setContent({
          title: 'Entertainment News',
          description: 'Catch up on the latest in movies, music, and more.',
        });
        break;
      case 'BUSINESS':
        setBackgroundImage("url('https://example.com/business.jpg')");
        setContent({
          title: 'Business Insights',
          description: 'Get the latest updates on the business world.',
        });
        break;
      case 'LIFESTYLE':
        setBackgroundImage("url('https://example.com/lifestyle.jpg')");
        setContent({
          title: 'Lifestyle Trends',
          description: 'Discover tips and trends for a better life.',
        });
        break;
      case 'TECHNOLOGY':
        setBackgroundImage("url('https://example.com/technology.jpg')");
        setContent({
          title: 'Tech Updates',
          description: 'Explore the latest in technology and innovation.',
        });
        break;
      case 'PAGES':
        setBackgroundImage("url('https://example.com/pages.jpg')");
        setContent({
          title: 'Explore Pages',
          description: 'Dive into various topics and categories.',
        });
        break;
      default:
        setBackgroundImage("url('https://i.pinimg.com/736x/ee/d2/3e/eed23e06ccb7daf40cb7d7ad77b13d1c.jpg')");
        setContent({
          title: 'Latest News & Article',
          description: 'Archives',
        });
    }
  };

  return (
    <div className="main-content">
      {/* Navigation */}
      <ul className="navigation">
        <li><a href="#" onClick={() => handleNavigationClick('HOME')}>HOME</a></li>
        <li><a href="#" onClick={() => handleNavigationClick('ENTERTAINMENT')}>ENTERTAINMENT</a></li>
        <li><a href="#" onClick={() => handleNavigationClick('BUSINESS')}>BUSINESS</a></li>
        <li><a href="#" onClick={() => handleNavigationClick('LIFESTYLE')}>LIFESTYLE</a></li>
        <li><a href="#" onClick={() => handleNavigationClick('TECHNOLOGY')}>TECHNOLOGY</a></li>
        <li><a href="#" onClick={() => handleNavigationClick('PAGES')}>PAGES</a></li>
      </ul>

      {/* Bannière */}
      <div className="header-banner" style={{ backgroundImage }}>
        <div className="container">
          <div className="banner-content">
            <div className="play-icon">
              <i className="fas fa-play"></i>
            </div>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;