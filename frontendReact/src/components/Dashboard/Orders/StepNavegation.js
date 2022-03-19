import React from 'react';
import Step from './Step';
const StepNavegation = ({labelArray,formStatus}) => {
    let {statusOrder} =formStatus
    return (
        <div className="stepWrapper">
            {
            labelArray.map((item,index) => (<Step key={index} index={index} label={item}  selected={item.includes(statusOrder)}></Step>))}
        </div>
    )
}

export default StepNavegation
