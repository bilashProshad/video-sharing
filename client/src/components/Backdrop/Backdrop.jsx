import "./Backdrop.scss";

const Backdrop = ({ onCloseBackdrop, transparent = false, ...rest }) => {
  return (
    <div
      className={`backdrop ${transparent ? "transparent" : ""}`}
      onClick={onCloseBackdrop}
      {...rest}
    />
  );
};

export default Backdrop;
