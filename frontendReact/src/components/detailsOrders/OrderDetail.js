import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import OrderTableRowOrder from "./OrderTableRow";
import { useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useParams } from "react-router";
import OrderTracking from "./OrderTracking";
import Invoicing from "./Invoicing";
//URL DELIBAKERY
import { URL } from "../../api/apiDB";

const OrderDetail = () => {
  let { idorder } = useParams();
  const [Details, setDetails] = useState(null);
  const [Error, setError] = useState(null);
  //const [toggle, setToggle] = useState(false);
  useEffect(() => {
    helpHttp()
      .get(`${URL.CLIENT_ORDERS}/${sessionStorage.getItem("id")}`)
      .then((res) => {
        if (res.length > 0) {
          res.map((Orderselect) =>
            Orderselect.idOrder === parseInt(idorder)
              ? setDetails(Orderselect)
              : null
          );
          //console.log(Details.statusOrder)
          setError(null);
        } else {
          setError(res);
        }
      });
  }, []);
  return (
    <>
      <Sidebar />

      <div className="parent">
        <div className="content">
          <header className="header">
            <div className="header-info">
              <div className="page-info">
                <h2 className="page-name">Detalles</h2>
              </div>
            </div>
          </header>
          {Error && <h1>ha ocurrido un error</h1>}
          <div className="col-1 box-content">
            <div className="noti-container">
              <div className="noti-header">
                <h2 className="noti-title border-b">
                  Orden #
                  <span>{idorder}</span>
                </h2>
              </div>
              <div className="product-container">
                <table className="table">
                  <thead>
                    <tr>
                      <td>Producto</td>
                      <td>Precio</td>
                      <td>Cantidad</td>
                      <td>Categorias</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {Details &&
                      Details.orderDetails.map((item) => (
                        <OrderTableRowOrder
                          key={item.product.idProduct}
                          item={item.product}
                          quantity={item.quantity}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
              <OrderTracking Details={Details}/>
              {Details&&<Invoicing Details={Details}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;
