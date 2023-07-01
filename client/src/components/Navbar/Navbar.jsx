import "./Navbar.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import NavMenuButton from "../NavComponents/NavMenuButton/NavMenuButton";
import InputSearch from "../NavComponents/InputSearch/InputSearch";
import ButtonUpload from "../NavComponents/ButtonUpload/ButtonUpload";
import ProfileMenu from "../NavComponents/ProfileMenu/ProfileMenu";
import ButtonSearch from "../NavComponents/ButtonSearch/ButtonSearch";
import { useEffect, useState } from "react";
import ButtonNav from "../NavComponents/ButtonNav/ButtonNav";
import { HiOutlineUpload } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = ({ onExpandSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const auth = true;

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

      <div className="items">
        <ul className="lists">
          <li>
            <ButtonNav className="button-search">
              <AiOutlineSearch /> <span>Search</span>
            </ButtonNav>
          </li>
          {auth ? (
            <>
              <li>
                <ButtonNav className="button-upload">
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
                <ButtonNav>Sign in</ButtonNav>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
