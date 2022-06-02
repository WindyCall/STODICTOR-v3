import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RecordAdder(props) {
  const {
    tradeType,
    tradeItemId,
    tradeItemName,
    tradeItemCategory,
    onAddNewRecord
  } = props;

  const [addNewRecordDate, setAddNewRecordDate] = useState("");
  const [addNewRecordPrice, setAddNewRecordPrice] = useState();
  const [addNewRecordCnt, setAddNewRecordCnt] = useState();

  function getDisplayTradeType() {
    return tradeType ? "Purchase" : "Sale";
  }

  function toDate(s) {
    let date = s.substring(8, 10);
    let year = s.substring(11, 15);
    let mon = s.substring(4, 7);

    if (mon === "Jan") {
      mon = "01";
    }
    if (mon === "Feb") {
      mon = "02";
    }
    if (mon === "Mar") {
      mon = "03";
    }
    if (mon === "Apr") {
      mon = "04";
    }
    if (mon === "May") {
      mon = "05";
    }
    if (mon === "Jun") {
      mon = "06";
    }
    if (mon === "Jul") {
      mon = "07";
    }
    if (mon === "Aug") {
      mon = "08";
    }
    if (mon === "Sep") {
      mon = "09";
    }
    if (mon === "Oct") {
      mon = "10";
    }
    if (mon === "Nov") {
      mon = "11";
    }
    if (mon === "Dec") {
      mon = "12";
    }
    return mon + "/" + date + "/" + year;
  }

  return (
    <div className="MainpageBox">
      <Link to="/trade/itemselection">Rechoose Item</Link>

      <h1> RecordAdder </h1>
      <h3> Item information: </h3>
      <form>
        <strong> Trade Type: {getDisplayTradeType()} </strong>
        <br />
        <strong> Item Id: {tradeItemId} </strong>
        <br />
        <strong> Item name: {tradeItemName} </strong>
        <br />
        <strong> Item catogrory: {tradeItemCategory} </strong>
        <br />
      </form>

      <strong>Date</strong>
      <br />
      <DatePicker
        placeholderText="Choose trade date"
        selected={addNewRecordDate}
        onChange={(date) => setAddNewRecordDate(date)}
      />
      <br />
      <strong>Price</strong>
      <br />
      <input
        value={addNewRecordPrice}
        onChange={(e) => setAddNewRecordPrice(e.target.value)}
        placeholder="Input price"
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
      <br />
      <strong>Count</strong>
      <br />
      <input
        value={addNewRecordCnt}
        placeholder="Input number of items"
        onChange={(e) => setAddNewRecordCnt(e.target.value)}
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
      <br />
      <br />
      <button
        onClick={() =>
          onAddNewRecord(
            tradeType,
            tradeItemId,
            tradeItemName,
            tradeItemCategory,
            toDate(addNewRecordDate.toString()),
            addNewRecordPrice,
            addNewRecordCnt
          )
        }
      >
        Confirm this trade
      </button>
    </div>
  );
}

export default RecordAdder;
