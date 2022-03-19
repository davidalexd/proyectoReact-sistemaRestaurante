import React, { useState,useEffect, useReducer } from "react";
import { FilterCategory } from "./FilterCategory";
import { TYPES } from "../../acctions/shoppingAction";

//URL DELIBAKERY
import { URL } from "../../api/apiDB";

import { helpHttp } from "../helpers/helpHttp";
import {
  shoppingReducer,
  shoppingInitialState,
} from "../../reducers/shoppingReducer";
import Moment from "react-moment";

export const Header = ({ filtCategory,removeCategory}) => {
  useEffect(() => {
    //setLoading(true);
    helpHttp()
      .get(URL.PRODUCT_CATEGORY)
      .then((res) => {
        if (res.length > 0) {
          dispatch({ type: TYPES.READ_ALL_CATEGORY, payload: res });
          //setError(null);
        } else {
          dispatch({ type: TYPES.NO_DATA });
          //setError(res);
        }
        //setLoading(false);
      });
  }, []);


  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { category } = state;
  return (
    <header className="header">
      <div className="header-info">
        <div className="page-info">
          <h2 className="page-name">{sessionStorage.getItem("username")}</h2>
          <Moment format="LL"><p className="date">{Date.now()}</p></Moment>
        </div>
        <div>
        </div>
      </div>
      <div className="filter">
        <ul className="filter-list">
          <li className="filter-item" onClick={()=>removeCategory(null)}>
            <span>Todos</span>
          </li>
          {category &&
            category.map((item, index) => (
              <FilterCategory
                key={index}
                data={item}
                filtCategory={filtCategory}
              />
            ))}
        </ul>
      </div>
    </header>
  );
};
