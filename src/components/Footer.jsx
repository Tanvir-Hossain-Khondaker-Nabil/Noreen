import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className="row m-0">
          <div className="col-12">
            <nav className="fy-socials">
              <ul>
                <li className="fy-social-twitter">
                  <a
                    href="https://twitter.com/"
                    title="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="fy-icon">
                      <i className="fa-brands fa-twitter"></i>
                    </div>
                  </a>
                </li>
                <li className="fy-social-facebook">
                  <a
                    href="https://facebook.com/"
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="fy-icon">
                      <i className="fa-brands fa-facebook-f"></i>
                    </div>
                  </a>
                </li>
                <li className="fy-social-tripadvisor">
                  <a
                    href="https://tripadvisor.com/"
                    title="TripAdvisor"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="fy-icon">
                      <i className="fa-brands fa-earlybirds"></i>
                    </div>
                  </a>
                </li>
                <li className="fy-social-yelp">
                  <a
                    href="https://yelp.com/"
                    title="Yelp"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="fy-icon">
                      <i className="fa-brands fa-yelp"></i>
                    </div>
                  </a>
                </li>
                <li className="fy-social-zomato">
                  <a
                    href="https://zomato.com/"
                    title="Zomato"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="fy-icon">
                      <i className="fa-solid fa-circle-notch"></i>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12">
            <nav className="footer-nav">
              <ul>              
                <li>
                  <Link className="active" to="/">Home</Link>
                </li>
                <li>
                  <Link to="/menu">Menu</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
                <li>
                <Link Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12">
            <p className="copyright-section">
              Developed by <a href="https://rcreation-bd.com/">RCreation</a>.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
