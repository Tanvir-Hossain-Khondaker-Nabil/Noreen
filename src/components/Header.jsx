import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ cartCount }) {
  const [guestId, setGuestId] = useState(localStorage.getItem("guest_id") || "");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Sticky navbar logic
    const handleScroll = () => {
      const navbar = document.querySelector(".fy-nav");
      if (navbar) {
        const stickyOffset = navbar.offsetTop;
        if (window.scrollY > stickyOffset) {
          navbar.classList.add("sticky");
        } else {
          navbar.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Hide nav when route changes
    setIsNavVisible(false);
  }, [location]);

  const handleNavToggle = () => {
    setIsNavVisible((prev) => !prev);
  };

  const getActiveClass = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="container-fluid fy-bg mobile-navigation">
      <div className="container">
        <div className="row py-4 g-0 g-md-0">
          <div className="col-md-4 d-flex-start">
            <div className="fy-address d-lg-block d-none">
              <address>
                <i className="fa-solid fa-location-dot"></i>
                915 Oakville Cross Rd, Oakville, CA 94562
              </address>
            </div>
          </div>
          <div className="col-md-4 col-8 d-flex-center justify-content-between justify-content-lg-center">
            <div className="fy-logo">
              <img
                src={'https://noreen.pt/img/logo.png'}
                alt="Logo"
              />
            </div>
          </div>
          <div className="col-2 d-md-none d-flex justify-content-end align-items-center">
            <Link
              className="position-relative"
              to="/cart"
              style={{ cursor: "pointer" }}
            >
              <div
                className="fy-icon"
                style={{ width: "50px", height: "50px" }}
              >
                <i
                  className="fa-solid fa-cart-shopping"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <span className="cart-alert">
                <span>{cartCount}</span>
              </span>
            </Link>
          </div>
          <div className="col-2 d-md-none d-flex justify-content-end align-items-center">
            <div
              className="icon-nav d-lg-none d-flex"
              onClick={handleNavToggle}
            >
              <i className={`fas ${isNavVisible ? 'fa-times' : 'fa-bars'}`}></i>
            </div>
          </div>
          <div className="col-md-4 d-flex-end">
            <nav className="fy-socials d-lg-block d-none">
              <ul>
                <li className="m-0 me-lg-2">
                  <Link
                    className="position-relative"
                    to="/cart"
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="fy-icon"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <i
                        className="fa-solid fa-cart-shopping"
                        style={{ fontSize: "20px" }}
                      ></i>
                    </div>
                    <span className="cart-alert">
                      <span>{cartCount}</span>
                    </span>
                  </Link>
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
        <div className="row">
          <div className="col-12">
            <nav
              className={`fy-nav d-lg-block ${isNavVisible ? 'd-block' : 'd-none'}`}
              id="fy-nav"
            >
              <ul>
                <li className={getActiveClass("/")}>
                  <Link to="/" onClick={handleNavToggle}>Home</Link>
                </li>
                <li className={getActiveClass("/menu")}>
                  <Link to="/menu" onClick={handleNavToggle}>Menu</Link>
                </li>
                <li className={getActiveClass("/gallery")}>
                  <Link to="/gallery" onClick={handleNavToggle}>Gallery</Link>
                </li>
                <li className={getActiveClass("/about")}>
                  <Link to="/about" onClick={handleNavToggle}>About</Link>
                </li>
                <li className={getActiveClass("/contact")}>
                  <Link to="/contact" onClick={handleNavToggle}>Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
