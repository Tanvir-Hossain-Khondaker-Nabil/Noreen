import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Url from "../components/Url.jsx";

const Menu = () => {
  const [itemSectionOne, setItemSectionOne] = useState([]);
  const [itemSectionTwo, setItemSectionTwo] = useState([]);
  const [itemSectionThree, setItemSectionThree] = useState([]);
  const [itemSectionFour, setItemSectionFour] = useState([]);
  const [titleSectionOne, setTitleSectionOne] = useState("Breakfast");
  const [titleSectionTwo, setTitleSectionTwo] = useState("Lunch");
  const [titleSectionThree, setTitleSectionThree] = useState("Dinner");
  const [titleSectionFour, setTitleSectionFour] = useState("Dessert");
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      const response = await axios.get(`${Url}/api/menu`);

      // Extract section titles and items
      const sectionOneItems = response.data.filter(item => item.section === "1").map(item => item.item);
      setItemSectionOne(sectionOneItems);
      setTitleSectionOne(response.data.find(item => item.section === "1")?.title || "Breakfast");

      const sectionTwoItems = response.data.filter(item => item.section === "2").map(item => item.item);
      setItemSectionTwo(sectionTwoItems);
      setTitleSectionTwo(response.data.find(item => item.section === "2")?.title || "Lunch");

      const sectionThreeItems = response.data.filter(item => item.section === "3").map(item => item.item);
      setItemSectionThree(sectionThreeItems);
      setTitleSectionThree(response.data.find(item => item.section === "3")?.title || "Dinner");

      const sectionFourItems = response.data.filter(item => item.section === "4").map(item => item.item);
      setItemSectionFour(sectionFourItems);
      setTitleSectionFour(response.data.find(item => item.section === "4")?.title || "Dessert");

    } catch (error) {
      console.error("Error:", error.message);
      setError("Unable to fetch data. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handlePrint = async () => {
    const element = document.getElementById("page-border");
    const dishImages = document.querySelectorAll(".dish-img");

    const originalPadding = element.style.padding;
    element.style.padding = "20px";

    dishImages.forEach((img) => (img.style.display = "none"));

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
      });

      const imgData = canvas.toDataURL("image/png");

      let pdf;
      const screenWidth = window.innerWidth;

      if (screenWidth > 768) {
        pdf = new jsPDF({
          unit: "in",
          format: [20, 11],
          orientation: "landscape",
        });
        pdf.addImage(imgData, "PNG", 0, 0, 20, 11);
      } else {
        pdf = new jsPDF({
          unit: "in",
          format: "a4",
          orientation: "portrait",
        });
        const pdfWidth = 8.27;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save("menu.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      element.style.padding = originalPadding;
      dishImages.forEach((img) => (img.style.display = "block"));
    }
  };

  const truncateDescription = (description, wordLimit =10) => {
    if (!description) return "No description available";
  
    const words = description.split(' ');
    if (words.length <= wordLimit) return description;
  
    return `${words.slice(0, wordLimit).join(' ')}...`;
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="content p-md-5 p-0 my-5 position-relative">
        <button id="print" onClick={handlePrint}>
          <i className="fa-solid fa-download"></i>
        </button>
        <div className="page-border" id="page-border">
          <div className="row text-center mb-5">
            <div className="col-lg-12">
              <div className="page-section">
                <h1 className="page-title">Food Menu</h1>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12 px-md-4 pt-md-3 p-0">
              <div className="menu-block rounded">
                <h3 className="menu-title mb-4">{titleSectionOne}</h3>
                <div className="menu-content">
                  {itemSectionOne.map((item) => (
                    <div key={item.id} className="row align-items-center mb-4 border-bottom pb-3">
                      <div className="col-md-2 col-3 dish-img">
                        <img
                          src={`${Url}/${item.photo}`}
                          alt={item.title}
                          className="img-fluid rounded-circle"
                          style={{ width: "80px", height: "80px" }}
                          loading="lazy"
                        />
                      </div>
                      <div className="col-7 dish-content flex-grow-1">
                        <h5 className="dish-title mb-1">
                          <Link to={`/product/${item.id}`} className="text-dark text-decoration-none">
                            {item.title}
                          </Link>
                        </h5>
                        <span className="dish-meta text-muted d-block">
                          {truncateDescription(item.description)}
                        </span>
                      </div>
                      <div className="col-3 dish-price text-end">
                        <p className="mb-0 fs-4 fw-bold text-black">
                          Є{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-12 px-md-4 pt-md-3 p-0">
              <div className="menu-block rounded">
                <h3 className="menu-title mb-4">{titleSectionTwo}</h3>
                <div className="menu-content">
                  {itemSectionTwo.map((item) => (
                    <div key={item.id} className="row align-items-center mb-4 border-bottom pb-3">
                      <div className="col-md-2 col-3 dish-img">
                        <img
                          src={`${Url}/${item.photo}`}
                          alt={item.title}
                          className="img-fluid rounded-circle"
                          style={{ width: "80px", height: "80px" }}
                          loading="lazy"
                        />
                      </div>
                      <div className="col-7 dish-content flex-grow-1">
                        <h5 className="dish-title mb-1">
                          <Link to={`/product/${item.id}`} className="text-dark text-decoration-none">
                            {item.title}
                          </Link>
                        </h5>
                        <span className="dish-meta text-muted d-block">
                          {truncateDescription(item.description)}
                        </span>
                      </div>
                      <div className="col-3 dish-price text-end">
                        <p className="mb-0 fs-4 fw-bold text-black">
                          Є{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-12 px-md-4 pt-md-3 p-0">
              <div className="menu-block rounded">
                <h3 className="menu-title mb-4">{titleSectionThree}</h3>
                <div className="menu-content">
                  {itemSectionThree.map((item) => (
                    <div key={item.id} className="row align-items-center mb-4 border-bottom pb-3">
                      <div className="col-md-2 col-3 dish-img">
                        <img
                          src={`${Url}/${item.photo}`}
                          alt={item.title}
                          className="img-fluid rounded-circle"
                          style={{ width: "80px", height: "80px" }}
                          loading="lazy"
                        />
                      </div>
                      <div className="col-7 dish-content flex-grow-1">
                        <h5 className="dish-title mb-1">
                          <Link to={`/product/${item.id}`} className="text-dark text-decoration-none">
                            {item.title}
                          </Link>
                        </h5>
                        <span className="dish-meta text-muted d-block">
                          {truncateDescription(item.description)}
                        </span>
                      </div>
                      <div className="col-3 dish-price text-end">
                        <p className="mb-0 fs-4 fw-bold text-black">
                          Є{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-12 px-md-4 pt-md-3 p-0">
              <div className="menu-block rounded">
                <h3 className="menu-title mb-4">{titleSectionFour}</h3>
                <div className="menu-content">
                  {itemSectionFour.map((item) => (
                    <div key={item.id} className="row align-items-center mb-4 border-bottom pb-3">
                      <div className="col-md-2 col-3 dish-img">
                        <img
                          src={`${Url}/${item.photo}`}
                          alt={item.title}
                          className="img-fluid rounded-circle"
                          style={{ width: "80px", height: "80px" }}
                          loading="lazy"
                        />
                      </div>
                      <div className="col-7 dish-content flex-grow-1">
                        <h5 className="dish-title mb-1">
                          <Link to={`/product/${item.id}`} className="text-dark text-decoration-none">
                            {item.title}
                          </Link>
                        </h5>
                        <span className="dish-meta text-muted d-block">
                          {truncateDescription(item.description)}
                        </span>
                      </div>
                      <div className="col-3 dish-price text-end">
                        <p className="mb-0 fs-4 fw-bold text-black">
                          Є{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
