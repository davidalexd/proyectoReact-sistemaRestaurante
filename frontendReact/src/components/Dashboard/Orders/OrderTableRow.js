import React from 'react'

const OrderTableRow = ({el,setDataToEdit}) => {
    return (
        <tr>
        <td>{el.idOrder}</td>
        <td>{el.user.username}</td>
        <td>{el.statusOrder}</td>
        <td className="table-buttons">
          <span className="table-btn-edit" onClick={()=>setDataToEdit(el)}><i className="fas fa-edit"></i></span>
        </td>
      </tr>
    )
}

export default OrderTableRow
