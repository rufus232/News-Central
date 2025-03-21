import NewsGrid from "./NewsGrid";



const MainContent = ({ articles }) => {
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

      <div className="container">
        <NewsGrid articles={articles} />
      </div>
    </div>
  );
};

export default MainContent;

