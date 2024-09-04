import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Url from "../components/Url.jsx";
import { Link } from "react-router-dom";

// Function to truncate text to a certain number of words
const truncateDescription = (description, wordLimit =10) => {
  if (!description) return "No description available";

  const words = description.split(' ');
  if (words.length <= wordLimit) return description;

  return `${words.slice(0, wordLimit).join(' ')}...`;
};

function Home() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [bookingPerson, setBookingPerson] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const swiperSettings = {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    speed: 600,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Url}/api/item_get`);
        setItems(response.data);
      } catch (error) {
        console.error("Error:", error.message);
        setError("Unable to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${Url}/api/booking`, {
        date: bookingDate,
        time: bookingTime,
        persons: bookingPerson,
      });
      setShowPopup(true);
    } catch (error) {
      console.error("There was an error placing the booking!", error);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="slider">
        <Swiper {...swiperSettings}>
          {[1, 2, 3].map((index) => (
            <SwiperSlide key={index} className="swiper-slider-bar">
              <img
                src={'https://noreen.pt/img/slider.jpg'}
                alt={`Slide ${index}`}
              />
              <div className="fy-caption">
                <header className="fy-caption-header">
                  <h2>Ingredients Grown on Our Fields</h2>
                </header>
                <div className="fy-caption-content fy-content">
                  <p>
                    Enjoy the food experience from our fields, through our
                    kitchen,
                    <br /> and to your fork.
                  </p>
                </div>
                <div className="fy-caption-footer">
                  <div className="fy-caption-buttons">
                    <a
                      href="#"
                      className="book-table"
                      style={{ cursor: "pointer" }}
                    >
                      Book a Table
                    </a>
                    <a
                      href="#"
                      className="book-event"
                      style={{ cursor: "pointer" }}
                    >
                      Book an Event
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="booking">
          <form onSubmit={handleSubmit}>
            <select
              value={bookingPerson}
              onChange={(e) => setBookingPerson(e.target.value)}
            >
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1} {n === 0 ? "Person" : "People"}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Select Date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="Select Time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />

            <button type="submit">
              <span
                className="eltdf-btn-before-line"
                style={{ height: 50, left: 47 }}
              />
              <span className="eltdf-btn-text">Book Now</span>
              <span
                className="eltdf-btn-after-line"
                style={{ height: 50, left: "109.516px" }}
              />
            </button>
          </form>
        </div>
      </section>
      <section className="container">
        <div className="row">
          {items.map((item) => (
            <div key={item.id} className="col-md-4 d-flex-center">
              <div className="product">
                <div className="product-image">
                  <img
                    src={`${Url}/${item.photo}`}
                    style={{ cursor: "pointer" }}
                    alt={item.title}
                  />
                </div>
                <div className="product-caption">
                  <h3 className="woocommerce-loop-product__title">
                    <Link
                      to={`/product/${item.id}`}
                      style={{ cursor: "pointer" }}
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <span className="screen-reader-text">
                  {truncateDescription(item.description)}
                  </span>
                  <p className="price">
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        <span className="woocommerce-Price-currencySymbol">
                          € {item.price}
                        </span>
                      </bdi>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="container-fluid fy-section">
        <div className="px-0 px-lg-5">
          <div className="row gap-5 gap-lg-0 m-0">
            <div className="col-md-4 d-flex-center">
              <div className="fy_banner">
                <div className="fy-widget-image fy-image-cover">
                  <img
                    src={`https://noreen.pt/img/booking.jpg`}
                    alt="Banner"
                  />
                </div>
                <div className="fy-widget-centerer">
                  <h3 className="fy-widget-title">
                    <span>
                      <a
                        href="/winery/reservations/"
                        contentEditable="false"
                        style={{ cursor: "pointer" }}
                      >
                        Book a Table Online
                      </a>
                    </span>
                  </h3>
                  <div className="fy-widget-content">
                    <p>
                      Use our online reservation form to book your table in a
                      restaurant, bar or cellar.
                    </p>
                  </div>
                  <div className="fy-button-container">
                    <a
                      className="fy-button fy-button-bordered"
                      href="/winery/reservations/"
                      style={{ cursor: "pointer" }}
                    >
                      Book a Table
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex-center">
              <div className="fy_opening_hours">
                <h3 className="fy-widget-title">
                  <span>Opening Hours</span>
                </h3>
                <div className="hr"></div>
                <div className="fy-widget-content">
                  <p>
                    Get some tomatoes, and, if they were eaten with the great
                    extravagance to season with butter.
                  </p>
                </div>
                <div className="row">
                  <div className="col-6">
                    <strong>Monday</strong>
                  </div>
                  <div className="col-6 text-end">
                    <span>Closed</span>
                  </div>
                </div>
                <div className="hr-row"></div>
                <div className="row">
                  <div className="col-6">
                    <strong>Tuesday</strong>
                  </div>
                  <div className="col-6 text-end">
                    <span>10:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <div className="hr-row"></div>
                <div className="row">
                  <div className="col-6">
                    <strong>Wednesday</strong>
                  </div>
                  <div className="col-6 text-end">
                    <span>10:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <div className="hr-row"></div>
                <div className="row">
                  <div className="col-6">
                    <strong>Thursday</strong>
                  </div>
                  <div className="col-6 text-end">
                    <span>10:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <div className="hr-row"></div>
                <div className="row">
                  <div className="col-6">
                    <strong>Friday</strong>
                  </div>
                  <div className="col-6 text-end">
                    <span>10:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <div className="hr-row"></div>
                <div className="row">
                  <div className="col-6">
                    <strong>Saturday</strong>
                  </div>
                  <div className="col-6 text-end">
                    <span>10:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <div className="hr-row"></div>
                <div className="row">
                  <div className="col-6">
                    <strong>Sunday</strong>
                  </div>
                  <div className="col-6 text-end">
                    <span>10:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex-center">
              <div className="fy_about d-flex-center flex-column">
                <h3 className="fy-widget-title">
                  <span>About Us</span>
                </h3>
                <div className="hr"></div>
                <div className="fy-widget-content fy-content">
                  <p>
                    Take your sauce with bread-crumbs, and pour in salted water,
                    and put one-quarter the fire. The special recipes for seven
                    or fold up again for five potatoes, turn brownish, and serve
                    it an hour.
                  </p>
                  <p>
                    Put on slowly, in salted water and, if you wish; sprinkle
                    into slices. Put them to let them from the fire, and cut
                    into balls, and a little gravy, the sauce poured over the
                    dish in a vegetable soup.
                  </p>
                </div>
                <a
                  href="/winery/about/"
                  className="fy-button fy-button-bordered"
                  contentEditable="false"
                  style={{ cursor: "pointer" }}
                >
                  About Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h1>Successfully Booking!</h1>
            <button
              className="btn btn-sm btn-primary mt-4"
              onClick={() => setShowPopup(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
