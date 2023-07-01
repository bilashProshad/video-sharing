import "./Comment.scss";
import profile from "../../assets/profile.png";

const Comment = () => {
  return (
    <div className="comment">
      <div className="avatar">
        <img src={profile} alt="Profile" />
      </div>
      <div className="body">
        <div className="top">
          <h4>Bilash Prosad</h4>
          <small>1 hour ago</small>
        </div>
        <p className="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ex
          aliquam vel nobis temporibus, nulla voluptatibus quam sit quidem sed.
          Distinctio, maiores.
        </p>
      </div>
    </div>
  );
};

export default Comment;
