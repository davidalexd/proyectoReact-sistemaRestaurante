import React from "react";

const CrudTableRow = ({el,setDataToEdit,deleteData}) => {
    let {nameCategory,description,idCategory }=el;
  return (
      <tr>
        <td>{nameCategory}</td>
        <td>{description}</td>
        <td className="table-buttons">
          <span className="table-btn-edit" onClick={()=>setDataToEdit(el)}><i className="fas fa-edit"></i></span>
          <span className="table-btn-delete"onClick={()=>deleteData(idCategory)}><i className="fas fa-trash-alt"></i></span>
        </td>
      </tr>
  );
};

export default CrudTableRow;
