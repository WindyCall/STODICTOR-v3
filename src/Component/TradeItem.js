import React, { useState } from "react";
import { Link } from "react-router-dom";

function TradeItem(props) {
  const {
    item,
    idx,
    setTradeItemId,
    tradeType,
    setTradeItemName,
    setTradeItemCategory
  } = props;

  function getDisplayTradeType() {
    return tradeType ? "Purchase" : "Sale";
  }

  return (
    <tr key={item.name}>
      <td>{item.Id}</td>
      <td>{item.category}</td>
      <td>{item.name}</td>
      <td>{item.storage}</td>
      <Link
        onClick={() => {
          setTradeItemId(item.Id);
          setTradeItemName(item.name);
          setTradeItemCategory(item.category);
        }}
        to="/trade/itemselection/recordadder"
      >
        <strong> {getDisplayTradeType()} </strong>
      </Link>
    </tr>
  );
}

export default TradeItem;
