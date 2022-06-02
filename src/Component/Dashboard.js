import React from "react";
import { Link } from "react-router-dom";

function Dashboard(props) {
  return (
    <div className="MainpageBox">
      <h1> Dashboard </h1>
      <Link to={"/trade"}>
        <img
          className="DashboardPictures"
          src={require("../pictures/Trade.png")}
          alt="Logo"
        />
      </Link>
      <Link to={"/predict"}>
        <img
          className="DashboardPictures"
          src={require("../pictures/Predict.png")}
          alt="Logo"
        />
      </Link>
    </div>
  );
}

export default Dashboard;
