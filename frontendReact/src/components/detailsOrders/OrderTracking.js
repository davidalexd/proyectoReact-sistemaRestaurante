import React from "react";
import pagadoactual from "../../assets/images/seguimiento/pagadoactual.gif";
import finalizado from "../../assets/images/seguimiento/finalizado.gif";
import pagado from "../../assets/images/seguimiento/pagado.png";
import noenviado from "../../assets/images/seguimiento/noenviado.png";
import enviado from "../../assets/images/seguimiento/enviado.png";
import preparacion from "../../assets/images/seguimiento/preparacion.png";
import "./orderTracking.css";
const OrderTracking = ({ Details }) => {
  return (
    <div className="order-tracking-container">
      
      <div className="segui-header">
        <h2 className="segui-title border-c">Historial de seguimiento:</h2>
      </div>
      {Details && (
        <div className="progressInfo">
          {Details.statusOrder === "COMPLETADO" && (
            <div className="nav-steps">
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={pagado} alt="compra" />
                  <p className="step-info"> Pagado</p>
                </div>
              </div>
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={preparacion} alt="compra" />
                  <p className="step-info">Preparando</p>
                </div>
              </div>
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={enviado} alt="compra" />
                  <p className="step-info"> Enviando</p>
                </div>
              </div>
              <div className="end nav-step">
                <div className="step-content">
                  <img className="step-img" src={finalizado} alt="compra" />
                  <h1>Estado actual:</h1>
                  <p className="step-info">
                    El producto a sido entregado con éxito
                  </p>
                </div>
              </div>
            </div>
          )}
          {Details.statusOrder === "ENVIANDO" && (
            <div className="nav-steps">
              <div className="nav-step ">
                <div className="step-content">
                  <img className="step-img" src={pagado} alt="compra" />
                  <p className="step-info"> Pagado</p>
                </div>
              </div>
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={preparacion} alt="compra" />
                  <p className="step-info">Preparando</p>
                </div>
              </div>
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={enviado} alt="compra" />
                  <h1>Estado actual:</h1>
                  <p className="step-info">Su producto ha sido enviado</p>
                </div>
              </div>
              <div className="end nav-step">
                <div className="step-content">
                  <img className="step-img" src={noenviado} alt="compra" />
                  <p className="step-info">Completado</p>
                </div>
              </div>
            </div>
          )}
          {Details.statusOrder === "PREPARANDO" && (
            <div className="nav-steps">
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={pagado} alt="compra" />
                  <p className="step-info"> Pagado</p>
                </div>
              </div>
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={preparacion} alt="compra" />
                  <h1>Estado actual:</h1>
                  <p className="step-info">Su producto esta siendo preparado</p>
                </div>
              </div>
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={noenviado} alt="compra" />
                  <p className="step-info">Enviando</p>
                </div>
              </div>
              <div className="end nav-step">
                <div className="step-content">
                  <img className="step-img" src={noenviado} alt="compra" />
                  <p className="step-info">Completado</p>
                </div>
              </div>
            </div>
          )}
          {Details.statusOrder === "PENDIENTE" && (
            <div className="nav-steps">
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={pagadoactual} alt="compra" />
                  <h1>Estado actual:</h1>
                  <p className="step-info">Su producto se encuentra pagado</p>
                </div>
              </div>
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={noenviado} alt="compra" />
                  <p className="step-info">Preparando</p>
                </div>
              </div>
              <div className="nav-step">
                <div className="step-content">
                  <img className="step-img" src={noenviado} alt="compra" />
                  <p className="step-info">Enviando</p>
                </div>
              </div>
              <div className="end nav-step">
                <div className="step-content">
                  <img className="step-img" src={noenviado} alt="compra" />
                  <p className="step-info">Completado</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
