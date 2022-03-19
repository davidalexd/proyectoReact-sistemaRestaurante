import { TYPES } from "../acctions/shoppingAction";

export const shoppingInitialState = {
  db: null,
  category:null,
  onecategory:null,
  cart: [],
  purchase_units: {
    reference_id: "",
    amount: {
      currency_code: "USD",
      value: null,
      breakdown: {
        item_total: {
          currency_code: "USD",
          value: null
        }
      }
    },
    items: [
      {
        sku:"",
        name: "",
        unit_amount: {
          currency_code: "USD",
          value: ""
        },
        quantity: ""
      },
    ]
  },
  payment_type:"",
  totalquantity:0,
  subtotal:0
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.READ_ALL_DATA: {
      return {
        ...state,
        db: action.payload.map((data) => data),
      };
    }
    case TYPES.READ_ALL_CATEGORY:{
      return{
        ...state,category: action.payload.map((category) => category)

      }
    }

    case TYPES.ADD_TO_CART: {
      let newItem = state.db.find(
        (product) => product.idProduct === action.payload
      );

      let itemInCart = state.cart.find(
        (item) => item.idProduct === newItem.idProduct
      );
      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.idProduct === newItem.idProduct
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    total: (item.quantity + 1) * item.priceProduct,
                  }
                : item
            ),
          }
        : {
            ...state,
            cart: [
              ...state.cart,
              { ...newItem, quantity: 1, total: newItem.priceProduct },
            ],
          };
    }


    case TYPES.ADD_TO_QUANTITY: {
        let sumquantity=(state.cart).length
      return {
        ...state,
        totalquantity: sumquantity
      };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find(
        (item) => item.idProduct === action.payload
      );

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.idProduct === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter(
              (item) => item.idProduct !== action.payload
            ),
          };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.idProduct !== action.payload),
      };
    }
    case TYPES.ADD_TO_PAY: {
        let suma=0
        state.cart.map(el=>{ suma=suma+el.total})
      return {
        ...state,subtotal:suma,
        purchase_units: {
          reference_id: "orderDish",
          amount: { currency_code: "USD", value:suma,breakdown:{
            item_total: {
              currency_code: "USD",
              value: suma,
            }
          }},
          items: state.cart.map((data) => ({...shoppingInitialState.purchase_units.items,sku:data.idProduct,name:data.nameProduct,unit_amount:{currency_code: "USD",value:data.priceProduct},quantity:data.quantity}))
        },
      };
    }
    case TYPES.READ_ONE_CATEGORY:{
      return{
        ...state,onecategory:state.db.filter((products) => products.category.idCategory === action.payload)

      }
    }
    case TYPES.REMOVE_CATEGORY:{
      return{
        ...state,onecategory:action.payload

      }
    }
    case TYPES.NO_DATA:
      return shoppingInitialState;
    default:
      return state;
  }
}
