// import './Navigation.css';
// import { useState } from "react";

// const Navigation = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch({ query: searchQuery }); // Met à jour la recherche globale
//   };
//     return (
//       <nav className="main-nav">
//         <div className="container">
//           <div className="logo">
//             <a href="/">
//               <img src="https://i.pinimg.com/736x/e9/05/88/e905887f0889e833e7d02cb7e8978676.jpg" alt="ECHOIZ" />
//               <span>News Central</span>
//             </a>
//           </div>
//           <div className="nav-links">
//             <ul>
//               <li><a href="#">HOME</a></li>
//               <li><a href="#">ENTERTAINMENT</a></li>
//               <li><a href="#">BUSINESS</a></li>
//               <li><a href="#">LIFESTYLE</a></li>
//               <li><a href="#">TECHNOLOGY</a></li>
//               <li><a href="#">PAGES</a></li>
//             </ul>
//           </div>
//           <div className="social-links">
//             <a href="#"><i className="fab fa-facebook-f"></i></a>
//             <a href="#"><i className="fab fa-twitter"></i></a>
//             <a href="#"><i className="fab fa-instagram"></i></a>
//             <a href="#"><i className="fab fa-youtube"></i></a>
//           </div>


//           <div className="search-bar">
//           <form onSubmit={handleSearch} className="search-form">
//             <input
//               type="text"
//               placeholder="Rechercher..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//             <button type="submit" className="search-icon">
//               <i className="fas fa-search"></i>
//             </button>
//           </form>
//         </div>

        
//         </div>
//       </nav>
//     );
//   };
  
//   export default Navigation;
// Navigation.jsx - Supprimé la barre de recherche
import './Navigation.css';

const Navigation = () => {
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
            <li><a href="#">HOME</a></li>
            <li><a href="#">ENTERTAINMENT</a></li>
            <li><a href="#">BUSINESS</a></li>
            <li><a href="#">LIFESTYLE</a></li>
            <li><a href="#">TECHNOLOGY</a></li>
            <li><a href="#">PAGES</a></li>
          </ul>
        </div>
        <div className="social-links">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;