import { useState, useEffect } from 'react';
import portfolioImages from '../../data/portfolioImages.json';
import '../../styles/allPopup.css';

const PortfolioPopup = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // CLOSE POPUP OUTSIDE OF IT OR BY CLICKING THE ESC BTN
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <section className="title">
        <h1>GALERIA</h1>
      </section>

    {/*IMAGES*/}
      <section className="portfolio">
        {portfolioImages.map((item, img) => (
          <figure key={img}>
            <img
              className="all-img"
              src={item.image}
              alt={item.alt}
              onClick={() => setSelectedImage(item)}
              style={{ cursor: 'pointer' }}
            />
          </figure>
        ))}
      </section>

      {/* POPUP PROPER */}
      {selectedImage && (
        <div
          className="allPopup"
          style={{ display: 'flex' }}
          onClick={() => setSelectedImage(null)}
        >
          <span
            className="closeBtn"
            id="allPopupCloseBtn"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </span>
          <img
            className="modal-content"
            src={selectedImage.image}
            alt={selectedImage.alt}
            onClick={(e) => e.stopPropagation()} //MAKES IT SO THE USER DOESN'T CLOSE THE POPUP WHEN CLICKING DIRECTLY ON THE IMG
          />
        </div>
      )}
    </>
  );
};

export default PortfolioPopup;
