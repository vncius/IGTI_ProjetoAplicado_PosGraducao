import { TextInput } from 'react-materialize';

const InputPassword = ({ id, disable, classes, value, change }) => {
  const changeInput = (event) => {
    change(event.target.value);
  }

  return (
    <TextInput
      value={value}
      icon="lock"
      disabled={disable}
      id={id}
      label="Senha"
      password
      className={classes}
      onChange={changeInput}
      autoComplete='on'
    />
  );
};

export default InputPassword;