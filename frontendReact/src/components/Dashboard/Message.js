import React from 'react'

export const Message = ({msg,bgColor}) => {
    let styles ={
        padding: "1rem",
        marginBottom: "1rem",
        TextAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        backgroundColor: bgColor,
    }
    return (
        <div style={styles}>
            {msg}
        </div>
    )
}
