import "./InputUpload.scss";
import { FiUpload } from "react-icons/fi";

const InputUpload = ({
  label = "Choose Files",
  name,
  accept,
  onChange,
  ...rest
}) => {
  const id = "upload" + Date.now + Math.random();
  return (
    <div className="input-upload">
      <label htmlFor={id}>
        <FiUpload /> {label}
      </label>
      <input
        type="file"
        id={id}
        multiple
        name={name}
        accept={accept}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default InputUpload;
