import "./Upload.scss";
import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import InputUpload from "../../components/InputUpload/InputUpload";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../http";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [video, setVideo] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [tagsError, setTagsError] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const setVideoFile = (e) => {
    setVideo(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setVideoPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (title.length > 0) {
      setTitleError(false);
    }

    if (description.length > 0) {
      setDescriptionError(false);
    }

    if (video.length > 0) {
      setVideoError(false);
    }

    if (tags.length > 0) {
      setTagsError(false);
    }
  }, [description, title, video, tags]);

  const addTagHandler = () => {
    setTags([...tags, tag]);
    setTag("");
  };

  const removeTagHandler = (t) => {
    setTags(tags.filter((tag) => tag !== t));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!video) {
      setError(true);
      setVideoError(true);
      return;
    }

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

    if (tags.length <= 0) {
      setError(true);
      setTagsError(true);
      return;
    }

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("video", video);
    myForm.append("tags", JSON.stringify(tags));

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    try {
      setLoading(true);
      const { data } = await api.post(`/api/v1/videos`, myForm, config);
      setLoading(false);
      navigate(`/${data.video._id}`);
    } catch (error) {
      toast.error("Video upload has been failed");
      toast.error(error.response.data.message);
      setLoading(false);
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
              {error && videoError && (
                <span>*** Please select a video file</span>
              )}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Input
                  label="Tags"
                  width="100%"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required={tags.length <= 0}
                />
                <Button
                  variant="outlined"
                  color="light"
                  onClick={addTagHandler}
                >
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="tags">
                  {tags.map((tag, i) => (
                    <button key={i} onClick={() => removeTagHandler(tag)}>
                      {tag}
                    </button>
                  ))}
                </div>
              )}
              {error && tagsError && (
                <span>*** Please add at least one tag</span>
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

            <Button type="submit" width="w-max" loading={loading}>
              <FiUpload strokeWidth={"3px"} /> Upload
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
