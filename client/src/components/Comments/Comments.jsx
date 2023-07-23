import Comment from "../Comment/Comment";
import "./Comments.scss";

const Comments = ({ comments = [] }) => {
  return (
    <div className="comments">
      {comments.length > 0 &&
        comments.map((comment) => (
          <Comment
            key={comment._id}
            name={comment?.author?.name}
            profileUrl={comment?.author?.avatar?.url}
            comment={comment?.comment}
            date={comment?.createdAt}
          />
        ))}
    </div>
  );
};

export default Comments;
