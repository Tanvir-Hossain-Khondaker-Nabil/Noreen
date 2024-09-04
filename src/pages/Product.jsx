import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Url from "../components/Url.jsx";

const Product = ({ updateCartCount }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [guestId, setGuestId] = useState(localStorage.getItem("guest_id") || "");
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to fetch item details
  const fetchItemData = useCallback(async () => {
    try {
      const response = await axios.get(`${Url}/api/item_single_get/${id}`);
      setItem(response.data);
    } catch (err) {
      setError(err);
    }
  }, [id]);

  useEffect(() => {
    if (!guestId) {
      const randomGuestId = Math.random().toString(36).substr(2, 9);
      setGuestId(randomGuestId);
      localStorage.setItem("guest_id", randomGuestId);
    }
    fetchItemData();
  }, [fetchItemData, guestId]);

  const addToCart = async (e) => {
    e.preventDefault();
    if (!item) return;

    try {
      await axios.post(`${Url}/api/cart`, {
        guest_id: guestId,
        item_id: item.id,
        quantity: quantity,
      });
      console.log("Cart updated");

      // Fetch updated cart count and notify the parent
      const response = await axios.get(`${Url}/api/cart_alert/${guestId}`);
      updateCartCount(response.data.length);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  

  const description = item.description || "No description available";
  const descriptionPreview = description.slice(0, 120);
  const shouldShowMore = description.length > 120;

  if (error) return <p>Error: {error.message}</p>;
  if (!item) return <p className="loading">Product not found.</p>;

  return (
    <div className="my-5">
      <div className="row gap-5 gap-lg-0 g-0">
        <div className="col-md-5 d-flex align-items-center justify-lg-content-end justify-content-center">
          <div className="single-product-img">
            <img
              className="img-fluid img-thumbnail"
              src={`${Url}/${item.photo}`}
              alt={item.title}
            />
          </div>
        </div>
        <div className="col-md-7 d-flex-center">
          <div className="single-product-details mt-5 m-md-0">
            <h2>{item.title}</h2>
            <p className="description-title">Description</p>
            <p className="description-text">
              {isExpanded
                ? description
                : `${descriptionPreview}${shouldShowMore ? "..." : ""}`}
              {shouldShowMore && !isExpanded && (
                <span
                  className="more-link"
                  onClick={() => setIsExpanded(true)}
                >
                  More
                </span>
              )}
            </p>
            <p className="price">€ {item.price}</p>
            <div className="item-hr"></div>
            <form onSubmit={addToCart}>
              <div className="row align-items-center">
                <div className="col-3">
                  <div className="count">
                    <span onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                      <i className="fas fa-minus"></i>
                    </span>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    />
                    <span onClick={() => setQuantity((prev) => prev + 1)}>
                      <i className="fas fa-plus"></i>
                    </span>
                  </div>
                </div>
                <div className="col-9">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-shopping-basket icon"></i> Add to cart
                  </button>
                </div>
              </div>
            </form>
            <div className="category-info mt-4">
              <p>SKU: <strong>N/A</strong></p>
              <p>Category: <strong>{item.category?.name || "N/A"}</strong></p>
              <p>Sub Category: <strong>{item.sub_category?.name || "N/A"}</strong></p>
              <p>Share: <i className="fab fa-facebook-square"></i></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
