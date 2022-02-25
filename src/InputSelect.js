function InputSelect({ name, id, labelText, selectOptions, onChange }) {
  const options = () => {
    if (!selectOptions) {
      return null;
    }
    return selectOptions.map((item, i) => {
      return (
        <option key={i} value={item.value}>
          {item.text}
        </option>
      );
    });
  };

  return (
    <>
      <label htmlFor={id}>{labelText}</label>

      <select name={name} id={id} onChange={onChange}>
        <option value="">-- --</option>
        {options()}
      </select>
    </>
  );
}

export default InputSelect;
