import "./ProfileMenu.scss";
import profile from "../../../assets/profile.png";

const ProfileMenu = () => {
  return (
    <div className="profile-menu">
      <button>
        <img src={profile} alt="Profile" />
      </button>
    </div>
  );
};

export default ProfileMenu;
