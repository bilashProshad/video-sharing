import "./ProfileMenu.scss";
import profile from "../../../assets/profile.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrop/Backdrop";
import { useAuthContext } from "../../../contexts/AuthContext";
import {
  CLEAR_ERROR,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../../../contexts/Actions/AuthActions";
import api from "../../../http";
import toast from "react-hot-toast";

const ProfileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { dispatch, error } = useAuthContext();

  function showMenuHander() {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error, dispatch]);

  const logoutHandler = async () => {
    try {
      dispatch({ type: LOGOUT_REQUEST });
      await api.get(`/api/v1/user/logout`);
      toast.success("Successfully Logged Out.");
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };

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
            <Link to={`/channel`}>Channel</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
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
