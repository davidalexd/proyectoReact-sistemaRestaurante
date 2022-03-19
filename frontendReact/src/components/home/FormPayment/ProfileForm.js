import React,{useEffect} from "react";
import useFormPayment from "./useFormPayment";
import { Message } from "../../Dashboard/Message";

//para stripe

import {
  CustomCardCvc,
  CustomCardNumber,
  CustomExpiry,
} from "../StripeElement/CustomCardElements";
import { Loader } from "../../Dashboard/Loader";

// para paypal
import ReactDOM from "react-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const initialForm = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: "",
};
let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};
const idPayment = {
  PAYPAL: 5,
  TARGETA: 15,
};
const errorMessage = {
  err1: "Ocurrio un error en los datos del usuario",
  err2: "Ocurrio un error en los datos de la targeta",
  err3: "Error el carrito de compras esta vacio",
  ex4: "Orden generada",
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  //let regexPhone = /^[0-9]{1,10}$/;
  let regexPhone = /^\d{9}$/;
  let regexAddress = /^.{1,255}$/;

  if (!form.firstName.trim()) {
    errors.firstName = "El campo 'Nombre' es requerido";
  } else if (!regexName.test(form.firstName.trim())) {
    errors.firstName =
      "El campo 'Nombre' sólo acepta letras y espacios en blanco";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "El campo 'Apellido' es requerido";
  } else if (!regexName.test(form.lastName.trim())) {
    errors.lastName =
      "El campo 'Apellido' sólo acepta letras y espacios en blanco";
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "El campo 'Telefono' es requerido";
  } else if (!regexPhone.test(form.phoneNumber.trim())) {
    errors.phoneNumber = "El campo 'Telefono' solo permite 9 digitos";
  }

  if (!form.address.trim()) {
    errors.address = "El campo 'Direccion' es requerido";
  } else if (!regexAddress.test(form.address.trim())) {
    errors.address = "El campo 'Direccion' no debe exceder los 255 caracteres";
  }

  return errors;
};

const ProfileForm = ({ Payment, subtotal, item, purchase_units }) => {
  const {
    form,
    errors,
    response,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
    createOrder,
    onApprove,
    onError,
    checkout,
  } = useFormPayment(
    initialForm,
    validationsForm,
    Payment,
    subtotal,
    item,
    idPayment,
    purchase_units
  );
  return (
    <div className="payment-user-info">
      <form onSubmit={handleSubmit}>
        {response && (
          <Message
            msg={`Mensaje: ${errorMessage[response]}`}
            bgColor={`${response === "ex4" ? "#198754" : "#dc3545"}`}
          />
        )}
        <div className="form-group">
          <label className="label">Nombres</label>
          <div className="input-container">
            <input
              type="text"
              name="firstName"
              className="input"
              placeholder="Su nombre"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.firstName}
              required
            ></input>
            {errors.firstName && <p style={styles}>{errors.firstName}</p>}
          </div>
        </div>
        <div className="form-group">
          <label className="label">Apellidos</label>
          <div className="input-container">
            <input
              type="text"
              name="lastName"
              className="input"
              placeholder="Sus apellidos"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.lastName}
              required
            ></input>
            {errors.lastName && <p style={styles}>{errors.lastName}</p>}
          </div>
        </div>
        <div className="form-group">
          <label className="label">Telefono</label>
          <div className="input-container">
            <input
              type="number"
              name="phoneNumber"
              className="input"
              placeholder="Su Telefono"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.phoneNumber}
              required
            ></input>
            {errors.phoneNumber && <p style={styles}>{errors.phoneNumber}</p>}
          </div>
        </div>
        <div className="form-group">
          <label className="label">Direccion</label>
          <div className="input-container">
            <textarea
              cols="50"
              rows="5"
              name="address"
              className="input"
              placeholder="Ejmp: Av. Faucett Cdr. 5"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.address}
              required
            ></textarea>
            {errors.address && <p style={styles}>{errors.address}</p>}
          </div>
        </div>
        {Payment === "TARGETA" && (
          <div>
            <div className="form-group">
              <label className="label">Numero de tarjeta</label>
              <CustomCardNumber />
            </div>
            <div className="half-form">
              <div className="form-group">
                <label className="label">Fecha de expiracion</label>
                <CustomExpiry />
              </div>
              <div className="form-group">
                <label className="label">Codigo CVC</label>
                <CustomCardCvc />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              {loading && <Loader style={{ margin: "0px auto" }} />}
            </div>
            <button type="submit" className="btn btn-primary">
              Pagar con visa
            </button>
          </div>
        )}
        {Payment === "PAYPAL" && (
          <div>
            {checkout ? (
              <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onError={(err) => onError(err)}
              />
            ) : (
              <button type="submit" className="btn btn-primary">
                Pagar con Paypal 
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
