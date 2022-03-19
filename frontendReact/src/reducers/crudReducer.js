import { TYPES } from "../acctions/crudAction";
export const crudInitialState = {
  db: null,
  category:null,
  onecategory:[],
};

export function crudReducer(state, action) {
  switch (action.type) {
    case TYPES.READ_ALL_DATA: {
      return {
        ...state,
        db: action.payload.map((data) => data),
        onecategory: action.payload.map((data) => data),
      };
    }
    case TYPES.CREATE_DATA: {
      return {
        ...state,
        db: [...state.db, action.payload],
        onecategory: [...state.onecategory, action.payload],
      };
    }
    case TYPES.UPDATE_DATA: {
      let newData = state.db.map((el) =>
        el.idProduct === action.payload.idProduct ? action.payload : el
      );
      let newData2 = state.onecategory.map((el) =>
      el.idProduct === action.payload.idProduct ? action.payload : el
    );
      return {
        ...state,
        db: newData,
        onecategory:newData2
      };
    }
    case TYPES.DELETE_DATA: {
      let newData = state.db.filter((el) => el.idProduct !== action.payload);
      let newData2 = state.onecategory.filter((el) => el.idProduct !== action.payload);
      return {
        ...state,
        db: newData,
        onecategory:newData2
      };
    }

    case TYPES.READ_ALL_CATEGORY: {
      return {
        ...state,
        category: action.payload.map((category) => category),
      };
    }
    case TYPES.READ_ONE_CATEGORY: {
      return {
        ...state,
        onecategory: state.db.filter(
          (products) => products.category.idCategory === action.payload
        ),
      };
    }
    case TYPES.REMOVE_CATEGORY:{
        return{
          ...state,onecategory:state.db
        }
      }

    case TYPES.NO_DATA:
      return crudInitialState;
    default:
      return state;
  }
}
