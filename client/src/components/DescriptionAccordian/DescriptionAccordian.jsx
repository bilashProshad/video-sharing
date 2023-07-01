import { useState } from "react";
import "./DescriptionAccordian.scss";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const DescriptionAccordian = ({ description }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`description-accordian ${show ? "show" : ""}`}
      onClick={() => setShow(!show)}
    >
      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} description <MdOutlineArrowDropDownCircle />
      </button>
      <p>{description}</p>
    </div>
  );
};

export default DescriptionAccordian;
