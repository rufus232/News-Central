// components/Homepage.jsx - Composant complet pour la page d'accueil
import { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import MainContent from './MainContent';
import NewsGrid from './NewsGrid';
import Footer from './Footer';

function Homepage() {
  const [articles] = useState([
    {
      id: 1,
      category: 'ENTERTAINMENT',
      title: "Concert for Bangladesh: Photos From the First-Ever Rock 'n' Roll Benefit Show",
      image: 'https://i.pinimg.com/474x/68/ff/01/68ff01761ebbc09719c512c9cc1f2e6d.jpg',
      content: 'Sem qrisus senevet laculs cras mattis sollicitudin tristique. Turpis scelerisque vitae phaselius nisi pretium. Urna tempor vehicula nascetur effictur euismod feugiat eleifendotu mollis laculs suscipit',
      date: 'July 18, 2023',
      comments: 0
    },
    {
      id: 2,
      category: 'TECHNOLOGY',
      title: 'The Intersection of Smartphone Technology and Music Appreciation',
      image: 'https://i.pinimg.com/736x/ee/ad/a4/eeada46772a587a3d1c6fd96fc9a2a58.jpg',
      content: 'Sem qrisus senevet laculs cras mattis sollicitudin tristique. Turpis scelerisque vitae phaselius nisi pretium. Urna tempor vehicula nascetur effictur euismod feugiat eleifendotu mollis laculs suscipit',
      date: 'July 18, 2023',
      comments: 0
    },
    {
      id: 3,
      category: 'BUSINESS',
      title: 'Empowering Healthcare Industry: How Virtual Reality Drives Business Progress',
      image: 'https://i.pinimg.com/474x/2e/66/d5/2e66d593c9078d34b05c14facfdd0545.jpg',
      content: 'Sem qrisus senevet laculs cras mattis sollicitudin tristique. Turpis scelerisque vitae phaselius nisi pretium. Urna tempor vehicula nascetur effictur euismod feugiat eleifendotu mollis laculs suscipit',
      date: 'July 18, 2023',
      comments: 50
    },
    {
      id: 4,
      category: 'ENTERTAINMENT',
      title: 'Here\'s How to Take Better Food Photos With Your iPhone',
      image: 'https://i.pinimg.com/474x/15/14/f0/1514f01bddc7fd63204bbf311f28cfa0.jpg',
      content: 'Sem qrisus senevet laculs cras mattis sollicitudin tristique. Turpis scelerisque vitae phaselius nisi pretium. Urna tempor vehicula nascetur effictur euismod feugiat eleifendotu mollis laculs suscipit',
      date: 'July 18, 2023',
      comments: 0
    },
    {
      id: 5,
      category: 'BUSINESS',
      title: 'Facebook Stock Soars After Strong Earnings Report',
      image: 'https://i.pinimg.com/736x/4b/98/11/4b9811de1c649b9b1f57a6b83733f8ac.jpg',
      content: 'Sem qrisus senevet laculs cras mattis sollicitudin tristique. Turpis scelerisque vitae phaselius nisi pretium. Urna tempor vehicula nascetur effictur euismod feugiat eleifendotu mollis laculs suscipit',
      date: 'July 18, 2023',
      comments: 0
    },
    {
      id: 6,
      category: 'LIFESTYLE',
      title: 'How Consistent Jogging Enhances Physical and Mental Health',
      image: 'https://i.pinimg.com/474x/1d/6d/bd/1d6dbd2da724b8cec8503a0b119bc3c9.jpg',
      content: 'Sem qrisus senevet laculs cras mattis sollicitudin tristique. Turpis scelerisque vitae phaselius nisi pretium. Urna tempor vehicula nascetur effictur euismod feugiat eleifendotu mollis laculs suscipit',
      date: 'July 18, 2023',
      comments: 0
    },
    {
      id: 7,
      category: 'BUSINESS',
      title: 'Go Behind the Scenes of Apple\'s First iPhone Release',
      image: 'https://i.pinimg.com/474x/31/3c/88/313c887c56b7eef418cb5396fd9ced53.jpg',
      content: 'Sem qrisus senevet laculs cras mattis sollicitudin tristique. Turpis scelerisque vitae phaselius nisi pretium. Urna tempor vehicula nascetur effictur euismod feugiat eleifendotu mollis laculs suscipit',
      date: 'July 18, 2023',
      comments: 0
    },
    {
      id: 8,
      category: 'TECHNOLOGY',
      title: 'Polaroid Gets the Museum It\'s Long Deserved',
      image: 'https://i.pinimg.com/474x/88/ab/fd/88abfdebfb23048d9156fce8c5c238d0.jpg',
      content: 'Sem qrisus senevet laculs cras mattis sollicitudin tristique. Turpis scelerisque vitae phaselius nisi pretium. Urna tempor vehicula nascetur effictur euismod feugiat eleifendotu mollis laculs suscipit',
      date: 'July 18, 2023',
      comments: 0
    },
    {
      id: 9,
      category: 'LIFESTYLE',
      title: 'Cruising Solo: 5 Tips For Solo Cruise Travelers',
      image: 'https://i.pinimg.com/474x/b8/ba/38/b8ba38e4935eb56131d22892239e0b08.jpg',
      content: 'Sem qrisus senevet laculs cras mattis sollicitudin tristique. Turpis scelerisque vitae phaselius nisi pretium. Urna tempor vehicula nascetur effictur euismod feugiat eleifendotu mollis laculs suscipit',
      date: 'July 18, 2023',
      comments: 0
    }
  ]);
  
  return (
    <div className="homepage">
      <Header />
      <Navigation />
      <MainContent />
      <NewsGrid articles={articles} />
      <div className="load-more-container">
        <button className="load-more-btn">LOAD MORE</button>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;