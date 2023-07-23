import ReactTimeAgo from "react-time-ago";
import "./Comment.scss";

const Comment = ({ name, comment, profileUrl, date = Date.now() }) => {
  return (
    <div className="comment">
      <div className="avatar">
        <img src={profileUrl} alt={name} />
      </div>
      <div className="body">
        <div className="top">
          <h4>{name}</h4>
          <small>
            <ReactTimeAgo date={new Date(date).getTime()} locale="en-US" />{" "}
          </small>
        </div>
        <p className="content">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
