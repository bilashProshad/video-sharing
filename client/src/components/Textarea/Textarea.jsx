import "./Textarea.scss";

const Textarea = ({ label, rows = 5, ...rest }) => {
  let id = "input" + Date.now() + Math.random() * 1000;

  return (
    <div className="textarea">
      <textarea id={id} {...rest} rows={rows} required />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Textarea;
