import "./Navbar.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import NavMenuButton from "../NavComponents/NavMenuButton/NavMenuButton";
import InputSearch from "../NavComponents/InputSearch/InputSearch";
import ProfileMenu from "../NavComponents/ProfileMenu/ProfileMenu";
import { useEffect, useState } from "react";
import ButtonNav from "../NavComponents/ButtonNav/ButtonNav";
import { HiOutlineUpload } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import InputSearchSM from "../NavComponents/InputSearchSM/InputSearchSM";

const Navbar = ({ onExpandSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logos">
        <NavMenuButton onClick={onExpandSidebar} />
        <Link to={"/"}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <InputSearch />
      <InputSearchSM
        showInput={showSearchInput}
        setShowInput={setShowSearchInput}
      />

      <div className="items">
        <ul className="lists">
          <li>
            <ButtonNav
              className="button-search"
              onClick={() => setShowSearchInput(!showSearchInput)}
            >
              <AiOutlineSearch /> <span>Search</span>
            </ButtonNav>
          </li>
          {user ? (
            <>
              <li>
                <ButtonNav
                  className="button-upload"
                  onClick={() => navigate("/upload")}
                >
                  <HiOutlineUpload /> <span>Upload</span>
                </ButtonNav>
              </li>
              <li>
                <ProfileMenu />
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonNav onClick={() => navigate("/login")}>
                  Sign in
                </ButtonNav>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
