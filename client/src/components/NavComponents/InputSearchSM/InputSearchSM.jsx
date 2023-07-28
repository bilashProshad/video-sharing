import { useState } from "react";
import "./InputSearchSM.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrop/Backdrop";

const InputSearchSM = ({ showInput, setShowInput }) => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function showMenuHander() {
    setShowInput(!showInput);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (query === "") return;

    navigate(`/search?q=${query}`);
  };

  return (
    <>
      <form
        className={`input-search-sm ${showInput ? "show" : ""}`}
        onSubmit={submitHandler}
      >
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

      {showInput &&
        createPortal(
          <Backdrop onCloseBackdrop={showMenuHander} />,
          document.getElementById("overlays")
        )}
    </>
  );
};

export default InputSearchSM;
