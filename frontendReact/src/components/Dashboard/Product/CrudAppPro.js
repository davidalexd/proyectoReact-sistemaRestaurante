import React from "react";
import { useState, useEffect, useReducer } from "react";
import CrudTablePro from "./CrudTablePro";
import { helpHttp } from "../../helpers/helpHttp";
import {DashboardHeader} from "../DashboardHeader"
import { crudInitialState, crudReducer } from "../../../reducers/crudReducer";
import { TYPES } from "../../../acctions/crudAction";

//URL DELYBAKERY
import { URL } from "../../../api/apiDB";

export const CrudAppPro = () => {
  //const [db, setDb] = useState(null);
  const [state, dispatch] = useReducer(crudReducer, crudInitialState);
  const {onecategory } = state;

  //variable de estado cuando sea null va  insertar de lo contrario actualizara
  const [dataToEdit, setDataToEdit] = useState(null);
  // mensaje de error
  const [Error, setError] = useState(null);
  //  cargando
  const [Loading, setLoading] = useState(false);

  let api = helpHttp();


  //controlar respuestas del servidor
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
  
        }
        setLoading(false);
      });
  }, []);
  

  const filtCategory=(idCategory)=>{
    dispatch({ type: TYPES.READ_ONE_CATEGORY,payload:idCategory});
  }
  const removeCategory=()=>{
    dispatch({ type: TYPES.REMOVE_CATEGORY});
  }
  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(URL.PRODUCT_DB, options).then((res) => {
      if (!res.err) {
        dispatch({ type: TYPES.CREATE_DATA, payload: res });

        if (data.img) {
          //guardando imagenes
          const formdata = new FormData();
          formdata.append("file", data.img);
          let requestOptions = {
            body: formdata,
            method: "POST",
          };
          fetch(
            `${URL.PRODUCT_DB}/${res.idProduct}/image`,
            requestOptions
          )
            .then((resp) => resp)
            .then((resp) => console.log(resp))
            .catch((error) =>
              console.log("ERROR NO REGISTRO LA IMAGEN", error)
            );
        }
      } else {
        console.log(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${URL.PRODUCT_DB}/${data.idProduct}`;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.patch(endpoint, options).then((res) => {
      if (!res.err) {
        dispatch({ type: TYPES.UPDATE_DATA, payload: data });
        dispatch({ type: TYPES.READ_ONE_CATEGORY,payload:data.category.idCategory})

        if (data.img) {
          //ACTUALIZANDO IMAGENES
          const formdata = new FormData();
          formdata.append("file", data.img);
          let requestOptions = {
            body: formdata,
            method: "POST",
          };
          fetch(
            `${URL.PRODUCT_DB}/${data.idProduct}/image`,
            requestOptions
          )
            .then((resp) => resp)
            .then((resp) => console.log(resp))
            .catch((error) =>
              console.log("ERROR NO REGISTRO LA IMAGEN", error)
            );
            dispatch({ type: TYPES.READ_ONE_CATEGORY,payload:data.category.idCategory})
        }
      } else {
        setError(res);
      }
    });
  };
  const deleteData = (id) => {
    let isDelete = window.confirm(`Desea eliminar registro ${id}?`);
    if (isDelete) {
      let endpoint = `${URL.PRODUCT_DB}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          dispatch({ type: TYPES.DELETE_DATA, payload: id });
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };
  return (
    <>
    <DashboardHeader filtCategory={filtCategory} removeCategory={removeCategory}/>
      {onecategory && (
        <CrudTablePro
          data={onecategory}
          //funcion para actualizar laa  nueva renderizacion sin el elemento renderizado
          setDataToEdit={setDataToEdit}
          //pasamos el deletedata para eliminar un id
          deleteData={deleteData}
          createData={createData}
          updateData={updateData}
          //para diferenciar entre create y update necesitamos pasarle la variable de estado y la funcion que actualiza datatoedit
          dataToEdit={dataToEdit}
          Loading={Loading}
          Error={Error}
        />
      )}
    </>
  );
};
