import { Redirect } from "react-router";
import { Message } from "../Dashboard/Message";
import { Loader } from "../Dashboard/Loader";
import { Link } from "react-router-dom";
//Styles
import "./../../assets/css/form.css";
import "./../../assets/css/style.css";
import { useForm } from "./useForm";
//Images
import logoWhite from "./../../assets/images/logo-white.png";
import backgroundImg from "../../assets/images/background.jpg";
import Sidebar from "../sidebar/Sidebar";

const initialForm = {
  username: "",
  email: "",
  password: "",
  roles: [],
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[a-z0-9_\\_\ü]+$/;
  let regexNameLen = /^.{1,20}$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

  if (!form.username.trim()) {
    errors.username = "El campo 'Usuario' es requerido";
  } else if (!regexName.test(form.username.trim())) {
    errors.username = "El campo 'Usuario' no acepta espacios en blanco";
  } else if (!regexNameLen.test(form.username.trim())) {
    errors.username = "El campo 'Usuario' no debe exceder los 20 caracteres";
  }

  if (!form.email.trim()) {
    errors.email = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto";
  }

  if (!form.password.trim()) {
    errors.password = "El campo 'Contraseña' es requerido";
  }
  return errors;
};

let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};
export const RegisterUser = () => {
  const {
    form,
    Login,
    errors,
    loading,
    response,
    Error,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  return (
    <>
      {Login && <Redirect to="/login" />}
      <Sidebar />

      <img src={backgroundImg} alt="" className="background" />
      <div className="content center">
        <div className="content-form">
          <div className="form-logo">
            <img src={logoWhite} alt="" />
          </div>
          <div style={{ textAlign: "center" }}>
            {loading && <Loader style={{ margin: "0px auto" }} />}
          </div>
          {response && (
            <Message msg="Los datos han sido enviados" bgColor="#198754" />
          )}
          {Error && (
            <Message
              msg={"Ocurrio un error intentelo de nuevo"}
              bgColor="#dc3545"
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-container">
                <i className="fas fa-user-circle"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Escribe tu nombre de usuario"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.username}
                  className="input"
                  autoComplete="off"
                  required
                />
                {errors.username && <p style={styles}>{errors.username}</p>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Escribe tu email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.email}
                  className="input"
                  autoComplete="off"
                  required
                />
                {errors.email && <p style={styles}>{errors.email}</p>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Escribe tu contraseña"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.password}
                  className="input"
                  autoComplete="new-password"
                  required
                />
                {errors.password && <p style={styles}>{errors.password}</p>}
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Regístrate
            </button>
            <span className="button-separator">
              <span>o</span>
            </span>
            <Link to="/login">
              <div className="btn btn-secondary">Ir al Login</div>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
