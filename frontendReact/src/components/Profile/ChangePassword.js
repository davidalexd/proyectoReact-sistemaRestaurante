import React, { useState } from "react";
import { URL } from "../../api/apiDB";
import { Message } from "../Dashboard/Message";
import { helpHttp } from "../helpers/helpHttp";
///sweetalert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const initialForm = {
  oldPassword: "",
  newPassword: "",
  passwordConfirmation: "",
};

const ChangePassword = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.passwordConfirmation) {
      MySwal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    helpHttp()
      .post(`${URL.PASSWORD_CHANGE}/${sessionStorage.getItem("id")}/password`, {
        body: form,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.message) {
          setMessage(true);
          setTimeout(() => setMessage(false), 5000);
          return;
        } else {
          setError(true);
          setTimeout(() => setError(false), 5000);
        }
      });
  };
  return (
    <form className="profile-details section" onSubmit={handleSubmit}>
      {message && (
        <Message msg="la contraseña ha sido cambiada" bgColor="#198754" />
      )}
      {error && <Message msg="La contraseña es incorrecta" bgColor="#dc3545" />}
      <div className="form-group">
        <h4>Ingrese su contraseña </h4>
        <div className="input-container">
          <div className="profile-icon center">
            <i className="fas fa-lock"></i>
          </div>
          <input
            type="password"
            name="oldPassword"
            className="input"
            placeholder="Su contraseña"
            onChange={handleChange}
            value={form.oldPassword}
            required
            autoComplete="off"
          ></input>
        </div>
      </div>
      <div className="form-group">
        <h4>Ingresa su nueva contraseña</h4>
        <div className="input-container">
          <div className="profile-icon center">
            <i className="fas fa-lock"></i>
          </div>
          <input
            type="password"
            name="newPassword"
            className="input"
            placeholder="Su nueva contraseña"
            onChange={handleChange}
            value={form.newPassword}
            required
            autoComplete="off"
          ></input>
        </div>
      </div>
      <div className="form-group">
        <h4>Confirme su contraseña</h4>
        <div className="input-container">
          <div className="profile-icon center">
            <i className="fas fa-lock"></i>
          </div>
          <input
            type="password"
            name="passwordConfirmation"
            className="input"
            placeholder="repita su nueva contraseña"
            onChange={handleChange}
            value={form.passwordConfirmation}
            required
            autoComplete="off"
          ></input>
        </div>
      </div>
      <div className="btn-container">
        <button className="btn btn-primary" type="submit">
          Guardar
        </button>
        <li className="btn btn-secondary" onClick={() => setForm(initialForm)}>
          cancelar
        </li>
      </div>
    </form>
  );
};

export default ChangePassword;
