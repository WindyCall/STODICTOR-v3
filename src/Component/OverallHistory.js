import React, { useState } from "react";
import CategoryList from "./CategoryList";
import Record from "./Record";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function OverallHistory(props) {
  const { onDeleteRecord, records, categories, onUpdateRecord } = props;

  const [searchRecordId, setSearchRecordId] = useState("");
  const [searchRecordCategory, setSearchRecordCategory] = useState("");
  const [searchRecordName, setSearchRecordName] = useState("");
  const [searchRecordStartDate, setSearchRecordStartDate] = useState("");
  const [searchRecordEndDate, setSearchRecordEndDate] = useState("");

  function comparedate1(a, bb) {
    if (bb === null) {
      return true;
    }
    const b = toDate(bb.toString());
    // if a>=b, return true
    let a_year = parseInt(a.substring(6, 10));

    let a_mon = parseInt(a.substring(0, 2));
    let a_day = parseInt(a.substring(3, 5));

    let b_year = parseInt(b.substring(6, 10));
    let b_mon = parseInt(b.substring(0, 2));
    let b_day = parseInt(b.substring(3, 5));

    if (a === "//" || b === "//") {
      return true;
    }

    if (a_year > b_year) {
      return true;
    }
    if (a_mon > b_mon && a_year === b_year) {
      return true;
    }
    return a_day >= b_day && a_mon === b_mon && a_year === b_year;
  }

  function comparedate2(aa, b) {
    if (aa === null) {
      return true;
    }
    const a = toDate(aa.toString());
    // if a>=b, return true
    let a_year = parseInt(a.substring(6, 10));

    let a_mon = parseInt(a.substring(0, 2));
    let a_day = parseInt(a.substring(3, 5));

    let b_year = parseInt(b.substring(6, 10));
    let b_mon = parseInt(b.substring(0, 2));
    let b_day = parseInt(b.substring(3, 5));

    if (a === "//" || b === "//") {
      return true;
    }

    if (a_year > b_year) {
      return true;
    }
    if (a_mon > b_mon && a_year === b_year) {
      return true;
    }
    return a_day >= b_day && a_mon === b_mon && a_year === b_year;
  }

  function getValidRecords() {
    return records.filter((record) => {
      return (
        (searchRecordCategory === "" ||
          record.category === searchRecordCategory) &&
        record.Id.includes(searchRecordId) &&
        record.name.toLowerCase().includes(searchRecordName.toLowerCase()) &&
        comparedate1(record.date, searchRecordStartDate) &&
        comparedate2(searchRecordEndDate, record.date)
      );
    });
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

  function getValidAveragePrice() {
    const totalPrice = getValidRecords()
      .map((record) => record.price)
      .reduce((x, y) => x + y, 0);
    return totalPrice / getValidRecords().length;
  }

  function getValidAverageCnt() {
    const totalCnt = getValidRecords()
      .map((record) => record.cnt)
      .reduce((x, y) => x + y, 0);
    return totalCnt / getValidRecords().length;
  }

  return (
    <div className="MainpageBox">
      <h2> Overrall History </h2>
      <h3> Search for your record </h3>
      <div>
        <strong> StartDate </strong>
        <DatePicker
          placeholderText="Choose start date"
          selected={searchRecordStartDate}
          onChange={(date) => setSearchRecordStartDate(date)}
        />
        <strong> EndDate </strong>
        <DatePicker
          placeholderText="Choose end date"
          selected={searchRecordEndDate}
          onChange={(date) => setSearchRecordEndDate(date)}
        />
      </div>
      <br />
      <strong> ID </strong>
      <input
        style={{ margin: "0 1rem" }}
        type="text"
        value={searchRecordId}
        onChange={(e) => setSearchRecordId(e.target.value)}
        placeholder="Input ID here"
      />
      <strong> Name </strong>
      <input
        style={{ margin: "0 1rem" }}
        type="text"
        value={searchRecordName}
        onChange={(e) => setSearchRecordName(e.target.value)}
        placeholder={"Search here"}
      />
      <CategoryList
        searchRecordCategory={searchRecordCategory}
        setSearchRecordCategory={setSearchRecordCategory}
        position="SearchRecord"
        categories={categories}
      />

      <table style={{ margin: "0 auto", width: "100%" }}>
        <thead>
          <tr>
            <th>ID.</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Cnt</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {getValidRecords().map((record, index) => {
            return (
              <Record
                toDate={toDate}
                onUpdateRecord={onUpdateRecord}
                categories={categories}
                onDeleteRecord={onDeleteRecord}
                key={index}
                record={record}
                idx={index}
              />
            );
          })}
        </tbody>
      </table>
      <strong style={{ marginLeft: 700 }}>
        {" "}
        Average Price: {getValidAveragePrice()}
        {"  "}
      </strong>
      <br />
      <strong style={{ marginLeft: 700 }}>
        {" "}
        Average Count: {getValidAverageCnt()}{" "}
      </strong>
    </div>
  );
}

export default OverallHistory;
