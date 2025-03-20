import './Footer.css';


const Footer = () => {
    return (
      <footer>
        <div className="main-footer">
          <div className="container">
            <div className="footer-widgets">
              <div className="footer-widget about-widget">
                <div className="footer-logo">
                  <img src="/images/logo.png" alt="ECHOIZ" />
                  <span>ECHOIZ</span>
                </div>
                <p>Aliquam ac officiis officisl clasa licinila magna platea sollicitutin phaselius commodo acsm.</p>
                <div className="social-links">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
              <div className="footer-widget links-widget">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Advertise</a></li>
                  <li><a href="#">Career</a></li>
                  <li><a href="#">Site Map</a></li>
                </ul>
              </div>
              <div className="footer-widget category-widget">
                <h4>Category</h4>
                <ul>
                  <li><a href="#">Lifestyle</a></li>
                  <li><a href="#">Business</a></li>
                  <li><a href="#">Entertainment</a></li>
                  <li><a href="#">Technology</a></li>
                  <li><a href="#">Healthcare</a></li>
                </ul>
              </div>
              <div className="footer-widget newsletter-widget">
                <h4>Newsletter</h4>
                <p>Sign up our newsletter to get update information, news and free insight.</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your email" />
                  <button type="submit">SIGN UP</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-footer">
          <div className="container">
            <div className="copyright">
              <p>Copyright © 2023 Echoiz. All rights reserved. Powered by MacReverie</p>
            </div>
            <div className="bottom-links">
              <a href="#">Terms of Use</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;