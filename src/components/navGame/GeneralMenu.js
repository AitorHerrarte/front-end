import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GeneralMenu"


const NavGame = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navGame">
      <div className="navlogo">Financial Challenge</div>
      <div className={`navitems ${isOpen && "open"}`}>
        <Link to={'/Profile'}>PROFILE</Link>
      </div>
      <div className={`navtoggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)} >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default NavGame;
