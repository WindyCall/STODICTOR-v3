import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryList from "./CategoryList";
import TradeItem from "./TradeItem";

function ItemSelection(props) {
  const {
    tradeType,
    onDeleteTradeItem,
    categories,
    items,
    setTradeItemId,
    setTradeItemName,
    setTradeItemCategory
  } = props;

  // put item list here with search function

  const [searchTradeItemName, setSearchTradeItemName] = useState("");
  const [searchTradeItemId, setSearchTradeItemId] = useState("");
  const [searchTradeItemCategory, setSearchTradeItemCategory] = useState("");

  // need to add type later
  function getValidItems() {
    return items.filter((item) => {
      return (
        (searchTradeItemCategory === "" ||
          item.category === searchTradeItemCategory) &&
        item.Id.includes(searchTradeItemId) &&
        item.name.toLowerCase().includes(searchTradeItemName.toLowerCase())
      );
    });
  }

  return (
    <div className="MainpageBox">
      <Link to="/trade">
        <strong> Back </strong>
      </Link>
      <h1> ItemSelection </h1>

      <form>
        <h3> Search your item here: </h3>
        <strong> ID </strong>

        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchTradeItemId}
          onChange={(e) => setSearchTradeItemId(e.target.value)}
          placeholder="Input ID here"
        />
        <strong> Name </strong>
        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchTradeItemName}
          onChange={(e) => setSearchTradeItemName(e.target.value)}
          placeholder="Input name here"
        />
      </form>

      <CategoryList
        searchTradeItemCategory={searchTradeItemCategory}
        setSearchTradeItemCategory={setSearchTradeItemCategory}
        position="SearchTradeItem"
        categories={categories}
      />

      <table style={{ margin: "0 auto", width: "100%" }}>
        <thead>
          <tr>
            <th>ID.</th>
            <th>Category</th>
            <th>Name</th>
            <th>Storage</th>
          </tr>
        </thead>
        <tbody>
          {getValidItems().map((item, index) => {
            return (
              <TradeItem
                setTradeItemId={setTradeItemId}
                setTradeItemName={setTradeItemName}
                setTradeItemCategory={setTradeItemCategory}
                tradeType={tradeType}
                idx={index}
                key={index}
                item={item}
                onDeleteTradeItem={onDeleteTradeItem}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ItemSelection;
