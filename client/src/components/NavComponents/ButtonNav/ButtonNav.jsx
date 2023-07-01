import "./ButtonNav.scss";

const ButtonNav = ({ children, className, ...rest }) => {
  return (
    <button className={`button-nav ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default ButtonNav;
