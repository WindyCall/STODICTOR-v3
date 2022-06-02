import "../styles.css";
import OverallHistory from "./OverallHistory";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Stock from "./Stock";
import Predict from "./Predict";
import Finance from "./Finance";
import Trade from "./Trade";
import Settings from "./Settings";
import Support from "./Support";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StockAdder from "./StockAdder";
import React, { useState } from "react";
import About from "./About";
import ItemSelection from "./ItemSelection";
import RecordAdder from "./RecordAdder";

function DashboardRouter(props) {
  const {
    items,
    onAddNewItem,
    onDeleteItem,
    onAddNewRecord,
    categories,
    onDeleteRecord,
    records,
    onUpdateRecord,
    newItemCategory,
    setNewItemCategory
  } = props;

  const [tradeType, setTradeType] = useState(false);
  // false => sale, true => purcahse

  const [tradeItemId, setTradeItemId] = useState("");
  const [tradeItemName, setTradeItemName] = useState("");
  const [tradeItemCategory, setTradeItemCategory] = useState("");

  return (
    <Router>
      <div>
        <Sidebar
          newItemCategory={newItemCategory}
          setNewItemCategory={setNewItemCategory}
        />
        <Routes>
          <Route
            path="/"
            exact
            element={<Dashboard categories={categories} />}
          />
          <Route
            path="/history"
            element={
              <OverallHistory
                onUpdateRecord={onUpdateRecord}
                categories={categories}
                records={records}
                onDeleteRecord={onDeleteRecord}
              />
            }
          />
          <Route
            exact
            path="/trade"
            element={<Trade setTradeType={setTradeType} />}
          />
          <Route
            exact
            path="/trade/itemselection"
            element={
              <ItemSelection
                setTradeItemId={setTradeItemId}
                setTradeItemName={setTradeItemName}
                setTradeItemCategory={setTradeItemCategory}
                categories={categories}
                items={items}
                tradeType={tradeType}
                setTradeType={setTradeType}
              />
            }
          />
          <Route
            path="/trade/itemselection/recordadder"
            element={
              <RecordAdder
                tradeItemId={tradeItemId}
                tradeItemName={tradeItemName}
                tradeItemCategory={tradeItemCategory}
                onAddNewRecord={onAddNewRecord}
                tradeType={tradeType}
              />
            }
          />
          <Route path="/predict" element={<Predict />} />
          <Route
            exact
            path="/stock"
            element={
              <Stock
                categories={categories}
                onDeleteItem={onDeleteItem}
                items={items}
              />
            }
          />
          <Route
            path="/stock/stockadder"
            element={
              <StockAdder
                newItemCategory={newItemCategory}
                setNewItemCategory={setNewItemCategory}
                categories={categories}
                onAddNewItem={onAddNewItem}
              />
            }
          />
          <Route path="/finance" element={<Finance records={records} />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default DashboardRouter;
