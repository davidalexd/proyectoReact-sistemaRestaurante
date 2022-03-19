import React from "react";
import { useState, useEffect } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import "./../../../assets/css/form.css";
import { Message } from "../Message";
//URL DELYBAKERY
import { URL } from "../../../api/apiDB";
///sweetalert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const initialForm = {
  idProduct: null,
  category: { idCategory: "", nameCategory: null },
  nameProduct: "",
  priceProduct: "",
  availableProduct: "",
  img: null,
  description: "",
};

export const ModalForm = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  closeModal,
}) => {
  const [db2, setDb2] = useState(null);
  const [Error, setError] = useState(null);
  //controlar respuestas del servidor
  useEffect(() => {
    helpHttp()
      .get(URL.PRODUCT_CATEGORY)
      .then((res) => {
        if (res.length > 0) {
          setDb2(res);
          setError(null);
        } else {
          setDb2(null);
          setError(res);
        }
      });
  }, []);

  const [form, setform] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setform(dataToEdit);
    } else {
      setform(initialForm);
    }
  }, [dataToEdit]);

  //sirve para manipular el cambio de estado de initialForm

  const selectChange = (e) => {
    let categoryId = e.target.value;

    setform({
      ...form,
      category: {
        idCategory: parseInt(categoryId),
      },
    });
  };

  const handleChange = (e) => {
    // let valor = e.target.value;
    // if (e.target.type === "select-one") {
    //   valor = e.target.options[e.target.selectedIndex].text;
    // }
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (
      !form.nameProduct ||
      !form.priceProduct ||
      !form.description ||
      form.category.idCategory === ""
    ) {

      MySwal.fire("Cuidado", "Datos incompletos", "warning");

      return;
    }

    //le pasamos los valores de estado de la variable form en las funciones create y update
    if (form.idProduct === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = () => {
    setform(initialForm);
    setDataToEdit(null);
  };
  const fileChange = (e) => {
    let selectedFile = e.target.files[0];
    setform({ ...form, img: selectedFile });
  };
  const handleAvariable = (e) => {
    if (e.target.value === "sold out") {
      setform({ ...form, availableProduct: false });
    } else {
      setform({ ...form, availableProduct: true });
    }
  };

  return (
    <>
      <div className="page-info">
        {Error && (
          <Message
            msg={"Error al comunicarse con el servidor"}
            bgColor="#dc3545"
          />
        )}
        <header className="settings-info">
          <h2 className="page-name">{dataToEdit ? "Editar" : "Agregar"}</h2>
          <div onClick={closeModal} className="">
            <h2 className="page-name">
              <i className="far fa-times-circle"></i>
            </h2>
          </div>
        </header>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product">Productos</label>
          <div className="input-container">
            <input
              type="text"
              placeholder="Name product.."
              className="input"
              name="nameProduct"
              onChange={handleChange}
              value={form.nameProduct}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <div className="input-container">
            <input
              type="number"
              name="priceProduct"
              placeholder="Price.."
              className="input"
              onChange={handleChange}
              value={form.priceProduct}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="desct">Descripción</label>
          <div className="input-container">
            <input
              type="text"
              placeholder="description.."
              className="input"
              name="description"
              onChange={handleChange}
              value={form.description}
            />
          </div>
        </div>
        <div className="select-container">
          {db2 && (
            <select
              value={form.category.idCategory}
              onChange={selectChange}
              className="select-form"
            >
              <option value="">Seleccione</option>
              {db2 &&
                db2.map((Elemento) => (
                  <option key={Elemento.idCategory} value={Elemento.idCategory}>
                    {Elemento.nameCategory}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div className="form-group ">
          <label htmlFor="avariable">Disponibilidad:</label>
          <div>
            <input
              type="radio"
              name="avariable"
              checked={form.availableProduct === true}
              onChange={handleAvariable}
              value="avariable"
            />
            <label htmlFor="sold out">Disponible</label>
          </div>
          <div>
            <input
              type="radio"
              name="sold out"
              checked={form.availableProduct === false}
              onChange={handleAvariable}
              value="sold out"
            />
            <label htmlFor="avariable">Agotado</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="file" className="file-content">
            <i className="fas fa-upload file-icon"></i> Choose a file...
            <input type="file" name="file0" id="file" onChange={fileChange} />
          </label>
        </div>
        <div className="btn-container">
          <button className="btn btn-primary" value="Enviar" type="submit">
            Save
          </button>
          <button
            type="reset"
            className="btn btn-secondary"
            value="limpiar"
            onClick={handleReset}
          >
            Discard
          </button>
        </div>
      </form>
    </>
  );
};
