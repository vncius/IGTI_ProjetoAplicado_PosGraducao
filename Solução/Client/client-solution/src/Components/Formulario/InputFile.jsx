const InputFile = ({ icon, label, disable, value, change, classes, type }) => {
  const inputChange = (event) => {
    change(event.target.files);
  }

  const id = label.toLowerCase().replaceAll(' ', '-');

  return (
    <div className="custom-file">
      <input type="file" className="custom-file-input" id={id} multiple onChange={inputChange} />
      <label className="custom-file-label" htmlFor={id} value={value}>Imagem</label>
    </div>
  );
}

export default InputFile;