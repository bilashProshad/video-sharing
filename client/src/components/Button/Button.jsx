import "./Button.scss";

const Button = ({
  children,
  type = "button",
  onClick,
  className,
  variant = "filled",
  color = "primary",
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={"button" + " " + className + " " + variant + " " + color}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
