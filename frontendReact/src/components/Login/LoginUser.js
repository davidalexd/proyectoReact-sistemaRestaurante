import { useState } from "react";

import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { Message } from "../Dashboard/Message";
import { helpHttp } from "../helpers/helpHttp";
import { Loader } from "../Dashboard/Loader";
//URL DELYBAKERY
import { URL } from "../../api/apiDB";
//Styles
import "./../../assets/css/form.css";
import "./../../assets/css/style.css";

//Images
import logoWhite from "./../../assets/images/logo-white.png";
import backgroundImg from "../../assets/images/background.jpg";
import Sidebar from "../sidebar/Sidebar";

///sweetalert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const initialForm = {
  username: "",
  password: "",
  roles: [],
};

export const LoginUser = () => {
  const [form, setForm] = useState(initialForm);
  const [user, setUser] = useState(null);
  const [Error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      MySwal.fire("Cuidado", "Datos incompletos", "warning");
      return;
    } else {
      setLoading(true);
      helpHttp()
        .post(URL.SIGNIN_AUTH, {
          body: form,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          if (res.username) {
            sessionStorage.setItem("id", res.id);
            sessionStorage.setItem("email", res.email);
            sessionStorage.setItem("username", res.username);
            sessionStorage.setItem("token", res.accessToken);
            sessionStorage.setItem("role", res.roles);
            setError(false);
            setTimeout(() => setLoading(false), 3000);
            setTimeout(() => setUser(res), 3500);
            return;
          } else {
            setLoading(false);
            setError(true);
            setTimeout(() => setError(false), 3500);
          }
        });
    }
  };
  return (
    <>
      {user && <Redirect to="/home" />}
      <Sidebar />
      <img src={backgroundImg} alt="logo" className="background" />
      <div className="content center">
        <div className="content-form">
          <div className="form-logo">
            <img src={logoWhite} alt="" />
          </div>
          <div style={{ textAlign: "center" }}>
            {loading && <Loader style={{ margin: "0px auto" }} />}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {Error && (
                <Message
                  msg={"Contraseña o usuario incorrecto"}
                  bgColor="#dc3545"
                />
              )}
              <label htmlFor="username">Usuario</label>
              <div className="input-container">
                <i className="fas fa-user-circle"></i>
                <input
                  value={form.user}
                  type="text"
                  name="username"
                  placeholder="Ingresa tu usuario"
                  className="input"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-container">
                <i className="fas fa-lock"></i>
                <input
                  value={form.password}
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  className="input"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Entrar
            </button>
            <span className="button-separator">
              <span>o</span>
            </span>
            <Link to="/register">
              <div className="btn btn-secondary">Ir a Registrar</div>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

//moderator contra 12345678
