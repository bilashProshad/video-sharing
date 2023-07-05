import "./Upload.scss";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import InputUpload from "../../components/InputUpload/InputUpload";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";
import { FiUpload } from "react-icons/fi";

const Upload = () => {
  const [video, setVideo] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");
  const [error, setError] = useState(false);

  const setVideoFile = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setVideoPreview(reader.result);
        setVideo(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!title) {
      setError(true);
      setTitleError(true);
      return;
    }

    if (!description) {
      setError(true);
      setDescriptionError(true);
      return;
    }
  };

  return (
    <Layout>
      <div className="upload signin">
        <div className="form-container">
          {videoPreview && (
            <video src={videoPreview} controls muted autoPlay></video>
          )}
          <form onSubmit={onSubmitHandler}>
            <div className="input-box">
              <InputUpload
                label="Upload video"
                name="video"
                accept="video/*"
                onChange={setVideoFile}
              />
            </div>
            <div className="input-box">
              <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {error && titleError && (
                <span>*** Please enter a valid email</span>
              )}
            </div>
            <div className="input-box">
              <Textarea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {error && descriptionError && (
                <span>*** Please enter video description</span>
              )}
            </div>
            <Button type="submit" width="w-max">
              <FiUpload strokeWidth={"3px"} /> Upload
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
