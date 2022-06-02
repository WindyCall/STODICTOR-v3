function Item(props) {
  const { item, onDeleteItem, idx } = props;

  return (
    <tr key={item.name}>
      <td>{item.Id}</td>
      <td>{item.category}</td>
      <td>{item.name}</td>
      <td>{item.storage}</td>
      <button style={{ margin: "0 1rem" }} onClick={() => onDeleteItem(idx)}>
        Delete
      </button>
    </tr>
  );
}

export default Item;
