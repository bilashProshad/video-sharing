import { Link } from "react-router-dom";
import "./Sidebar.scss";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlineSubscriptions, MdOutlineWatchLater } from "react-icons/md";
import avatar from "../../assets/profile.png";

const Sidebar = ({ expand = true }) => {
  return (
    <aside className="sidebar">
      <ul className={expand ? "" : "hide-text"}>
        <li>
          <Link to={`/`} className="active">
            <AiOutlineHome /> <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <BiTrendingUp /> <span>Trending</span>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <AiOutlineCompass /> <span>Discover</span>
          </Link>
        </li>

        <li>
          <Link to={`/`}>
            <MdOutlineSubscriptions /> <span>Subscriptions</span>
          </Link>
        </li>
      </ul>

      <div className="hr">
        <div />
      </div>

      <ul className={expand ? "" : "hide-text"}>
        <li>
          <Link to={`/`}>
            <MdOutlineWatchLater /> <span>Watch Later</span>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <AiOutlineHeart /> <span>Liked Videos</span>
          </Link>
        </li>
      </ul>

      <div className="hr">
        <div />
      </div>

      <ul className={`bottom ${expand ? "" : "hide"}`}>
        <li>
          <span className="list-header">Subscriptions</span>
        </li>
        <li>
          <Link to={`/`}>
            <img src={avatar} alt="channel" /> <span>Tech Smash</span>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <img src={avatar} alt="channel" /> <span>Tech Smash</span>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <img src={avatar} alt="channel" /> <span>Tech Smash</span>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <img src={avatar} alt="channel" /> <span>Tech Smash</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
