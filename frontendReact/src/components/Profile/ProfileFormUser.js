import React, { useState } from "react";
import { Message } from "../Dashboard/Message";
import { useProfile } from "./useProfile";
const initialForm = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: ""
};
const styles = {
  fontWeight: "bold",
  color: "#dc3545",
};
const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
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

const ProfileFormUser = () => {
  const {
    form,
    errors,
    response,
    Error,
    checkout,
    handleChange,
    handleBlur,
    handleSubmit,
    handleEdit,
    handleReset,
  } = useProfile(initialForm, validationsForm);

  return (
    <main className="profile-details section">
      {checkout ? (
        <form onSubmit={handleSubmit}>
          {response && (
            <Message msg="datos actualizados" bgColor="#198754" />
          )}
          <div className="form-group">
            <h4>Nombres</h4>
            <div className="input-container">
              <div className="profile-icon center">
                <i className="fas fa-user"></i>
              </div>
              <input
                type="text"
                name="firstName"
                className="input"
                placeholder="Su nombre"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.firstName}
                required
                autoComplete="off"
              ></input>
              {errors.firstName && <p style={styles}>{errors.firstName}</p>}
            </div>
          </div>
          <div className="form-group">
            <h4>Apellidos</h4>
            <div className="input-container">
              <div className="profile-icon center">
                <i className="fas fa-user"></i>
              </div>
              <input
                type="text"
                name="lastName"
                className="input"
                placeholder="Su Apellidos"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.lastName}
                required
                autoComplete="off"
              ></input>
              {errors.lastName && <p style={styles}>{errors.lastName}</p>}
            </div>
          </div>
          <div className="form-group">
            <h4>Telefono</h4>
            <div className="input-container">
              <div className="profile-icon center">
                <i className="fas fa-phone"></i>
              </div>
              <input
                type="number"
                name="phoneNumber"
                className="input"
                placeholder="Su telefono"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.phoneNumber}
                required
                autoComplete="off"
              ></input>
              {errors.phoneNumber && <p style={styles}>{errors.phoneNumber}</p>}
            </div>
          </div>
          <div className="form-group">
            <h4>Direccion</h4>
            <div className="input-container">
              <div className="profile-icon center">
                <i className="fas fa-house-user"></i>
              </div>
              <input
                type="text"
                name="address"
                className="input"
                placeholder="Su direccion"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.address}
                required
                autoComplete="off"
              ></input>
              {errors.address && <p style={styles}>{errors.address}</p>}
            </div>
          </div>
          <div className="btn-container">
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
            <li className="btn btn-secondary" onClick={() => handleReset()}>
              Cancelar
            </li>
          </div>
        </form>
      ) : (
        <>
          <div className="profile-item mb-1">
            <div className="profile-icon center">
              <i className="fas fa-user"></i>
            </div>
            <div className="profile-detail">
              <h4>Nombres</h4>
              <span className="profile-value">{form.firstName}</span>
            </div>
          </div>
          <div className="profile-item mb-1">
            <div className="profile-icon center">
              <i className="fas fa-user"></i>
            </div>
            <div className="profile-detail">
              <h4>Apellidos</h4>
              <span className="profile-value">{form.lastName}</span>
            </div>
          </div>
          <div className="profile-item mb-1">
            <div className="profile-icon center">
              <i className="fas fa-phone"></i>
            </div>
            <div className="profile-detail">
              <h4>Telefono</h4>
              <span className="profile-value">{form.phoneNumber}</span>
            </div>
          </div>
          <div className="profile-item mb-1">
            <div className="profile-icon center">
              <i className="fas fa-house-user"></i>
            </div>
            <div className="profile-detail">
              <h4>Direccion</h4>
              <span className="profile-value">{form.address}</span>
            </div>
          </div>
          <div className="btn-container">
            <li className="btn btn-primary" onClick={() => handleEdit()}>
              Editar
            </li>

            <li className="btn btn-secondary" onClick={() => handleReset()}>
              Cancelar
            </li>
          </div>
        </>
      )}
    </main>
  );
};

export default ProfileFormUser;

/* <div className="profile-item mb-1">
          <div className="profile-icon center">
            <i className="fas fa-user"></i>
          </div>
          <div className="profile-detail">
            <h4>Nombres</h4>
            <span className="profile-value">Marck Antonio</span>
          </div>
        </div>
        <div className="profile-item mb-1">
          <div className="profile-icon center">
            <i className="fas fa-phone"></i>
          </div>
          <div className="profile-detail">
            <h4>Telefono</h4>
            <span className="profile-value">9912376822</span>
          </div>
        </div>
        <div className="profile-item mb-1">
          <div className="profile-icon center">
            <i className="fas fa-house-user"></i>
          </div>
          <div className="profile-detail">
            <h4>Direccion</h4>
            <span className="profile-value">ANCON PAMPLONA PIEDRAS GORDAS</span>
          </div>
        </div> */

// const [form, setForm] = useState(initialForm);

// useEffect(() => {
//   helpHttp()
//     .get(`${URL.USERS_DB}/${idcli}/profile`)
//     .then((res) => {
//       setForm(res);
//     });
// }, []);

// const handleChange = (e) => {
//   setForm({
//     ...form,
//     [e.target.name]: e.target.value,
//   });
// };
// const fileChange = (e) => {
//   let selectedFile = e.target.files[0];
//   setForm({ ...form, profilePicture: selectedFile });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   let dataClient = {
//     firstName: form.firstName,
//     lastName: form.lastName,
//     phoneNumber: form.phoneNumber,
//     address: form.address,
//   };
//   helpHttp()
//     .post(`${URL.USERS_DB}/${idcli}/profile`, {
//       body: dataClient,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     })
//     .then((res) => {
//       if (!res.err) {
//         if (form.profilePicture) {
//           //guardando imagenes
//           const formdata = new FormData();
//           formdata.append("file", form.profilePicture);
//           let requestOptions = {
//             body: formdata,
//             method: "POST",
//           };
//           fetch(`${URL.USERS_DB}/${idcli}/image`, requestOptions)
//             .then((resp) => resp)
//             .then((resp) => console.log(resp))
//             .catch((error) =>
//               console.log("ERROR NO REGISTRO LA IMAGEN", error)
//             );
//           return;
//         }
//       }
//     });
// };
