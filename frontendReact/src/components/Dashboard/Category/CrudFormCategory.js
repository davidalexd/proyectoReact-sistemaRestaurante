import React from "react";
import { useState, useEffect } from "react";

///sweetalert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const initialForm = {
  nameCategory: "",
  description: "",
  idCategory: null,
};

export const CrudFormCategory = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) => {
  const [form, setform] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setform(dataToEdit);
    } else {
      setform(initialForm);
    }
  }, [dataToEdit]);

  //sirve para manipular el cambio de estado de initialForm
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nameCategory || !form.description) {

      MySwal.fire("Cuidado", "Datos incompletos", "warning");
      return;
    }
    //le pasamos los valores de estado de la variable form en las funciones create y update
    if (form.idCategory === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setform(initialForm);
    setDataToEdit(null);
  };

  return (
    <div className="content-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameCategory">Categoria</label>
          <div className="input-container">
            <input
              type="text"
              name="nameCategory"
              id="nameCategory"
              placeholder="Categoria"
              className="input"
              onChange={handleChange}
              value={form.nameCategory}
            ></input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripcion</label>
          <div className="input-container">
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Descripcion"
              className="input"
              onChange={handleChange}
              value={form.description}
            ></input>
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn btn-primary">
            {dataToEdit ? "Edit" : "Agregar"}
          </button>
          <button
            type="reset"
            onClick={handleReset}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
