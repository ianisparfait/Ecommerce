import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";
import Stripe from './Stripe';

const Cart = props => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});

  const totalPrice = () => {
    let c = cart
    let total = 0;
    for (let x in c) {
      let obj = c[x]
      for (let key in obj) {
        if (obj[key].meublePrix !== undefined || obj[key].meublePrix !== null) {
          total = total + parseFloat(obj[key].meublePrix)
        }
      }
    }
    return total
  };

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Mon panier</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button
                  onClick={props.context.clearCart}
                  className="button is-warning "
                >
                  Effacer le panier
                </button>{" "}
                <Stripe price={totalPrice()} />
              </div>
              <span>Prix total de la commande: {parseFloat(totalPrice().toFixed(2))}€</span>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">Aucun articles dans le panier</div>
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(Cart);
