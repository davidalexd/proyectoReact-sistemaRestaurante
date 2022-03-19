import { TYPES } from "../acctions/reportOrderAction";
export  const reportOrderInitialState ={
    db:null
}


export function reportOrderReducer(state,action){
    switch(action.type){
        case TYPES.READ_ALL_DATA:{
            return{
                ...state,
                db:action.payload.map((reportOrder)=>reportOrder),
            }

        }
        case TYPES.NO_DATA:
            return reportOrderInitialState;
        default:
            return state;

    }

}