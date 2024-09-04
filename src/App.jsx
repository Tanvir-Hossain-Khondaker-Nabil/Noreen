import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NoPage from './components/NoPage';
import Loading from './components/Loading';
import axios from 'axios'; // Ensure axios is imported
import Url from './components/Url.jsx'; // Ensure Url is imported

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/css/style.css";
import "./style/css/post.css";

import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    const guestId = localStorage.getItem('guest_id');
    if (guestId) {
      try {
        const response = await axios.get(`${Url}/api/cart_alert/${guestId}`);
        setCartCount(response.data.length);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    }
  };

  useEffect(() => {
    updateCartCount(); // Initialize cart count on mount
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Header cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<Product updateCartCount={updateCartCount} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} /> {/* Correct casing */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
