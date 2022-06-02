import { useState } from "react";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

//For barchart:
import {
  MainContainer,
  Container,
  BarChartContainer,
  Number,
  BlackLine,
  MakeBar
} from "./ChartstylesWithSmallXnum";

import {
  MainContainerBig,
  ContainerBig,
  BarChartContainerBig,
  NumberBig,
  BlackLineBig,
  MakeBarBig
} from "./ChartstylesWithBigXnum";

function Finance(props) {
  const { records } = props;

  const [displayLength, setDisplayLength] = useState("SevenDays");

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

  // date is a string
  function comparedate(a, b) {
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

  function getRecentSevenDaysRevenue() {
    var endDate = new Date();
    var beginDate = new Date(endDate);
    beginDate.setDate(beginDate.getDate() - 7);

    let begin = toDate(beginDate.toString());
    let end = toDate(endDate.toString());

    const days = [];

    for (let i = 0; i < 7; i++) {
      var nowDate = new Date(endDate);
      nowDate.setDate(endDate.getDate() - i);
      let now = toDate(nowDate.toString());
      days[6 - i] = now;
    }

    const revenue = days.map((day) => {
      return records
        .filter((record) => record.date === day && record.cnt < 0)
        .map((record) => -record.cnt * record.price)
        .reduce((x, y) => x + y, 0);
    });

    const maxx = revenue.reduce((x, y) => (x > y ? x : y));

    revenue.map((x) => x / maxx);

    return revenue;
  }

  function getRecentThirtyDaysRevenue() {
    var endDate = new Date();
    var beginDate = new Date(endDate);
    beginDate.setDate(beginDate.getDate() - 30);

    let begin = toDate(beginDate.toString());
    let end = toDate(endDate.toString());

    const days = [];

    for (let i = 0; i < 30; i++) {
      var nowDate = new Date(endDate);
      nowDate.setDate(endDate.getDate() - i);
      let now = toDate(nowDate.toString());
      days[29 - i] = now;
    }

    const revenue = days.map((day) => {
      return records
        .filter((record) => record.date === day && record.cnt < 0)
        .map((record) => -record.cnt * record.price)
        .reduce((x, y) => x + y, 0);
    });

    const maxx = revenue.reduce((x, y) => (x > y ? x : y));

    revenue.map((x) => x / maxx);

    return revenue;
  }

  function getBarChartWithSevenDays() {
    return (
      <Container>
        <MainContainer>
          {getRecentSevenDaysRevenue().map((x, i) => {
            return (
              <BarChartContainer key={i}>
                <Number color={"blue"}>${x}</Number>

                <MakeBar height={x / 6} colors={["black", "black"]} />
              </BarChartContainer>
            );
          })}
        </MainContainer>
        <BlackLine />
      </Container>
    );
  }

  function getBarChartWithOneMonth() {
    return (
      <ContainerBig className="BarChartBigBox">
        <MainContainerBig>
          {getRecentThirtyDaysRevenue().map((x, i) => {
            return (
              <BarChartContainerBig key={i}>
                <NumberBig color={"blue"}>${x}</NumberBig>

                <MakeBarBig height={x / 6} colors={["black", "black"]} />
              </BarChartContainerBig>
            );
          })}
        </MainContainerBig>
        <BlackLineBig />
      </ContainerBig>
    );
  }

  return (
    <>
      <div className="MainpageBox">
        <h1> Finance </h1>
        <h4> Revenue </h4>
        <Stack spacing={2} direction="row">
          <Button
            onClick={() => setDisplayLength("SevenDays")}
            variant="contained"
          >
            7 days
          </Button>
          <Button
            onClick={() => setDisplayLength("OneMonth")}
            variant="contained"
          >
            1 month
          </Button>
        </Stack>
        {displayLength === "SevenDays"
          ? getBarChartWithSevenDays()
          : getBarChartWithOneMonth()}
      </div>
    </>
  );
}

export default Finance;
