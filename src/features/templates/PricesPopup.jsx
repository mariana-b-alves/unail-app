import { useState, useEffect } from 'react';
import pricesImages from '../../data/pricesImages.json';
import '../../styles/allPopup.css';

const PricesPopup = () => {
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
    <section className="prices">
      {pricesImages.map((item, img) => (
        <figure key={img}>
          <img
            className="all-img"
            src={item.image}
            alt={item.alt}
            onClick={() => setSelectedImage(item)}
            style={{ cursor: 'pointer' }}
          />
          {/* TEXT UNDERNEATH THE IMAGES */}
          <figcaption>
            <p>{item.title}</p>
            <p>{item.price}</p>
          </figcaption>
        </figure>
      ))}

      {/* POPUP PROPER */}
      {selectedImage && (
        <div
          className="allPopup"
          style={{ display: 'flex' }}
          onClick={() => setSelectedImage(null)}
        >
        {/* CLOSE POPUP WITH X BUTTON */}
          <span
            className="closeBtn"
            id="allPopupCloseBtn"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
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
    </section>
  );
};

export default PricesPopup;
