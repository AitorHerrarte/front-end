import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GeneralMenu"
import "./GeneralMenu.css"



const NavGame = () => {
  const [isOpen, setIsOpen] = useState(false);





  return (
    <div className="navGame">
      <div className="navlogo">TRADING PROYECT</div>
      
      <div className={`navtoggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)} >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default NavGame;
