import "./UpdateVideo.scss";
import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../http";
import { useNavigate, useParams } from "react-router-dom";

const UpdateVideo = () => {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const [tagsError, setTagsError] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/v1/videos/${id}`);
        setTitle(data.video.title);
        setDescription(data.video.description);
        setTags(data.video.tags);
        setVideoUrl(data.video.video.url);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    if (title.length > 0) {
      setTitleError(false);
    }

    if (description.length > 0) {
      setDescriptionError(false);
    }

    if (tags.length > 0) {
      setTagsError(false);
    }
  }, [description, title, tags]);

  const addTagHandler = () => {
    setTags([...tags, tag]);
    setTag("");
  };

  const removeTagHandler = (t) => {
    setTags(tags.filter((tag) => tag !== t));
  };

  const onSubmitHandler = async (e) => {
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

    if (tags.length <= 0) {
      setError(true);
      setTagsError(true);
      return;
    }

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("tags", JSON.stringify(tags));

    try {
      setLoading(true);
      const { data } = await api.put(`/api/v1/videos/${id}`, myForm);
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
      <div className="update-video signin">
        <div className="form-container">
          {!loading && videoUrl && (
            <video src={videoUrl} controls muted autoPlay></video>
          )}
          <form onSubmit={onSubmitHandler}>
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
              <FiUpload strokeWidth={"3px"} /> Update
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateVideo;
