import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Url from '../components/Url.jsx'; // Ensure this is correctly set up

const Cart = ({ updateCartCount }) => {
  const [guestId, setGuestId] = useState(localStorage.getItem('guest_id') || '');
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountType, setDiscountType] = useState('percentage');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!guestId) {
      const newGuestId = Math.random().toString(36).substr(2, 9);
      setGuestId(newGuestId);
      localStorage.setItem('guest_id', newGuestId);
    }
  }, [guestId]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${Url}/api/cart/${guestId}`);
        setCartItems(response.data);
        calculateTotals(response.data);
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setError('Failed to fetch cart items. Please try again later.');
      }
    };

    if (guestId) {
      fetchCartItems();
    }
  }, [guestId]);

  useEffect(() => {
    calculateTotals(cartItems);
  }, [discount, discountType, cartItems]);

  const calculateTotals = (items) => {
    try {
      const subTotal = items.reduce((acc, item) => acc + item.quantity * item.item.price, 0);
      let totalAmount = subTotal;
      let calculatedDiscountAmount = 0;

      if (discountType === 'percentage') {
        calculatedDiscountAmount = (subTotal * (discount / 100));
        totalAmount = subTotal - calculatedDiscountAmount;
      } else if (discountType === 'flat') {
        calculatedDiscountAmount = discount;
        totalAmount = subTotal - calculatedDiscountAmount;
      }

      setSubtotal(subTotal);
      setDiscountAmount(calculatedDiscountAmount);
      setTotal(totalAmount > 0 ? totalAmount : 0);
    } catch (err) {
      console.error('Error calculating totals:', err);
      setError('Failed to calculate totals. Please try again.');
    }
  };

  const updateCartItem = async (id, quantity) => {
    try {
      const response = await axios.put(`${Url}/api/cart/${id}`, { quantity });
      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === id ? { ...item, quantity: response.data.quantity } : item
        );
        calculateTotals(updatedItems);
        return updatedItems;
      });
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError('Failed to update cart item. Please try again.');
    }
  };

  const removeCartItem = async (id) => {
    try {
      await axios.delete(`${Url}/api/cart/${id}`);
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== id);
        calculateTotals(updatedItems);
        updateCartCount(); // Notify parent to update cart count
        return updatedItems;
      });
    } catch (err) {
      console.error('Error removing cart item:', err);
      setError('Failed to remove cart item. Please try again.');
    }
  };

  const applyCoupon = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Url}/api/coupon`, { coupon: couponCode });
      const { data } = response;

      if (data) {
        let { discount, discountType } = data;

        if (typeof discount === 'string') {
          discount = parseFloat(discount);
        }

        if (typeof discount === 'number' && !isNaN(discount)) {
          setDiscount(discount);
          setDiscountType(discountType || 'percentage');
          setCouponCode('');
          setError('');
        } else {
          setError('Invalid discount value from server.');
        }
      } else {
        setError('Invalid coupon code.');
      }
    } catch (err) {
      console.error('Error applying coupon:', err);
      setError('Failed to apply coupon. Please try again.');
    }
  };

  const checkout = () => {
    const data = {
      guestId: localStorage.getItem('guest_id'),
      cartItems: cartItems,
      subtotal: subtotal,
      total: total,
      discount: discount,
    };
    navigate('/checkout', { state: { data } });
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {cartItems.length > 0 ? (
        <>
          <div className='overflow-scroll w-100'>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item.title}</td>
                    <td>€ {item.item.price}</td>
                    <td>
                      <input
                        type="quantity"
                        value={item.quantity}
                        onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
                        min="1"
                        className="quantity"
                      />
                    </td>
                    <td>€ {item.quantity * item.item.price}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary">
            <h3>Order Summary</h3>
            <p>Subtotal: € {subtotal.toFixed(2)}</p>
            <p>Discount: € {discountAmount.toFixed(2)}</p>
            <h4>Total: € {total.toFixed(2)}</h4>
            <form onSubmit={applyCoupon}>
              <div className="coupon-section">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon"
                  className="coupon-input"
                />
                <button type="submit" className="btn coupon-button">
                  Apply Coupon
                </button>
              </div>
            </form>
            <button onClick={checkout} className="btn coupon-button">
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
