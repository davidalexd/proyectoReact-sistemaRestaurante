import { TYPES } from "../acctions/mostOrderAction";
export  const mostOrdersInitialState ={
    db:null
}


export function mostOrdersReducer(state,action){
    switch(action.type){
        case TYPES.READ_ALL_DATA:{
            return{
                ...state,
                db:action.payload.map((mostOrder)=>mostOrder),
            }

        }
        case TYPES.NO_DATA:
            return mostOrdersInitialState;
        default:
            return state;

    }

}