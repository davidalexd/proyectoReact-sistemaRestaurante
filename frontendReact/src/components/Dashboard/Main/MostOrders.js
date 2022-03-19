import React, { useState, useEffect, useReducer } from "react";
import { Order } from "./Order";

//mensajes de error
import { Loader } from "../Loader";
import { Message } from "../Message";
//Usando useReducer

import { helpHttp } from "../../helpers/helpHttp";
import { TYPES } from "../../../acctions/mostOrderAction";
import {
  mostOrdersReducer,
  mostOrdersInitialState,
} from "../../../reducers/mostOrderReducer";

import { URL } from "../../../api/apiDB";
export const MostOrders = () => {
  //most order
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Combo, setCombo] = useState(1);


  const [state, dispatch] = useReducer(
    mostOrdersReducer,
    mostOrdersInitialState
  );
  const { db } = state;

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(`${URL.ALL_ORDERS}/mostOrdered?days=${Combo}`)
      .then((res) => {
        if (res.length > 0) {
          dispatch({ type: TYPES.READ_ALL_DATA, payload: res });
          setError(null);
        } else {
          dispatch({ type: TYPES.NO_DATA });
          setError(res);
        }
        setLoading(false);
      });
  }, [Combo]);

  const selectChange = (e) => {
    let cantDays = e.target.value;
    setCombo(cantDays);
  };
  return (
    <div className="box-scroll">
      <div className="box-content summary-container">
        <div className="summary">
          <header className="filter-header">
            <h4 className="summary-title">Mas ordenados</h4>
            <select onChange={selectChange} className="select-form">
              <option value="1">Más vendidos el último dia</option>
              <option value="7">Más vendidos la última semana</option>
              <option value="30">Más vendidos el último mes</option>
              <option value="360">Más vendidos todo el año</option>
            </select>
          </header>
          {Loading && <Loader />}
          {Error && (
            <Message msg="No se encontraron registros" bgColor="#EA7C69" />
          )}
          <div className="summary-content product">
            {db &&
              db.map((order) => (
                <Order key={order.product.idProduct} order={order} />
              ))}
          </div>
          <div className="btn btn-secondary">Ver todos</div>
        </div>
      </div>
    </div>
  );
};
