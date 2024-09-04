import React from "react";

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1651750369351-825dae7026a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1651750369351-825dae7026a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1651750369351-825dae7026a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1651750369351-825dae7026a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1651750369351-825dae7026a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1651750369351-825dae7026a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
  ];

  return (
    <>
      <div className="gallery-container my-5">
        <h2 className="gallery-title text-center mb-4">Gallery</h2>
        <div className="row">
          {images.map((image, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="gallery-item">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="img-fluid rounded"
                  loading="lazy" // Lazy load images
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <p className="overlay-text">Image {index + 1}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
