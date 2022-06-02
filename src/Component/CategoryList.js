import React from "react";

function CategoryList(props) {
  const {
    categories,
    position,
    searchItemCategory,
    setSearchItemCategory,
    newItemCategory,
    setNewItemCategory,
    searchRecordCategory,
    setSearchRecordCategory,
    updateRecordCategory,
    setUpdateRecordCategory,
    searchTradeItemCategory,
    setSearchTradeItemCategory
  } = props;

  function getDefaultValue() {
    return position === "UpdateRecord" ? updateRecordCategory : "";
  }

  function getDefaultDisplay() {
    return position === "UpdateRecord" ? updateRecordCategory : "";
  }

  return (
    <div>
      <strong> Category </strong>
      <select
        className="custom-select"
        aria-label="Default select example"
        onChange={(e) => {
          const selectType = e.target.value;
          if (position === "SearchItem") setSearchItemCategory(selectType);
          if (position === "AddItem") setNewItemCategory(selectType);
          if (position === "SearchRecord") setSearchRecordCategory(selectType);
          if (position === "UpdateRecord") setUpdateRecordCategory(selectType);
          if (position === "SearchTradeItem")
            setSearchTradeItemCategory(selectType);
        }}
      >
        <option value={getDefaultValue()}>{getDefaultDisplay()}</option>
        {categories.map((type) => {
          return (
            <option value={type.name} key={type.id}>
              {type.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CategoryList;
