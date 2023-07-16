import "./VideoCard.scss";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const VideoCard = ({
  id,
  title,
  thumbnail,
  channelName,
  views,
  date,
  verticle = false,
}) => {
  return (
    <Link to={`/${id}`} className={`video-card ${verticle ? "verticle" : ""}`}>
      <div className="top">
        <img src={thumbnail} alt={"thumbnail"} />
      </div>
      <div className="bottom">
        <h3 className="title">{title}</h3>
        <div className="body">
          <p>{channelName}</p>
          <p>
            <span>{views}</span> -{" "}
            <span>
              <ReactTimeAgo date={new Date(date).getTime()} locale="en-US" />
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
