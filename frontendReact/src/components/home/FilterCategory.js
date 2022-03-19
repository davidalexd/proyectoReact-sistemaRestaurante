import React from "react";
export const FilterCategory = ({ data, filtCategory }) => {
  let { nameCategory, idCategory } = data;

  return (
    <>
      <li className="filter-item " onClick={() => filtCategory(idCategory)}>
        {nameCategory}
      </li>
    </>
  );
};
