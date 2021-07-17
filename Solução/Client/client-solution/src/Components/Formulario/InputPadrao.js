const InputPadrao = ({ icon, label, disable, value, change, classes, type }) => {
  const inputChange = (event) => {
    change(event.target.value);
  }

  const id = label.toLowerCase().replaceAll(' ', '-');

  return (
    <div className="form-group">
      {label !== "" ? <label htmlFor={id}>{label}</label> : ""}
      <input type={type ? type : 'text'} className="form-control" id={id} onChange={inputChange} value={value} disabled={disable} />
    </div>

    // <TextInput
    //   value={value}
    //   disabled={disable}
    //   icon={icon}
    //   id={label.toLowerCase().replaceAll(' ', '-')}
    //   label={label}
    //   error='Wrong Email sir'
    //   onChange={inputChange}
    //   type={type ? type : 'text'}
    //   autoComplete='on'
    // />
  );
}

export default InputPadrao;