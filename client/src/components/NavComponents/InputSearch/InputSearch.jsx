import "./InputSearch.scss";
import { AiOutlineSearch } from "react-icons/ai";

const InputSearch = () => {
  return (
    <form className={`input-search`}>
      <AiOutlineSearch />
      <input type="text" placeholder="Search" />
    </form>
  );
};

export default InputSearch;
