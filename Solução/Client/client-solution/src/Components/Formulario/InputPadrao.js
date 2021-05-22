import { TextInput } from 'react-materialize';

const InputPadrao = ({ icon, label, disable, value, change, classes, type }) => {
  const inputChange = (event) => {
    change(event.target.value);
  }

  return (
    <TextInput
      value={value}
      disabled={disable}
      icon={icon}
      id={label.toLowerCase().replaceAll(' ', '-')}
      label={label}
      error='Wrong Email sir'
      onChange={inputChange}
      type={type ? type : 'text'}
      autoComplete='on'
    />
  );
}

export default InputPadrao;