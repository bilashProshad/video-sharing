import "./ButtonSearch.scss";
import { AiOutlineSearch } from "react-icons/ai";

const ButtonSearch = () => {
  return (
    <button className="button-search">
      <AiOutlineSearch /> <span>Search</span>
    </button>
  );
};

export default ButtonSearch;
