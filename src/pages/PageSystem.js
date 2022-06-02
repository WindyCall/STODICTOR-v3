import "../styles.css";
import DashboardRouter from "../Component/DashboardRouter";
import AccountRouter from "../Component/AccountRouter";
import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, useAuth } from "../hooks/useAuth";

function PageSystem(props) {
  const { user } = useAuth();
  const { pageType } = props;

  function setRecordsState(newRecords) {
    setRecords(newRecords);
    setDoc(doc(db, "records", user?.uid), { records: newRecords });
  }

  useEffect(() => {
    async function fetchData() {
      const docSnapshot = await getDoc(doc(db, "records", user?.uid));
      if (docSnapshot.exists()) {
        setRecords(docSnapshot.data().records);
      } else {
        setRecords([]);
      }
    }
    fetchData();
  }, [user.uid]);

  const [items, setItems] = useState([
    {
      Id: "02020030020",
      category: "Fruit",
      name: "banana",
      storage: 0
    },
    {
      Id: "02020030021",
      category: "Fruit",
      name: "apple",
      storage: 1
    },
    {
      Id: "02020030022",
      category: "Necessities",
      name: "box",
      storage: 2
    },
    {
      Id: "02020030023",
      category: "Food",
      name: "icecream",
      storage: 3
    }
  ]);

  const [categories, setCategories] = useState([
    {
      Id: "1",
      name: "Fruit"
    },
    {
      Id: "2",
      name: "Necessities"
    },
    {
      Id: "3",
      name: "Drinks"
    },
    {
      id: "4",
      name: "Foods"
    },
    {
      Id: "5",
      name: "Others"
    }
  ]);

  const [records, setRecords] = useState([
    {
      Id: "02020030020",
      category: "Fruit",
      name: "banana",
      price: 999,
      cnt: -1,
      date: "05/25/2022"
    },
    {
      Id: "02020030021",
      category: "Fruit",
      name: "apple",
      price: 123,
      cnt: -3,
      date: "05/22/2022"
    },
    {
      Id: "02020030022",
      category: "Necessities",
      name: "box",
      price: 100,
      cnt: -3,
      date: "05/24/2022"
    },
    {
      Id: "02020030020",
      category: "Fruit",
      name: "banana",
      price: 123,
      cnt: -2,
      date: "05/17/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/23/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "12/25/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 12,
      cnt: -10,
      date: "05/26/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/23/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/23/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/22/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/22/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -2,
      date: "05/22/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/21/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -3,
      date: "05/21/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/20/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/20/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/20/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -2,
      date: "05/19/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/18/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/18/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "05/18/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 200,
      cnt: -1,
      date: "04/25/2022"
    },
    {
      Id: "02020030023",
      category: "Foods",
      name: "icecream",
      price: 123,
      cnt: -1,
      date: "04/24/2022"
    }
  ]);

  function addItemsByHistory() {
    items.forEach((item) => {
      const num = records
        .filter((record) => record.name === item.name)
        .map((record) => record.cnt)
        .reduce((x, y) => x + y, 0);
      item.storage = num;
    });
  }

  addItemsByHistory();

  const [newItemCategory, setNewItemCategory] = useState("");

  function handleAddNewItem(name, id, category) {
    if (name === "" || id === "" || category === "") {
      alert("Error: Empty input, please input correctly.");
      return;
    }

    if (items.filter((w) => w.name === name || w.Id === id).length > 0) {
      alert("this item has already existed\n\nplease add another one");
      return;
    }

    const newItems = [
      ...items,
      {
        Id: id,
        category: category,
        name: name,
        storage: 0
      }
    ];
    setItems(newItems);
    setNewItemCategory("");
    alert("The item " + name + " has been added successfully");
  }

  function handelDeleteItem(idx) {
    const newItems = [...items.slice(0, idx), ...items.slice(idx + 1)];
    setItems(newItems);
  }

  function handleDeleteRecord(idx) {
    const newRecords = [...records.slice(0, idx), ...records.slice(idx + 1)];
    setRecordsState(newRecords);
  }

  function handleUpdateRecord(idx, id, name, category, date, price, cnt) {
    const newRecord = {
      Id: id,
      category: category,
      name: name,
      price: price,
      cnt: cnt,
      date: date
    };
    const newRecords = [
      ...records.slice(0, idx),
      newRecord,
      ...records.slice(idx + 1)
    ];
    setRecordsState(newRecords);
  }

  function handleAddNewRecord(tradeType, id, name, category, date, price, cnt) {
    const newCnt = tradeType ? 1 * cnt : -cnt;
    // console.log(id, name, category, date, price, newCnt);
    // console.log(records)
    const newRecord = {
      Id: id,
      category: category,
      name: name,
      price: price * 1,
      cnt: newCnt,
      date: date
    };
    const newRecords = [...records, newRecord];
    setRecordsState(newRecords);
    addItemsByHistory();
    alert("successfully added");
  }

  return (
    <>
      {pageType === "Mainpage" ? (
        <DashboardRouter
          onAddNewRecord={handleAddNewRecord}
          onUpdateRecord={handleUpdateRecord}
          onDeleteRecord={handleDeleteRecord}
          onDeleteItem={handelDeleteItem}
          onAddNewItem={handleAddNewItem}
          items={items}
          categories={categories}
          records={records}
          newItemCategory={newItemCategory}
          setNewItemCategory={setNewItemCategory}
        />
      ) : (
        <AccountRouter />
      )}
    </>
  );
}

export default PageSystem;
