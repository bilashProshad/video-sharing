import "./ProfileMenu.scss";
import profile from "../../../assets/profile.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrop/Backdrop";

const ProfileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  function showMenuHander() {
    setShowMenu(!showMenu);
  }

  return (
    <div className="profile-menu">
      <button onClick={showMenuHander}>
        <img src={profile} alt="Profile" />
      </button>

      {showMenu && (
        <ul>
          <li>
            <Link to={`/profile`}>Profile</Link>
          </li>
          <li>
            <Link to={`/`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`/`}>Logout</Link>
          </li>
        </ul>
      )}

      {showMenu &&
        createPortal(
          <Backdrop onCloseBackdrop={showMenuHander} transparent={true} />,
          document.getElementById("overlays")
        )}
    </div>
  );
};

export default ProfileMenu;
