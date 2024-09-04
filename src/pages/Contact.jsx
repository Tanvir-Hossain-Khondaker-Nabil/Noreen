import React, { useState } from "react";
import axios from "axios";
import Url from "../components/Url.jsx";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(""); // Clear previous status message

    try {
      const response = await axios.post(`${Url}/api/contact`, formData);

      // Check if response has status code 200 or 201 for successful responses
      if (response.status === 200 || response.status === 201) {
        setStatusMessage("Your message was sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
      } else {
        setStatusMessage("There was an issue sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Check for specific error response if available
      if (error.response && error.response.data) {
        setStatusMessage(`Error: ${error.response.data.message || "There was an issue sending your message. Please try again."}`);
      } else {
        setStatusMessage("There was an issue sending your message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5">
      {/* Contact section start */}
      <section className="contact section-padding">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-lg-5">
              <div className="contact-info-wrapper mb-5 mb-lg-0">
                <h3>
                  What's your story? <span>Get in touch</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores Feel Free to contact us
                </p>

                <div className="contact-item">
                  <i className="fa fa-envelope"></i>
                  <h5>support@email.com</h5>
                </div>

                <div className="contact-item">
                  <i className="fa fa-phone-alt"></i>
                  <h5>+45 234 345467</h5>
                </div>

                <div className="contact-item">
                  <i className="fa fa-map-marker"></i>
                  <h5>Moon Street Light Avenue, 14/05 Jupiter</h5>
                </div>
              </div>
            </div>

            <div className="col-xl-7 col-lg-6">
              <form className="contact__form form-row" onSubmit={handleSubmit}>
                {statusMessage && (
                  <div
                    className={`alert ${
                      statusMessage.includes("successfully")
                        ? "alert-success"
                        : "alert-danger"
                    } contact__msg`}
                    role="alert"
                  >
                    {statusMessage}
                  </div>
                )}

                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        id="message"
                        name="message"
                        cols="30"
                        rows="6"
                        className="form-control"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="text-center">
                    <button
                      className="btn btn-main w-100 rounded"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Contact section End */}
    </div>
  );
};

export default Contact;
