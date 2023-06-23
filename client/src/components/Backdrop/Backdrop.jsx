import "./Backdrop.scss";

const Backdrop = ({ onCloseBackdrop, transparent = false }) => {
  return (
    <div
      className={`backdrop ${transparent ? "transparent" : ""}`}
      onClick={onCloseBackdrop}
    />
  );
};

export default Backdrop;
