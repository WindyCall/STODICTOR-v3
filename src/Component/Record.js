import { useState } from "react";
import Modal from "react-modal";
import CategoryList from "./CategoryList";
import DatePicker from "react-datepicker";
import { AiTwotoneDatabase } from "react-icons/ai";

function Record(props) {
  const {
    record,
    idx,
    onDeleteRecord,
    categories,
    onUpdateRecord,
    toDate
  } = props;

  const [updateRecordId, setUpdateRecordId] = useState(record.Id);
  const [updateRecordName, setUpdateRecordName] = useState(record.name);
  const [updateRecordCategory, setUpdateRecordCategory] = useState(
    record.category
  );
  const [updateRecordDate, setUpdateRecordDate] = useState("");
  const [updateRecordPrice, setUpdateRecordPrice] = useState(record.price);
  const [updateRecordCnt, setUpdateRecordCnt] = useState(record.cnt);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setUpdateRecordId(record.Id);
    setUpdateRecordName(record.name);
    setUpdateRecordCategory(record.category);
    setUpdateRecordDate("");
    setUpdateRecordPrice(record.price);
    setUpdateRecordCnt(record.cnt);
    setIsModalOpen(false);
  }

  function getSubmitDate() {
    if (updateRecordDate === "") return record.date;
    else return toDate(updateRecordDate.toString());
  }

  function getCntDisplay() {
    if (record.cnt > 0) return "+" + record.cnt;
    else return "- " + -record.cnt;
  }

  return (
    <tr>
      <td>{record.Id}</td>
      <td>{record.category}</td>
      <td>{record.name}</td>
      <td>{record.price}</td>
      <td>{getCntDisplay()}</td>
      <td>{record.date}</td>
      <button onClick={openModal} className="btn btn-primary btn-sm m-2">
        Update
      </button>
      <button onClick={() => onDeleteRecord(idx)} style={{ margin: "0 1rem" }}>
        {" "}
        Delete{" "}
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "grey"
          },
          content: {
            top: "100px",
            left: "300px",
            right: "300px",
            bottom: "100px",
            padding: "20px",
            borderRadius: "20px"
          }
        }}
      >
        <h2>Update Record</h2>
        <strong>ID</strong>
        <br />
        <input
          value={updateRecordId}
          onChange={(e) => setUpdateRecordId(e.target.value)}
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
        />
        <br />
        <br />
        <strong>Name</strong>
        <br />
        <input
          value={updateRecordName}
          onChange={(e) => setUpdateRecordName(e.target.value)}
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
        />
        <br />
        <br />
        <CategoryList
          updateRecordCategory={updateRecordCategory}
          setUpdateRecordCategory={setUpdateRecordCategory}
          categories={categories}
          position="UpdateRecord"
        />
        <br />
        <div>
          <strong>Date</strong>
          <br />
          <DatePicker
            placeholderText={record.date}
            selected={updateRecordDate}
            onChange={(date) => setUpdateRecordDate(date)}
          />
          <br />
          <br />
          <strong>Price</strong>
          <br />
          <input
            value={updateRecordPrice}
            onChange={(e) => setUpdateRecordPrice(e.target.value)}
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
          <br />
          <br />
          <strong>Count</strong>
          <br />
          <input
            value={updateRecordCnt}
            onChange={(e) => setUpdateRecordCnt(e.target.value)}
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              onUpdateRecord(
                idx,
                updateRecordId,
                updateRecordName,
                updateRecordCategory,
                getSubmitDate(),
                updateRecordPrice,
                updateRecordCnt
              );
              setIsModalOpen(false);
            }}
          >
            Confirm
          </button>{" "}
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </tr>
  );
}

export default Record;
