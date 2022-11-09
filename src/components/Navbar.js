import React, {useState, useEffect} from "react";
import "./navbar.css";
import logo from "../images/logo.png";
import menutilted from "../images/menutilted.svg";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";

export default function Navbar(props) {
 
  return (
    <>
      <div className="logomain">
        <img src={logo} alt="logo-srcpoolup" />
      </div>

      <header style={props.positioning}>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#trending">picks</a>
            </li>
            <li>
              <a href="#collection">collection</a>
            </li>
            <li>
              <a href="#about">about</a>
            </li>
            <li>
              {props.title && <Link to="/login">profile</Link>}
              {props.title || <Link to="/profile">view profile</Link>}
            </li>
            <li>
              <img
                src={menutilted}
                alt="logo-srcpoolup"
                className="image-menu"
                width="40px"
              />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
