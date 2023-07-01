import "./CommentBox.scss";
import profile from "../../assets/profile.png";

const CommentBox = () => {
  return (
    <div className="comment-box">
      <div className="image">
        <img src={profile} alt="user profile pic" />
      </div>
      <form>
        <input type="text" placeholder="Add a comment" />
      </form>
    </div>
  );
};

export default CommentBox;
