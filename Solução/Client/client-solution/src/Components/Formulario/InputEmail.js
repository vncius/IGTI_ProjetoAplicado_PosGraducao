import { TextInput } from 'react-materialize';

const InputEmail = ({ id, disable, classes, value, change }) => {
  const inputChange = (event) => {
    change(event.target.value);
  }

  return (
    <TextInput
      value={value}
      className={classes}
      disabled={disable}
      icon="email"
      id={id}
      label="E-mail"
      email
      validate
      onChange={inputChange}
      autoComplete='on'
    />
  );
}

export default InputEmail;