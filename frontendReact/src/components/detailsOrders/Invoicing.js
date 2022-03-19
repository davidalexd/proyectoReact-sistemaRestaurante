import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo-white.png";
import { helpHttp } from "../helpers/helpHttp";
import "./invoicing.css";
import OrderTableRowInvoicing from "./OrderTableRowInvoicing";
import { URL } from "../../api/apiDB";
import Moment from "react-moment";

const Invoicing = ({ Details }) => {
  let { idOrder, createdAt, user, payment, totalPrice } = Details;
  const [toggle, setToggle] = useState(false);
  const [Profile, setProfile] = useState([]);
  useEffect(() => {
    helpHttp()
      .get(`${URL.USERS_DB}/${sessionStorage.getItem("id")}/profile`)
      .then((res) => {
        if (!res.err) {
          setProfile(res);
        }
      });
  }, []);
  return (
    <div className="invoicing-container">
      <div
        onClick={() => {
          setToggle(!toggle);
        }}
        className="btn-toggle"
      >
        <div className="btn btn-primary">Ver boleta</div>
      </div>
      <div
        className={`invoicing-content ${toggle ? "toggleDown" : "toggleUp"}`}
      >
        <header className="invoicing-header">
          <div className="header-info invoicing">
            <div className="company-info">
              <img src={logo} alt="logo" />
            </div>
            <div className="invoicing-info">
              <div className="invoicing-detail">
                <h3>Boleta</h3>
                <div className="invoicing-info-details">
                  <div className="invoicing-info-detail-item">
                    <span>Nro Boleta:</span>
                    <span>#{idOrder}</span>
                  </div>
                  {/* <div className="invoicing-info-detail-item">
                    <span>Numero de cuenta:</span>
                    <span>1234 1234 1234 1234</span>
                  </div> */}
                  <div className="invoicing-info-detail-item">
                    <span>Fecha de creacion:</span>
                    <Moment format="LLLL">{createdAt}</Moment>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="invoicing-center">
          <div className="header-description">
            <div className="invoice-user-detail">
              <h4>Boleta a:</h4>
              <p className="invoice-name">{`${Profile.firstName} ${Profile.lastName}`}</p>
              <p className="invoice-detail">{`Direccion: ${Profile.address}`}</p>
              <p className="invoice-detail">{`Phone +51 ${Profile.phoneNumber}`}</p>
              <p className="invoice-detail">Email:{user.email}</p>
            </div>
            <div className="invoice-payment-method">
              <h3>Metodo de pago</h3>
              <p>Nombre de usuario: {user.username}</p>
              <p>
                {`Nombre del metodo de pago: ${payment[0].paymentMethod.namePaymentMethod}`}
              </p>
            </div>
          </div>
          <div className="invoicing-table-container">
            <table className="invoicing-table">
              <thead>
                <tr>
                  <td>Nombre</td>
                  <td>Descripcion Unidad</td>
                  <td>Precio Unit.</td>
                  <td>Cant.</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {Details &&
                  Details.orderDetails.map((item) => (
                    <OrderTableRowInvoicing
                      key={item.product.idProduct}
                      item={item.product}
                      quantity={item.quantity}
                    />
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="1">Subtotal</td>
                  <td colSpan="3"></td>
                  <td colSpan="1">${totalPrice}</td>
                </tr>
                <tr>
                  <td colSpan="1">Subtotal sin IGV</td>
                  <td colSpan="3"></td>
                  <td colSpan="1">${(totalPrice / 1.18).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="1">IGV(18%)</td>
                  <td colSpan="3"></td>
                  <td colSpan="1">${(totalPrice * 0.18).toFixed(2)}</td>
                </tr>
                <tr className="tfoot-total">
                  <td colSpan="4">Total</td>
                  <td colSpan="1">${totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <footer className="invoicing-footer">
            <div className="footer-info">
              <h4>Terminos y condiciones</h4>
              <p>
                Mediante su acceso y uso de los Servicios usted acuerda
                vincularse jurídicamente por estas Condiciones, que establecen
                una relación contractual entre usted y DELIBAKERY. Si usted no
                acepta estas Condiciones, no podrá acceder o usar los Servicios.
                Estas Condiciones sustituyen expresamente los acuerdos o
                compromisos previos con usted. Uber podrá poner fin de inmediato
                a estas Condiciones o cualquiera de los Servicios respecto de
                usted o, en general, dejar de ofrecer o denegar el acceso a los
                Servicios o cualquier parte de ellos, en cualquier momento y por
                cualquier motivo.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Invoicing;
