import "./ButtonNav.scss";

const ButtonNav = ({ children, className, onClick, ...rest }) => {
  return (
    <button onClick={onClick} className={`button-nav ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default ButtonNav;
