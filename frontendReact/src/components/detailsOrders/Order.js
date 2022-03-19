import React from "react";
import clipboard from "../../assets/images/clipboard.png";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment/locale/es-mx';

const Order = ({db}) => {
    let {idOrder,totalPrice,statusOrder,createdAt} =db
        let  style = {
      "COMPLETADO": "completed",
      "PENDIENTE": "pending",
      "ENVIANDO": "delivering",
      "PREPARANDO": "preparing" 
    }
    return (
      <div className={`product product-item ${style[statusOrder]}`}>
        <Link  to={"/notifications/order/"+idOrder} className="product-content"  >
          <h2 className="center product-title">#{idOrder}</h2>
          <div className="product-image center">
            <img src={clipboard} alt="clipboard"/>
          </div>
          <div className="product-info">
            <span className="product-name"></span>
            <span className="product-details">
              <span><Moment fromNow>{createdAt}</Moment></span> &bull;
              <span> Subtotal: ${totalPrice}</span>
            </span>
          </div>
          </Link>
        <div className="btn-product center">
          <div className="status">{statusOrder}</div>
        </div>
      </div>
    );
  };
  
  export default Order;