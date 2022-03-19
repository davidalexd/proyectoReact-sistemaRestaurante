//usando funciones reductoras
import React, { useState, useEffect, useReducer } from "react";

//mensajes de error
import { Loader } from "../Loader";
import { Message } from "../Message";

import RowTableOrder from "./RowTableOrder";
import { helpHttp } from "../../helpers/helpHttp";
import { TYPES } from "../../../acctions/reportOrderAction";
import {
  reportOrderReducer,
  reportOrderInitialState,
} from "../../../reducers/reportOrderReducer";

//URL DELYBAKERY
import { URL } from "../../../api/apiDB";

export const ReportOrder = () => {
  //variables de estado para manejar la carga y el error
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);

  // variable para cambiar los registros segun el dia
  const [Combo, setCombo] = useState(1);

  // variables de estado reductoras
  const [state, dispatch] = useReducer(
    reportOrderReducer,
    reportOrderInitialState
  );
  const { db } = state;

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(`${URL.ALL_ORDERS}/orderReport?days=${Combo}`)

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
    <div className="box-content order-report">
      <header className="filter-header">
        <h4 className="summary-title">Reporte de ordenes</h4>
        <select onChange={selectChange} className="select-form">
          <option value="1">Reporte del último dia</option>
          <option value="7">Reporte de la última semana</option>
          <option value="30">Reporte del último mes</option>
          <option value="365">Reporte de todo el año</option>
        </select>
      </header>
      {Loading && <Loader />}
      {Error && <Message msg="No se encontraron registros" bgColor="#EA7C69" />}
      <div className="table-scroll">
        <table className="dashboard-table">
          <thead className="table-header">
            <tr className="table-row">
              <th className="customer-col">Cliente</th>
              <th className="order-col">direccion</th>
              <th className="total-col">Total</th>
              <th className="status-col">Estado</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {db &&
              db.map((reportorder, index) => (
                <RowTableOrder key={index} report={reportorder} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
