import "./Navbar.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import NavMenuButton from "../NavComponents/NavMenuButton/NavMenuButton";
import InputSearch from "../NavComponents/InputSearch/InputSearch";
import ButtonUpload from "../NavComponents/ButtonUpload/ButtonUpload";
import ProfileMenu from "../NavComponents/ProfileMenu/ProfileMenu";
import ButtonSearch from "../NavComponents/ButtonSearch/ButtonSearch";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logos">
        <NavMenuButton />
        <Link to={"/"}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <InputSearch />

      <div className="items">
        <ul className="lists">
          <li>
            <ButtonSearch />
          </li>
          <li>
            <ButtonUpload />
          </li>
          <li>
            <ProfileMenu />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
