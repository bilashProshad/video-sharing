import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Error 404</h2>
      <p>Page not found</p>
      <Link to={"/"}>Back to home</Link>
    </div>
  );
};

export default NotFound;
