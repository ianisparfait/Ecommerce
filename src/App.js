import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';

import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      meubles: []
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    const meubles = await axios.get('http://localhost:3001/meubles');
    user = user ? JSON.parse(user) : null;
    cart = cart? JSON.parse(cart) : {};

    this.setState({ user,  meubles: meubles.data, cart });
  }

  login = async (email, password) => {
    const res = await axios.post(
      'http://localhost:3001/login',
      { email, password },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })

    if(res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken)
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === 'admin@example.com' ? 0 : 1
      }

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addMeuble = (meuble, callback) => {
    let meubles = this.state.meubles.slice();
    meubles.push(meuble);
    this.setState({ meubles }, () => callback && callback());
  };

  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].meuble.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].meuble.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }

    const cart = this.state.cart;

    const meubles = this.state.meubles.map(p => {
      if (cart[p.maubleName]) {
        p.meubleStock = p.meubleStock - cart[p.maubleName].amount;

        axios.put(
          `http://localhost:3001/meubles/${p.id}`,
          { ...p },
        )
      }
      return p;
    });

    this.setState({ meubles });
    this.clearCart();
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addMeuble: this.addMeuble,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
        <div className="App">
          <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <b className="navbar-item is-size-4 ">ABC</b>
              <label
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
              <div className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}>
                <Link to="/meubles" className="navbar-item">
                  Produits
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-meuble" className="navbar-item">
                    Ajouter un produit
                  </Link>
                )}
                <Link to="/cart" className="navbar-item">
                  Panier
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    { Object.keys(this.state.cart).length }
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Connexion
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Déconnexion
                  </Link>
                )}
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-meuble" component={AddProduct} />
              <Route exact path="/meubles" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
