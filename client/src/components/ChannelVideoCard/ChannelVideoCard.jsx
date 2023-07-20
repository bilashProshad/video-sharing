import "./ChannelVideoCard.scss";
import { Link, useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { FiEdit } from "react-icons/fi";

const ChannelVideoCard = ({
  id,
  title,
  thumbnail,
  channelName,
  views,
  date,
  verticle = false,
}) => {
  const navigate = useNavigate();

  const editVideoHandler = (e) => {
    e.preventDefault();

    navigate(`/channel/videos/edit/${id}`);
  };

  return (
    <Link
      to={`/${id}`}
      className={`channel-video-card ${verticle ? "verticle" : ""}`}
    >
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

      <button className="edit-btn" onClick={editVideoHandler}>
        <FiEdit /> Edit
      </button>
    </Link>
  );
};

export default ChannelVideoCard;
