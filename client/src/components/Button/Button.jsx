import "./Button.scss";
import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
  children,
  type = "button",
  onClick,
  className,
  variant = "filled",
  color = "primary",
  width = "",
  loading = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className} ${variant} ${color} ${width} ${
        loading ? "" : ""
      }`}
      {...rest}
      disabled={loading}
    >
      {loading ? <BiLoaderAlt className="loader" /> : children}
    </button>
  );
};

export default Button;
