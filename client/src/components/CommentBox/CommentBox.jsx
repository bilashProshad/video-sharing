import "./CommentBox.scss";

const CommentBox = ({ profileImageUrl }) => {
  return (
    <div className="comment-box">
      <div className="image">
        <img src={profileImageUrl} alt="user profile pic" />
      </div>
      <form>
        <input type="text" placeholder="Add a comment" />
      </form>
    </div>
  );
};

export default CommentBox;
