import React from 'react'
import CrudTableRow from './CrudTableRow';
import "../../../assets/css/category.css";
const CrudTable = ({data,setDataToEdit,deleteData}) => {
    return (
        <div className="table-container">
            <h3 className="title">Categorias</h3>
            <table className="table-content">
                <thead className="thead">
                    <tr>
                        <th>Nombre Categoria</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {data.length > 0 ? (
                    data.map(el => <CrudTableRow key={el.idCategory} el={el} setDataToEdit={setDataToEdit} deleteData={deleteData}/>)
                ):(
                <tr>
                    <td colSpan="2">Sin datos.</td>
                </tr>
                    )}
                </tbody>
            </table>       
        </div>
    );
};

export default CrudTable;
