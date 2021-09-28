const InputTextArea = ({ icon, label, disable, value, change, classes, type }) => {
  const inputChange = (event) => {
    change(event.target.value);
  }

  const id = label.toLowerCase().replaceAll(' ', '-');

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <textarea className="form-control" rows="2" id={id} onChange={inputChange} value={value} disabled={disable} ></textarea>
    </div>
  );
}

export default InputTextArea;