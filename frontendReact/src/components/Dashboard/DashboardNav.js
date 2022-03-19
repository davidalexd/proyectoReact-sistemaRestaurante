import React from "react";
import { Link } from "react-router-dom";
const DashboardNav = () => {
  return (
    <>
      <nav className="settings-navbar">
        <ul className="navbar-list">
          <Link to="/maindashboard/dashboard/products">
            <li className="navbar-item">
              <span className="navbar-icon">
                <i className="fas fa-box-open"></i>
              </span>
              <div className="navbar-content">
                <span className="name-item">Editar productos</span>
                <span className="desc-item">Configuración de Productos</span>
              </div>
            </li>
          </Link>
          <Link to="/maindashboard/dashboard/categories">
            <li className="navbar-item">
              <span className="navbar-icon">
                <i className="fas fa-tags"></i>
              </span>
              <div className="navbar-content">
                <span className="name-item">Editar categories</span>
                <span className="desc-item">Configuración de Categorias</span>
              </div>
            </li>
          </Link>
          <Link to="/maindashboard/dashboard/statusorder">
            <li className="navbar-item">
              <span className="navbar-icon">
                <i className="fas fa-clipboard-list"></i>
              </span>
              <div className="navbar-content">
                <span className="name-item">Estados de las ordenes</span>
                <span className="desc-item">Actualizar el estado</span>
              </div>
            </li>
          </Link>
          <Link to="/maindashboard/dashboard/usuarios">
            <li className="navbar-item">
              <span className="navbar-icon">
                <i className="fas fa-users-cog"></i>
              </span>
              <div className="navbar-content">
                <span className="name-item">Listado de usuarios</span>
                <span className="desc-item">Actualizar Rol</span>
              </div>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};
export { DashboardNav };
