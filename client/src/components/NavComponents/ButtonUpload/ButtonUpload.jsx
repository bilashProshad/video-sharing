import "./ButtonUpload.scss";
import { AiOutlineCloudUpload } from "react-icons/ai";

const ButtonUpload = ({ ...rest }) => {
  return (
    <button className="button-upload" {...rest}>
      <AiOutlineCloudUpload /> <span>Upload</span>
    </button>
  );
};

export default ButtonUpload;
