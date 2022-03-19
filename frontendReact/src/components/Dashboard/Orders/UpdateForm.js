import React, { useEffect, useState } from "react";
import "moment/locale/es";
import Moment from "react-moment";
import StepNavegation from "./StepNavegation";
import "./stepOrder.css";
//para perfil
import { URL } from "../../../api/apiDB";
import { helpHttp } from "../../helpers/helpHttp";
import OrderTableRowOrder from "../../detailsOrders/OrderTableRow";

///sweetalert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const initialForm = {
  idOrder: null,
  statusOrder: "",
};
const initialProfile = {
  address: "",
  firstName: "",
  idProfile: null,
  lastName: "",
  phoneNumber: "",
};

const UpdateForm = ({ updateOrder, dataToEdit }) => {
  const [form, setform] = useState(initialForm);
  const [profile, setProfile] = useState(initialProfile);

  const labelArray = ["PENDIENTE", "PREPARANDO", "ENVIANDO", "COMPLETADO"];

  useEffect(() => {
    if (dataToEdit) {
      setform(dataToEdit);
      helpHttp()
        .get(`${URL.USERS_DB}/${dataToEdit.user.idUser}/profile`)
        .then((res) => {
          if (!res.err) {
            setProfile(res);
          }
        });
    } else {
      setform(initialForm);
    }
  }, [dataToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.statusOrder || !form.idOrder) {

      MySwal.fire("Cuidado", "Datos incompletos", "warning");
      return;
    }
    switch (form.statusOrder) {
      case "PENDIENTE":
        setform({
          ...form,
          statusOrder: "PREPARANDO",
        });
        let status1 = { idOrder: form.idOrder, statusOrder: "PREPARANDO" };
        updateOrder(status1);
        handleReset();
        break;
      case "PREPARANDO":
        setform({
          ...form,
          statusOrder: "ENVIANDO",
        });
        let status2 = { idOrder: form.idOrder, statusOrder: "ENVIANDO" };
        updateOrder(status2);
        handleReset();
        break;
      case "ENVIANDO":
        setform({
          ...form,
          statusOrder: "COMPLETADO",
        });
        let status3 = { idOrder: form.idOrder, statusOrder: "COMPLETADO" };
        updateOrder(status3);
        handleReset();
        break;
      case "COMPLETADO":

        MySwal.fire("Listo", "Este pedido a sido finalizado", "success");
        handleReset();
        break;
      default:
        console.log("El estado no se encuentra");
        break;
    }
  };
  const handleReset = (e) => {
    setform(initialForm);
  };
  return (
    <div className="content-form">
      <form onSubmit={handleSubmit}>
        {form.idOrder ? (
          <div className="form-group">
            <label htmlFor="idOrder">NUMERO DE ORDEN: {form.idOrder}</label>
            <label htmlFor="client">
              CLIENTE: {`${profile.firstName} ${profile.lastName}  `}
            </label>
            <label htmlFor="statusOrder">
              ESTADO DEL PEDIDO: {form.statusOrder}
            </label>
            <label htmlFor="date">TELEFONO: {profile.phoneNumber}</label>

            <label htmlFor="date">DIRECCION: {profile.address}</label>

            <label htmlFor="date">
              ULTIMA ACTUALIZACION: <Moment fromNow>{form.updateAt}</Moment>
            </label>

            <div className="Graphic-step">
              <StepNavegation
                labelArray={labelArray}
                formStatus={form}
              ></StepNavegation>
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
                  {dataToEdit &&
                    dataToEdit.orderDetails.map((item) => (
                      <OrderTableRowOrder
                        key={item.product.idProduct}
                        item={item.product}
                        quantity={item.quantity}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="idOrder">
              NUMERO DE ORDEN: SELECCIONE UNA ORDEN
            </label>
          </div>
        )}
        <div className="btn-container">
          <button type="submit" className="btn btn-primary">
            FINALIZAR ETAPA
          </button>
          <button
            type="reset"
            onClick={handleReset}
            className="btn btn-secondary"
          >
            LIMPIAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
