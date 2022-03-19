import React from "react";

const OrderTableRowInvoicing = ({ item, quantity }) => {
  let {  nameProduct, priceProduct, description } = item;
  return (
    <tr>
      <td>{nameProduct}</td>
      <td>{description}</td>
      <td>$ {priceProduct}</td>
      <td>{quantity}</td>
      <td>{priceProduct * quantity}</td>
    </tr>
  );
};

export default OrderTableRowInvoicing;
