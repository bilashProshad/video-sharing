import "./ButtonUpload.scss";
import { HiOutlineUpload } from "react-icons/hi";

const ButtonUpload = ({ ...rest }) => {
  return (
    <button className="button-upload" {...rest}>
      <HiOutlineUpload /> <span>Upload</span>
    </button>
  );
};

export default ButtonUpload;
