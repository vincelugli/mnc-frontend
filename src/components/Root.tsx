import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";

import "./Root.css";
import CSS from 'csstype';

const baseSideBarStyle: CSS.Properties = {
  height: "100%", /* 100% Full-height */
  position: "fixed", /* Stay in place */
  zIndex: 1, /* Stay on top */
  top: 0, /* Stay at the top */
  left: 0,
  backgroundColor: "#111", /* Black*/
  overflowX: "hidden", /* Disable horizontal scroll */
  paddingTop: "60px", /* Place content 60px from the top */
  transition: "0.5s", /* 0.5 second transition effect to slide in the sidenav */
}

const sideBarStyle: CSS.Properties = {
  ...baseSideBarStyle,
  width: "250px", /* 0 width - change this with JavaScript */
}

const sideBarCollapsedStyle: CSS.Properties = {
  ...baseSideBarStyle,
  width: "0px", /* 0 width - change this with JavaScript */
}

const sideBarIcon: CSS.Properties = {
  position: "absolute",
  top: 0,
  right: "25px",
  fontSize: "36px",
  marginLeft: "50px",
  padding: "8px 8px 8px 32px",
  textDecoration: "none",
  color: "#818181",
  display: "block",
  transition: "0.3s",
}

export default function Root() {


    const [isNavigationCollapsed, setIsNavigationCollapsed] = useState<boolean>(true);

    const onToggleNavigation = () => {
      setIsNavigationCollapsed(!isNavigationCollapsed);
    }

    return (
    <>
      <div id="mySidenav" className="sidenav" style={isNavigationCollapsed ? sideBarCollapsedStyle : sideBarStyle}>
        <a style={sideBarIcon} onClick={onToggleNavigation}><AiOutlineClose/></a>
        <Link to="/playerOverview">Player Overview</Link>
        <Link to="/matchmaker">Matchmaker</Link>
      </div>
      <div style={{flex:1, width: "100%"}}>
      <a style={{...sideBarIcon, right: 0, left: 0, marginLeft: 0, paddingLeft:25}} onClick={onToggleNavigation}><AiOutlineMenu/></a>
      <Outlet />
      </div>
    </>
    );
  }