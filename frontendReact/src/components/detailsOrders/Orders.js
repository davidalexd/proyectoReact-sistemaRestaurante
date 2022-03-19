import Sidebar from "../sidebar/Sidebar";
import "./../../assets/css/notification.css";
import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Order from "./Order";
import { Message } from "../Dashboard/Message";
//URL DELIBAKERY
import { URL } from "../../api/apiDB";

const Orders = () => {
  const [db, setDb] = useState([]);
  const [Newdb, setNewdb] = useState([]);
  const [Error, setError] = useState(null);


  useEffect(() => {
    helpHttp()
      .get(`${URL.CLIENT_ORDERS}/${sessionStorage.getItem("id")}`)
      .then((res) => {
        if (res.length > 0) {
          setDb(res);
          setNewdb(res);
          setError(null);
        } else {
          setError(res);
        }
      }
      
      );
  }, []);

  const listStatus = (status) => {
    if (status) {
      let newdb = db.filter((el) => el.statusOrder === status);
      setNewdb(newdb);
    } else {
      setNewdb(db);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="parent">
        <div className="content">
          <header className="header">
            <div className="header-info">
              <div className="page-info">
                <h2 className="page-name">Notificaciones</h2>
              </div>
            </div>
          </header>
          {/* {Error && <Message msg={`Error a recargar`} bgColor="#dc3545" />} */}
          <div className="col-1 box-content">
            <div className="noti-container">
              <div className="noti-header">
                <h2 className="noti-title">
                  {db && <span>Ordenes totales {db.length}</span>}
                </h2>
                <div className="filter">
                  <ul className="filter-list">
                    <li
                      className="filter-item filter-active"
                      onClick={() => listStatus("")}
                    >
                      Todos
                    </li>
                    <li
                      className="filter-item"
                      onClick={() => listStatus("PENDIENTE")}
                    >
                      En proceso
                    </li>
                    <li
                      className="filter-item"
                      onClick={() => listStatus("PREPARANDO")}
                    >
                      En preparacion
                    </li>
                    <li
                      className="filter-item"
                      onClick={() => listStatus("ENVIANDO")}
                    >
                      Listo para el delivery
                    </li>
                    <li
                      className="filter-item"
                      onClick={() => listStatus("COMPLETADO")}
                    >
                      Completado
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product-container">
                {Newdb.map((order) => (
                  <Order key={order.idOrder} db={order} />
                ))}
                {/* {Newdb?Newdb.map((order) => (
                  <Order key={order.idOrder} db={order} />
                )):db.map((order) => (
                  <Order key={order.idOrder} db={order} />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Orders;
