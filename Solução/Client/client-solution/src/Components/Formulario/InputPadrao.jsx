const InputPadrao = ({ icon, label, disable, value, change, classes, type, id }) => {
  const inputChange = (event) => {
    change(event.target.value);
  }

  const ident = id ? id : label.toLowerCase().replaceAll(' ', '-');

  return (
    <div className="form-group">
      {label !== "" ? <label htmlFor={ident}>{label}</label> : ""}
      <input type={type ? type : 'text'} className="form-control" id={ident} onChange={inputChange} value={value} disabled={disable} />
    </div>
  );
}

export default InputPadrao;