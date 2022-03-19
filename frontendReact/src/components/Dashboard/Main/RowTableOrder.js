import React from 'react'
//URL DELYBAKERY
import { URL } from "../../../api/apiDB";

const RowTableOrder = ({report}) => {
    let {user,total,status,address} = report
    let  style = {
      "COMPLETADO": "completed",
      "PENDIENTE": "pending",
      "ENVIANDO": "delivering",
      "PREPARANDO": "preparing" 
    }
    return (
        <tr className="row">
          <td className="customer-col customer-data">
            <div className="profile-image">
              <img src={`${URL.USERS_DB}/${user.idUser}/image`}alt={user.username} />
            </div>
            <span>{user.username}</span>
          </td>
          <td className="order-col">
            {address}
          </td>
          <td className="total-col">$ {total}</td>
          <td className="status-col">
          {style[status] && <span className={`color-status ${style[status]}`}>{status}</span>}
          </td>
        </tr>
    )
}

export default RowTableOrder

