import React, { useState } from "react";
import Record from "./Record";
import { Link } from "react-router-dom";

function Trade(props) {
  const { setTradeType } = props;

  // check if name and id are consistent
  return (
    <div className="MainpageBox">
      <Link to="/">
        <strong> Back to DashBoard </strong>
      </Link>

      <h3> Choose your trade type </h3>
      <Link onClick={() => setTradeType(false)} to="/trade/itemselection">
        sale
      </Link>
      <br />
      <Link onClick={() => setTradeType(true)} to="/trade/itemselection">
        purchase
      </Link>
    </div>
  );
}

export default Trade;
