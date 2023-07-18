import Layout from "../../components/Layout/Layout";
import "./SingleVideo.scss";
import profile from "../../assets/profile.png";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { CgPlayListAdd } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import DescriptionAccordian from "../../components/DescriptionAccordian/DescriptionAccordian";
import Recommendation from "../../components/Recommendation/Recommendation";
import CommentBox from "../../components/CommentBox/CommentBox";
import Comments from "../../components/Comments/Comments";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../http";
import Loading from "../../components/Loading/Loading";
import formatValue from "../../utils/formatValue";

const SingleVideo = () => {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/v1/videos/${id}`);
        const { data: similarVideos } = await api.get(`/api/v1/videos/random`);
        setVideo(data.video);
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
    const { data } = await api.put(`/api/v1/user/like/${id}`);
    setVideo(data.video);
  };

  const unlikeHandler = async () => {
    const { data } = await api.put(`/api/v1/user/unlike/${id}`);
    setVideo(data.video);
  };

  return (
    <Layout showSidebar={false} showSidebarSlider={true} expand={false}>
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
                      <img src={profile} alt="channel" />
                      <Link to={`/`}>
                        <h4>{video?.uploader?.name}</h4>
                        <small>
                          {formatValue(video?.uploader?.subscribers)}{" "}
                          subscribers
                        </small>
                      </Link>
                    </div>
                    <button className="subscribe-btn">Subscribe</button>
                  </div>
                  <div className="actions">
                    <div className="reaction-buttons">
                      <button onClick={likeHandler}>
                        <AiOutlineLike />
                        <span>{formatValue(video?.likes?.length)}</span>
                      </button>
                      <button onClick={unlikeHandler}>
                        <AiOutlineDislike />
                        <span>{formatValue(video?.dislikes?.length)}</span>
                      </button>
                    </div>
                    <button>
                      <PiShareFatLight />
                      <span>Share</span>
                    </button>
                    <button>
                      <CgPlayListAdd />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
                <div className="description">
                  <DescriptionAccordian description={video?.description} />
                </div>
                <div className="all-comments">
                  <h3>247 Comments</h3>
                  <CommentBox />
                  <Comments />
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
