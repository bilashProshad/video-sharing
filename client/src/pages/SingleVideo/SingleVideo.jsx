import Layout from "../../components/Layout/Layout";
import "./SingleVideo.scss";
import profile from "../../assets/profile.png";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { CgPlayListAdd } from "react-icons/cg";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import DescriptionAccordian from "../../components/DescriptionAccordian/DescriptionAccordian";
import Recommendation from "../../components/Recommendation/Recommendation";
import CommentBox from "../../components/CommentBox/CommentBox";
import Comments from "../../components/Comments/Comments";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../http";
import Loading from "../../components/Loading/Loading";
import formatValue from "../../utils/formatValue";
import { useAuthContext } from "../../contexts/AuthContext";
import Button from "../../components/Button/Button";

const SingleVideo = () => {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const { id } = useParams();

  const { user: currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/v1/videos/${id}`);
        setLiked(data.liked);
        setDisLiked(data.disliked);
        setSubscribed(data.subscribed);
        setSaved(data.saved);
        // const tags = data.video.tags.join(",");
        // const { data: similarVideos } = await api.get(
        //   `/api/v1/videos/tags?tags=${tags}`
        // );
        const { data: similarVideos } = await api.get(`/api/v1/videos/random`);
        setVideo(data.video);
        setComments(data.video.comments);
        setVideos(similarVideos.videos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    fetchVideo();
  }, [id]);

  const likeHandler = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await api.put(`/api/v1/user/like/${id}`);
      setVideo({
        ...video,
        likes: [...video.likes, currentUser._id],
        dislikes: video.dislikes.filter((id) => currentUser._id !== id),
      });
      setLiked(true);
      setDisLiked(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const unlikeHandler = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await api.put(`/api/v1/user/unlike/${id}`);
      setVideo({
        ...video,
        dislikes: [...video.dislikes, currentUser._id],
        likes: video.likes.filter((id) => currentUser._id !== id),
      });
      setLiked(false);
      setDisLiked(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const subscribeHandler = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser._id === video.uploader._id) {
      toast.error("You can't subscribe your own channel");
      return;
    }

    try {
      await api.put(`/api/v1/user/sub/${video.uploader._id}`);
      setSubscribed(true);
      setVideo({
        ...video,
        uploader: {
          ...video.uploader,
          subscribers: video.uploader.subscribers + 1,
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const unSubscribeHandler = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser._id === video.uploader._id) {
      toast.error("You can't unsubscribe your own channel");
      return;
    }

    try {
      await api.put(`/api/v1/user/unsub/${video.uploader._id}`);
      setSubscribed(false);
      setVideo({
        ...video,
        uploader: {
          ...video.uploader,
          subscribers: video.uploader.subscribers - 1,
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      setCommentLoading(true);
      const { data } = await api.post(`/api/v1/videos/${id}/comments`, {
        comment,
      });
      setComments([data.comment, ...comments]);
      setComment("");
      setCommentLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setCommentLoading(false);
    }
  };

  const saveHandler = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await api.put(`/api/v1/user/save/${id}`);
      setSaved(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const unSaveHandler = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await api.put(`/api/v1/user/unsave/${id}`);
      setSaved(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout showSidebar={false} showSidebarSlider={true} expand={true}>
      {loading ? (
        <Loading />
      ) : (
        video && (
          <>
            <div className="single-video">
              <div className="content">
                <video
                  src={video?.video?.url}
                  controls
                  muted
                  autoPlay
                  controlsList="nodownload"
                ></video>
                <h1 className="title">{video?.title}</h1>
                <div className="info">
                  <div className="channel">
                    <div>
                      <img
                        src={
                          video &&
                          video.uploader &&
                          video.uploader.avatar &&
                          video.uploader.avatar.public_id
                            ? video.uploader.avatar.url
                            : profile
                        }
                        alt={video?.uploader?.name}
                      />
                      <Link to={`/channel/${video.uploader._id}/videos`}>
                        <h4>{video?.uploader?.name}</h4>
                        <small>
                          {formatValue(video?.uploader?.subscribers)}{" "}
                          subscribers
                        </small>
                      </Link>
                    </div>
                    {subscribed ? (
                      <Button
                        variant="round"
                        className={"subscribe-btn"}
                        onClick={unSubscribeHandler}
                      >
                        Subscribed
                      </Button>
                    ) : (
                      <Button
                        variant="round"
                        color="dark"
                        className={"subscribe-btn"}
                        onClick={subscribeHandler}
                      >
                        Subscribe
                      </Button>
                    )}
                  </div>
                  <div className="actions">
                    <div className="reaction-buttons">
                      <button onClick={likeHandler}>
                        {liked ? <AiFillLike /> : <AiOutlineLike />}
                        <span>{formatValue(video?.likes?.length)}</span>
                      </button>
                      <button onClick={unlikeHandler}>
                        {disLiked ? <AiFillDislike /> : <AiOutlineDislike />}
                        <span>{formatValue(video?.dislikes?.length)}</span>
                      </button>
                    </div>
                    <button>
                      <PiShareFatLight />
                      <span>Share</span>
                    </button>
                    {saved ? (
                      <button onClick={unSaveHandler}>
                        <MdOutlinePlaylistAddCheck />
                        <span>Saved</span>
                      </button>
                    ) : (
                      <button onClick={saveHandler}>
                        <CgPlayListAdd />
                        <span>Save</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="description">
                  <DescriptionAccordian description={video?.description} />
                </div>
                <div className="all-comments">
                  <h3>Comments</h3>
                  <CommentBox
                    profileImageUrl={
                      currentUser &&
                      currentUser.avatar &&
                      currentUser.avatar.public_id
                        ? currentUser.avatar.url
                        : profile
                    }
                    value={comment}
                    setValue={setComment}
                    loading={commentLoading}
                    onSubmit={commentHandler}
                  />
                  <Comments comments={comments} />
                </div>
              </div>
              <Recommendation videos={videos} />
            </div>
          </>
        )
      )}
    </Layout>
  );
};

export default SingleVideo;
