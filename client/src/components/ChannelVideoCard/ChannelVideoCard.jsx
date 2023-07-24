import "./ChannelVideoCard.scss";
import { Link, useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import api from "../../http";

const ChannelVideoCard = ({
  id,
  title,
  channelName,
  views,
  date,
  verticle = false,
  videoUrl,
}) => {
  const navigate = useNavigate();

  const editVideoHandler = (e) => {
    e.preventDefault();

    navigate(`/channel/videos/edit/${id}`);
  };

  const deleteVideoHandler = async (e) => {
    e.preventDefault();

    try {
      await api.delete(`/api/v1/videos/${id}`);
      toast.success("Successfully deleted the video");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Link
      to={`/${id}`}
      className={`channel-video-card ${verticle ? "verticle" : ""}`}
    >
      <div className="top">
        <video muted src={videoUrl} />
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

      <span className="edit-btns">
        <button className="edit-btn" onClick={editVideoHandler}>
          <FiEdit /> Edit
        </button>
        <button className="edit-btn" onClick={deleteVideoHandler}>
          <AiOutlineDelete /> Delete
        </button>
      </span>
    </Link>
  );
};

export default ChannelVideoCard;
