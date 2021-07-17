const InputPassword = ({ id, disable, classes, value, change }) => {
  const changeInput = (event) => {
    change(event.target.value);
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>Senha</label>
      <input type="password" onChange={changeInput} value={value} disabled={disable} className="form-control" id={id} />
    </div>

    // <TextInput
    //   value={value}
    //   icon="lock"
    //   disabled={disable}
    //   id={id}
    //   label="Senha"
    //   password
    //   className={classes}
    //   onChange={changeInput}
    //   autoComplete='on'
    // />
  );
};

export default InputPassword;