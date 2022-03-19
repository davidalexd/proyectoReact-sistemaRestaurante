import React from "react";
import { URL } from "../../../api/apiDB";

export const Order = ({ order }) => {
  let { product, total } = order;
  return (
    <div className="summary-item">
      <div className="product-image center summary-product">
        <img
          src={`${URL.PRODUCT_DB}/${product.idProduct}/image`}
          alt={product.nameProduct}
        />
      </div>
      <div className="summary-desc">
        <div className="name">{product.nameProduct}</div>
        <div className="qty">{total} total de productos ordenados</div>
      </div>
    </div>
  );
};
