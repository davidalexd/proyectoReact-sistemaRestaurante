import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { URL } from "../../api/apiDB";
import { Loader } from "../Dashboard/Loader";
import { Message } from "../Dashboard/Message";
import { helpHttp } from "../helpers/helpHttp";
import Product from "./Product";
import CartItem from "./CartItem";
import {
  shoppingReducer,
  shoppingInitialState,
} from "../../reducers/shoppingReducer";
import { TYPES } from "../../acctions/shoppingAction";

import Sidebar from "../sidebar/Sidebar";

import "../../assets/css/style.css";
import "../home/home.css";
import { Header } from "./Header";
//formulario de pago
import ProfileForm from "./FormPayment/ProfileForm";



export const Products = () => {
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const [togglePayment, setTooglePayment] = useState(false);

  let activeClassPayment = {
    PAYPAL: 5,
    TARGETA: 15,
  };
  const [Payment, setPayment] = useState("TARGETA");
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { db, cart, purchase_units, subtotal, onecategory, totalquantity } =
    state;

  //para productos
  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(URL.PRODUCT_DB)
      .then((res) => {
        if (res.length > 0) {
          dispatch({ type: TYPES.READ_ALL_DATA, payload: res });
          setError(null);
        } else {
          dispatch({ type: TYPES.NO_DATA });
          setError(res);
        }
        setLoading(false);
      });
  }, []);
  const filtCategory = (idCategory) => {
    dispatch({ type: TYPES.READ_ONE_CATEGORY, payload: idCategory });
  };
  const removeCategory = (state) => {
    dispatch({ type: TYPES.REMOVE_CATEGORY, payload: state });
  };

  //para paypal
  const totalQuantity = () => {
    dispatch({ type: TYPES.ADD_TO_QUANTITY });
  };
  const addToPay = () => {
    dispatch({ type: TYPES.ADD_TO_PAY });
  };
  const addToCart = (id) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
    totalQuantity();
  };

  const delFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
      totalQuantity();
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
      totalQuantity();
    }
  };

  const toggleOff = () => {
    setTooglePayment(false);
    setPayment("")
  };
  const toggleON = () => {
    setTooglePayment(true);
    //setPayment("TARGETA")
  };


  const onBtnCartClick = () => {
    setToggleCart(!toggleCart);
    setTooglePayment(false);
  };
  return (
    <>
      <Sidebar />
      <div className="btn btn-primary btn-cart" onClick={onBtnCartClick}>
          <span className="total-cart center">{totalquantity}</span>
          <i className="fas fa-shopping-cart"></i>
      </div>
      <div className="parent home">
        

        {/* Column 1 */}
        <div className="column-1 content f-column">
          <Header filtCategory={filtCategory} removeCategory={removeCategory} />
          <main className="menu">
            <div className="menu-header">
              <p className="menu-title">Seleccion de productos</p>
            </div>
            <div className="product-list">
              {Loading && <Loader />}
              {Error && (
                <Message
                  msg={`Error ${Error.status}:${Error.statusText}`}
                  bgColor="#dc3545"
                />
              )}

              {onecategory
                ? onecategory &&
                onecategory.map((product) => (
                  <Product
                    key={product.idProduct}
                    data={product}
                    addToCart={addToCart}
                  />
                ))
                : db &&
                db.map((product) => (
                  <Product
                    key={product.idProduct}
                    data={product}
                    addToCart={addToCart}
                  />
                ))}
            </div>
          </main>
        </div>
        {/* Column 2 */}
        <div
          className={`column-2 bg-primary products 
            ${toggleCart ? "toggleOrderLeft" : "toggleOrderRight"}
            ${togglePayment ? "togglePaymentRight" : ""}`}
        >
          <div className="order-container">
            <div className="return" onClick={onBtnCartClick}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12"
                  stroke="#3B5162"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Regresar</span>
            </div>
            <div className="order-title">
              <p>Ordenes</p>
            </div>
            <div className="order-header order-grid">
              <p className="col-1">Item</p>
              <p className="col-2">Cantidad</p>
              <p className="col-3">Precio</p>
            </div>
            <div className="order-list">
              {cart &&
                cart.map((item, index) => (
                  <CartItem key={index} data={item} delFromCart={delFromCart} />
                ))}
            </div>
            <div className="order-resume">
              <div className="resume-item">
                <p className="resume-title">Descuento</p>
                <p className="resume-mon">$0</p>
              </div>
              <div className="resume-item">
                <p className="resume-title">SubTotal</p>
                <p className="resume-mon">{subtotal}</p>
              </div>
            </div>
            <div className="btn-container">
              <button
                onClick={() => {
                  addToPay();
                  toggleON();
                }}
                className="btn btn-primary"
              >
                Confirma tu compra
              </button>
            </div>
          </div>
          <div className="order-payment">
            <div className="payment-container">
              <div className="order-title">
                <p>Pago de order</p>
              </div>
              <div className="order-header"></div>

              <div className="container-scroll">
                <div className="payment-methods">
                  <h3>Metodos de pagos</h3>
                  <ul className="list-payment-methods">
                    <li
                      className={`payment-method ${activeClassPayment[Payment] === 15 ? "active" : ""
                        }`}
                      onClick={() => {
                        setPayment("TARGETA");
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.2501 9.0001C1.2501 6.37675 3.37675 4.2501 6.0001 4.2501H18.0001C20.6234 4.2501 22.7501 6.37675 22.7501 9.0001V15.0001C22.7501 17.6235 20.6234 19.7501 18.0001 19.7501H6.0001C3.37674 19.7501 1.2501 17.6235 1.2501 15.0001V9.0001ZM2.83706 8.2501H21.1631C20.8246 6.81675 19.5369 5.7501 18.0001 5.7501H6.0001C4.46331 5.7501 3.17565 6.81675 2.83706 8.2501ZM21.2501 9.7501H2.7501V15.0001C2.7501 16.795 4.20517 18.2501 6.0001 18.2501H18.0001C19.795 18.2501 21.2501 16.795 21.2501 15.0001V9.7501ZM13.2501 15.0001C13.2501 14.5859 13.5859 14.2501 14.0001 14.2501H18.0001C18.4143 14.2501 18.7501 14.5859 18.7501 15.0001C18.7501 15.4143 18.4143 15.7501 18.0001 15.7501H14.0001C13.5859 15.7501 13.2501 15.4143 13.2501 15.0001Z"
                          fill="#3B5162"
                        />
                      </svg>
                      <span>Tarjeta</span>
                    </li>
                    <li
                      className={`payment-method ${activeClassPayment[Payment] === 5 ? "active" : ""
                        }`}
                      onClick={() => {
                        setPayment("PAYPAL");
                      }}
                    >
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 5.2C16.2 6.2 17 8 17 10C17 12.5 14.5 14.5 12 14.5H9.4L8.8 18.1C8.75325 18.3293 8.62758 18.5349 8.44486 18.6811C8.26214 18.8272 8.03395 18.9047 7.8 18.9H5.1C5.02501 18.9015 4.95064 18.8861 4.88239 18.855C4.81415 18.8239 4.75378 18.7778 4.70577 18.7202C4.65775 18.6626 4.62331 18.5949 4.605 18.5222C4.58669 18.4494 4.58498 18.3735 4.6 18.3L4.8 16.9M7 11H9.5C12 11 14.5 8.5 14.5 6C14.5 3 12.6 1 9.5 1H4C3.5 1 3 1.5 3 2L1 16C1 16.5 1.5 17 2 17H4.8L6 12C6.1 11.4 6.4 11 7 11Z"
                          stroke="#3B5162"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span>Paypal</span>
                    </li>
                    <li className="payment-method CONTRAENTREGA">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.188 0.5C17.3978 0.5 20 3.16116 20 6.44374V13.5563C20 16.8388 17.3978 19.5 14.188 19.5H5.81204C2.60219 19.5 0 16.8388 0 13.5563V6.44374C0 3.16116 2.60219 0.5 5.81204 0.5H14.188ZM14.188 1.98651H5.81204C3.40498 1.98651 1.45358 3.98213 1.45358 6.44374V13.5563C1.45358 16.0179 3.40498 18.0135 5.81204 18.0135H14.188C16.595 18.0135 18.5464 16.0179 18.5464 13.5563L18.546 13.279L15.3499 13.2798C13.5084 13.2787 12.0159 11.7531 12.0147 9.86949C12.0147 8.04914 13.4101 6.56244 15.1673 6.46431L15.3504 6.45916L18.546 6.459L18.5464 6.44374C18.5464 4.05454 16.7081 2.10431 14.3991 1.99165L14.188 1.98651ZM18.546 7.945L15.3508 7.94567C14.3109 7.94632 13.4683 8.80743 13.4683 9.86904C13.4689 10.8811 14.2329 11.7102 15.2033 11.7874L15.3504 11.7933L18.546 11.793V7.945ZM15.7942 9.06518C16.1956 9.06518 16.521 9.39795 16.521 9.80844C16.521 10.1847 16.2475 10.4957 15.8928 10.5449L15.7942 10.5517H15.4921C15.0907 10.5517 14.7653 10.2189 14.7653 9.80844C14.7653 9.43215 15.0388 9.12118 15.3935 9.07196L15.4921 9.06518H15.7942ZM10.3539 4.99736C10.7553 4.99736 11.0807 5.33013 11.0807 5.74062C11.0807 6.1169 10.8073 6.42788 10.4525 6.47709L10.3539 6.48388H5.12203C4.72063 6.48388 4.39524 6.15111 4.39524 5.74062C4.39524 5.36434 4.66866 5.05337 5.0234 5.00415L5.12203 4.99736H10.3539Z"
                          fill="#3B5162"
                        />
                      </svg>
                      <span>Contraentrega</span>
                    </li>
                  </ul>
                </div>
                <ProfileForm
                  Payment={Payment}
                  subtotal={subtotal}
                  item={cart}
                  purchase_units={purchase_units}
                />
              </div>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => toggleOff()}
              >
                Cancelar
              </button>
              <Link to="/notifications" className="btn btn-secondary">
                  Mis pedidos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
