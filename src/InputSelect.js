function InputSelect({ name, id, labelText, selectValues }) {
  const selectOptions = selectValues.map(item => {
    return <option value={item.value}>{item.text}</option>;
  });

  return (
    <>
      <label htmlFor={id}>{labelText}</label>

      <select name={name} id={id}>
        {selectOptions}
      </select>
    </>
  );
}

export default InputSelect;
