import React, { useState } from "react";

export const Gallery = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedProduct = selectedIndex !== null ? data[selectedIndex] : null;

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Products</h2>
          <p>Explore some of our autonomous robotics solutions .</p>
        </div>

        {/* Grid: project names and description */}
        <div className="row portfolio-items">
          {data &&
            data.map((d, i) => (
              <div key={i} className="col-sm-6 col-md-4 col-lg-4">
                <div
                  className={`portfolio-item ${
                    selectedIndex === i ? "active" : ""
                  }`}
                  onClick={() => setSelectedIndex(i)}
                >
                  <h4 className="project-title">{d.title}</h4>
                  <p className="project-description">
                    
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Video Section: shows only when a project is selected */}
        {selectedProduct && selectedProduct.video && (
          <div className="project-video-section">
            <h3> {selectedProduct.title}</h3>
            <p className="product-description">
              {selectedProduct.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>
            <div className="project-video">
              <iframe
                src={selectedProduct.video}
                title={selectedProduct.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};