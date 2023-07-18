import "./Input.scss";

const Input = ({
  type = "text",
  label,
  width = "initial",
  required = true,
  ...rest
}) => {
  let id = "input" + Date.now() + Math.random() * 1000;

  return (
    <div className="input" style={{ width: width }}>
      <input id={id} type={type} {...rest} required={required} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
