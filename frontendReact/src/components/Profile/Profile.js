import React, { useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import ProfileFormUser from "./ProfileFormUser";
import HeaderProfile from "./HeaderProfile";

import "./profile.css";
import ChangePassword from "./ChangePassword";
const Profile = () => {
  const [select, setSelect] = useState(false);

  const OnToggle=()=>{
    setSelect(true)

  }
  
  const OffToggle=()=>{
    setSelect(false)

  }
  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="profile-content container">
          <HeaderProfile />
          <nav className="profile-options section">
            <ul className="btn-container">
              <li className="btn btn-primary" onClick={()=>OffToggle()}>Perfil</li>
              <li className="btn btn-secondary" onClick={()=>OnToggle()}>Cambiar contraseña</li>
              <li></li>
            </ul>
          </nav>
          {select ?  <ChangePassword />:<ProfileFormUser />}
        </div>
      </div>
    </>
  );
};
export { Profile };
