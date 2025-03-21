import './Header.css';


const Header = () => {
    return (
      <header className="top-header">
        <div className="container">
          <div className="date-info">
            <span>Thu, 20 July 2023</span>
          </div>
          <div className="top-links">
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Advertise</a>
            <button className="subscription-btn">SUBSCRIPTION</button>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;