/*ShoppingCart.jsx -> CART'S CLIENT AND AESTHETIC SIDE*/

import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import productData from '../../data/productData.json';
import PropTypes from 'prop-types';
import '../../styles/form.css';
import '../../styles/trans_done_err.css';


const ShoppingCart = ({ isOpen, onClose, onConfirm }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [] = useState(null); 

  /*CALCULATES THE TOTAL PRICES OF EVERY SINGLE ITEM SELECTED BY THE USER*/
  const totalPrice = cartItems
    .reduce((sum, item) => {
      const product = productData[item.id];
      return sum + (product ? product.price * item.quantity : 0);
    }, 0)
    .toFixed(2);

  const handleConfirm = async () => {
    onClose();
    onConfirm();
  };

  return (
    <>
      <section className={`shoppingCart ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="container">
          <a className="closeBtn" onClick={onClose} role="button" tabIndex={0} aria-label="Close shopping cart">&times;</a>
          {cartItems.length === 0 ? (
            <p>Carrinho vazio</p>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const product = productData[item.id];
                  if (!product) return null;
                  return (
                    <article key={`${item.id}-${item.color || 'nocolor'}`} className="cart-item">
                      <figure>
                        <img src={product.image} alt={product.title} />
                      </figure>
                      <article className="content">
                        <p>{product.description}</p>
                        <p>{product.title}</p>
                        <article className="addRemoveItemsCounter">
                          <div className="add"><p>{item.quantity}</p></div>
                        </article>
                        <p>Preço: {product.price.toFixed(2)}€</p>
                        <p>Total: {(product.price * item.quantity).toFixed(2)}€</p>

                        {item.color && (
                          <p>
                            Cor:&nbsp;
                            <span
                              style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: item.color, border: '2px solid #000000', verticalAlign: 'middle'
                              }}
                              title={item.color}
                            />
                          </p>
                        )}
                       
                        <button className="btn" onClick={() => removeFromCart(item.id, item.color)}>REMOVER</button>
                      </article>
                    </article>
                  );
                })}
                {/*ADDS TOTAL FINAL JUST OUTSIDE THE ARTICLE WHEN EVERTHING ELSE IS (SO THE TOTAL FINAL DOESN'T APPEAR EVERYTIME A NEW ITEM'S ADDED)*/}
                {cartItems.length > 0 && (
                   <p style={{ color: '#57402c', textAlign:'center', marginTop: '1em', fontSize: '1.4em', fontWeight: '600'}}>
                     Total Final: {totalPrice}€
                    </p>
                )}
                <div className="cart-buttons">
                  <button className="btn" id="confirmBtn" onClick={handleConfirm}>CONFIRMAR</button>
                  <button className="btn" id="cancelBtn" onClick={onClose}>CANCELAR</button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

ShoppingCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ShoppingCart;