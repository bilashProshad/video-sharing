import { useState } from "react";
import "./InputSearch.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const InputSearch = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (query === "") return;

    navigate(`/search?q=${query}`);
  };

  return (
    <form className={`input-search`} onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default InputSearch;
