import { useEffect, useRef } from "react";
import "./CommentBox.scss";
import Button from "../Button/Button";

const CommentBox = ({
  profileImageUrl,
  onSubmit,
  value = "",
  setValue,
  loading = false,
}) => {
  const textAreaRef = useRef();

  const cancelHandler = () => {
    setValue("");
  };

  useEffect(() => {
    textAreaRef.current.addEventListener("keyup", (e) => {
      textAreaRef.current.style.height = `auto`;
      let scHeight = e.target.scrollHeight;
      textAreaRef.current.style.height = `${scHeight}px`;
    });
  }, []);

  return (
    <div className="comment-box">
      <form onSubmit={onSubmit}>
        <div className="box">
          <div className="image">
            <img src={profileImageUrl} alt="user profile pic" />
          </div>

          <textarea
            ref={textAreaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a comment"
            required
          />
        </div>

        {value.length > 0 && (
          <div className="actions">
            <Button
              color="danger"
              variant="empty"
              style={{ borderRadius: "50px" }}
              onClick={cancelHandler}
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              style={{ borderRadius: "50px" }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentBox;
