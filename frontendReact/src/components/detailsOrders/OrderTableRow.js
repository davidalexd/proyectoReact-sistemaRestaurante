import React from "react";
//URL DELIBAKERY
import { URL } from "../../api/apiDB";
const OrderTableRowOrder = ({item,quantity}) => {
    let {idProduct,nameProduct,priceProduct,category}=item
    return (

        <tr>
          <td className="card-image product-cell" colSpan="2">
            <img
               src={`${URL.PRODUCT_DB}/${idProduct}/image`} alt={nameProduct}
            />
            <span>{nameProduct}</span>
          </td>
          <td>$ {priceProduct}</td>
          <td>{quantity}</td>
          <td>{category.nameCategory}</td>
          <td>{priceProduct*quantity}</td>
        </tr>
      );
    };
    
    export default OrderTableRowOrder;