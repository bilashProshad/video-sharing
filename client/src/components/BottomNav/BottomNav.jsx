import { Link } from "react-router-dom";
import "../Sidebar/Sidebar.scss";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlineSubscriptions, MdOutlineWatchLater } from "react-icons/md";

const BottomNav = () => {
  return (
    <aside className="sidebar-mb sidebar">
      <ul>
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
    </aside>
  );
};

export default BottomNav;
