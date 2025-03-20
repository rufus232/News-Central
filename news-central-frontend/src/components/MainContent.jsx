// import './MainContent.css';


// const MainContent = () => {
//     return (
//       <div className="main-content">
//         <div className="header-banner" style={{ backgroundImage: "url('https://i.pinimg.com/736x/ee/d2/3e/eed23e06ccb7daf40cb7d7ad77b13d1c.jpg')" }}>
//           <div className="container">
//             <div className="banner-content">
//               <div className="play-icon">
//                 <i className="fas fa-play"></i>
//               </div>
//               <h1>Latest News & Article</h1>
//               <p>Archives</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default MainContent;


import { useState } from "react";
import SearchFilters from "./SearchFilters";
import NewsGrid from "./NewsGrid";

const MainContent = ({ articles }) => {
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const handleSearch = (filters) => {
    let filtered = articles.filter((article) => 
      (!filters.query || article.title.toLowerCase().includes(filters.query.toLowerCase())) &&
      (!filters.category || article.category.toLowerCase() === filters.category.toLowerCase()) &&
      (!filters.startDate || new Date(article.date) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(article.date) <= new Date(filters.endDate))
    );

    setFilteredArticles(filtered);
  };

  return (
    <div className="main-content">
      <div className="header-banner" style={{ backgroundImage: "url('https://i.pinimg.com/736x/ee/d2/3e/eed23e06ccb7daf40cb7d7ad77b13d1c.jpg')" }}>
        <div className="container">
          <div className="banner-content">
            <div className="play-icon">
              <i className="fas fa-play"></i>
            </div>
            <h1>Latest News & Article</h1>
            <p>Archives</p>
          </div>
        </div>
      </div>

      {/* Ajout du filtre */}
      <div className="container">
        <SearchFilters onSearch={handleSearch} />
        <NewsGrid articles={filteredArticles} />
      </div>
    </div>
  );
};

export default MainContent;
