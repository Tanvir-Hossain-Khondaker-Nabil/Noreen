import React, { useState, useEffect } from "react";
import axios from "axios";
import Url from "../components/Url.jsx";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(data)
  const [cartData, setCartData] = useState(data?.cartItems || []);

  // Billing state
  const [BillingName, setBillingName] = useState("");
  const [BillingEmail, setBillingEmail] = useState("");
  const [BillingPhone, setBillingPhone] = useState("");
  const [BillingAddress, setBillingAddress] = useState("");
  const [BillingCity, setBillingCity] = useState("");
  const [BillingState, setBillingState] = useState("");
  const [BillingZip, setBillingZip] = useState("");

  // Shipping state
  const [ShippingName, setShippingName] = useState("");
  const [ShippingAddress, setShippingAddress] = useState("");
  const [ShippingCity, setShippingCity] = useState("");
  const [ShippingState, setShippingState] = useState("");
  const [ShippingZip, setShippingZip] = useState("");

  // Error states
  const [billingNameError, setBillingNameError] = useState("");
  const [billingEmailError, setBillingEmailError] = useState("");
  const [billingPhoneError, setBillingPhoneError] = useState("");
  const [billingAddressError, setBillingAddressError] = useState("");
  const [billingCityError, setBillingCityError] = useState("");
  const [billingStateError, setBillingStateError] = useState("");
  const [billingZipError, setBillingZipError] = useState("");

  const [shippingNameError, setShippingNameError] = useState("");
  const [shippingAddressError, setShippingAddressError] = useState("");
  const [shippingCityError, setShippingCityError] = useState("");
  const [shippingStateError, setShippingStateError] = useState("");
  const [shippingZipError, setShippingZipError] = useState("");

  const [Subtotal, setSubtotal] = useState(data?.subtotal || []);
  const [Total, setTotal] = useState(data?.total || []);
  const [GuestId, setGuestId] = useState(data?.guestId || "");

  const dis = (Subtotal - Total)

  const [PaymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [showPopup, setShowPopup] = useState(false);

  const [discount, setDiscount] = useState(dis); // Discount state

  const navigate = useNavigate();



  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    let isValid = true;
    setBillingNameError("");
    setBillingEmailError("");
    setBillingPhoneError("");
    setBillingAddressError("");
    setBillingCityError("");
    setBillingStateError("");
    setBillingZipError("");
    setShippingNameError("");
    setShippingAddressError("");
    setShippingCityError("");
    setShippingStateError("");
    setShippingZipError("");

    // Validate Billing Information
    if (!BillingName) {
      setBillingNameError("Please enter your name.");
      isValid = false;
    }
    if (!BillingEmail) {
      setBillingEmailError("Please enter your email.");
      isValid = false;
    }
    if (!BillingPhone) {
      setBillingPhoneError("Please enter your phone number.");
      isValid = false;
    }
    if (!BillingAddress) {
      setBillingAddressError("Please enter your address.");
      isValid = false;
    }
    if (!BillingCity) {
      setBillingCityError("Please enter your city.");
      isValid = false;
    }
    if (!BillingState) {
      setBillingStateError("Please enter your state.");
      isValid = false;
    }
    if (!BillingZip) {
      setBillingZipError("Please enter your zip code.");
      isValid = false;
    }

    // Validate Shipping Information
    if (!ShippingName) {
      setShippingNameError("Please enter the recipient's name.");
      isValid = false;
    }
    if (!ShippingAddress) {
      setShippingAddressError("Please enter the recipient's address.");
      isValid = false;
    }
    if (!ShippingCity) {
      setShippingCityError("Please enter the recipient's city.");
      isValid = false;
    }
    if (!ShippingState) {
      setShippingStateError("Please enter the recipient's state.");
      isValid = false;
    }
    if (!ShippingZip) {
      setShippingZipError("Please enter the recipient's zip code.");
      isValid = false;
    }

    if (!isValid) return;

    // Submit the form if all inputs are valid
    try {
      const response = await axios.post(`${Url}/api/checkout`, {
        billing_name: BillingName,
        billing_email: BillingEmail,
        billing_phone: BillingPhone,
        billing_address: BillingAddress,
        billing_city: BillingCity,
        billing_state: BillingState,
        billing_zip: BillingZip,
        shipping_name: ShippingName,
        shipping_address: ShippingAddress,
        shipping_city: ShippingCity,
        shipping_state: ShippingState,
        shipping_zip: ShippingZip,
        subtotal: Subtotal,
        discount: discount,
        total: Total,
        guest_id: GuestId,
      });
      console.log("Order placed successfully", response.data);
      setShowPopup(true);
    } catch (error) {
      console.error("There was an error placing the order!", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-5">
        <div className="cart-container my-5">
          <h2 className="mb-4">Checkout</h2>

          <table className="cart-table checkout-table">
            <thead>
              <tr>
                <th>Billing Information</th>
                <th>Shipping Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Billing Information">
                  {/* Billing Information Fields */}
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={BillingName}
                      onChange={(e) => setBillingName(e.target.value)}
                    />
                    {billingNameError && (
                      <p className="text-danger">{billingNameError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={BillingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                    />
                    {billingEmailError && (
                      <p className="text-danger">{billingEmailError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your phone number"
                      value={BillingPhone}
                      onChange={(e) => setBillingPhone(e.target.value)}
                    />
                    {billingPhoneError && (
                      <p className="text-danger">{billingPhoneError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your address"
                      value={BillingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                    />
                    {billingAddressError && (
                      <p className="text-danger">{billingAddressError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your city"
                      value={BillingCity}
                      onChange={(e) => setBillingCity(e.target.value)}
                    />
                    {billingCityError && (
                      <p className="text-danger">{billingCityError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your state"
                      value={BillingState}
                      onChange={(e) => setBillingState(e.target.value)}
                    />
                    {billingStateError && (
                      <p className="text-danger">{billingStateError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your zip code"
                      value={BillingZip}
                      onChange={(e) => setBillingZip(e.target.value)}
                    />
                    {billingZipError && (
                      <p className="text-danger">{billingZipError}</p>
                    )}
                  </div>
                </td>
                <td  data-label="Shipping Information">
                  {/* Shipping Information Fields */}
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter recipient's name"
                      value={ShippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                    />
                    {shippingNameError && (
                      <p className="text-danger">{shippingNameError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter recipient's address"
                      value={ShippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    />
                    {shippingAddressError && (
                      <p className="text-danger">{shippingAddressError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter recipient's city"
                      value={ShippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                    />
                    {shippingCityError && (
                      <p className="text-danger">{shippingCityError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter recipient's state"
                      value={ShippingState}
                      onChange={(e) => setShippingState(e.target.value)}
                    />
                    {shippingStateError && (
                      <p className="text-danger">{shippingStateError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter recipient's zip code"
                      value={ShippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                    />
                    {shippingZipError && (
                      <p className="text-danger">{shippingZipError}</p>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mb-4">
            <h4 className="mb-3">Payment Method</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="cod"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={PaymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="cod">
                Cash on Delivery
              </label>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h4 className="mb-0">Order Summary</h4>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                {cartData.length > 0 ? (
                  <>
                    {cartData.map((item, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-between border-bottom py-2"
                      >
                        <span>
                          Product - {item.item.title} × {item.quantity}
                        </span>
                        <span>€ {item.item.price * item.quantity}</span>
                      </li>
                    ))}
                    <li className="d-flex justify-content-between border-bottom py-2">
                      <span>Subtotal</span>
                      <span>€ {Subtotal}</span>
                    </li>
                    <li className="d-flex justify-content-between border-bottom py-2">
                      <span>Discount</span>
                      <span>€ {discount}</span>
                    </li>
                    <li className="d-flex justify-content-between py-2 font-weight-bold">
                      <span>Total</span>
                      <span>€ {Total}</span>
                    </li>
                  </>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </ul>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </div>
      </form>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h1>Congratulations!</h1>
            <button
              className="btn btn-sm btn-primary mt-4"
              onClick={handlePopupClose}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
