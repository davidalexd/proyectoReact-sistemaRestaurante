import { Link } from "react-router-dom";
import Sidebar from "./../../sidebar/Sidebar";
import "./maindashboard.css";
import React  from "react";
import { MostOrders } from "./MostOrders";
import {ReportOrder} from "./ReportOrder";
import TotalPrice from "./TotalPrice";
import TotalProducts from "./TotalProducts";
import TotalClients from "./TotalClients";
import CircleGraphics from "./CircleGraphics";

const MainDashboard = () => {
  
  return (
    <>
      <Sidebar />
      <div className="parent content dashboard">
        <div className="column-1 ">
          <header className="header">
            <div className="header-info">
              <div className="page-info">
                <h2 className="page-name">Estadisticas de ventas</h2>
                <p className="date"> 12 Octubre 2021</p>
              </div>
              <div className=" input-center ">
                <div className="btn-container">
                  <Link to="maindashboard/dashboard/products">
                    <button className="btn btn-primary ">
                      Ir a Configuraciones
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="d-flex total-summary">
              <TotalPrice/>
              <TotalProducts/>
              <TotalClients/>
            </div>
            <ReportOrder />
          </main>
        </div>
        <div className="column-2">
          <div className="height-100">
            <MostOrders />
            <CircleGraphics/>
          </div>
        </div>
      </div>
    </>
  );
};

export { MainDashboard };
