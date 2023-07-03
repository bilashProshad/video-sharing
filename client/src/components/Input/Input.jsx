import "./Input.scss";

const Input = ({ type = "text", label, ...rest }) => {
  let id = "input" + Date.now() + Math.random() * 1000;

  return (
    <div className="input">
      <input id={id} type={type} {...rest} required />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
