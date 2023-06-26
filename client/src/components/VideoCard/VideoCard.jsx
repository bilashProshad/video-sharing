import "./VideoCard.scss";
import { Link } from "react-router-dom";

const VideoCard = ({ title, thumbnail, channelName, views, date }) => {
  return (
    <Link to={`/sv12jlklsdf239843`} className="video-card">
      <div className="top">
        <img src={thumbnail} alt={"thumbnail"} />
      </div>
      <div className="bottom">
        <h3 className="title">{title}</h3>
        <div className="body">
          <Link to={`/`}>{channelName}</Link>
          <p>
            <span>{views}</span> - <span>{date}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
