import React from "react";

const Step = ({selected,index,label}) => {
  const description= {
    PENDIENTE:"Pedido pagado",
    PREPARANDO:"Orden recibida y preparandose",
    ENVIANDO:"Pedido empaquetado  y  listo para enviar",
    COMPLETADO:"Orden finalizada y confirmada",
  }
  return (
    <div className={"stepBlock"+(selected ?" selected":'')}>
      <div className="circleWrapper" >
        <div className="circle">{index + 1}</div>
      </div>
      <span>{label}</span>
      <p>{description[label]}</p>
    </div>
  );
};

export default Step;
