import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Channel.scss";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-hot-toast";
import api from "../../http";
import { useAuthContext } from "../../contexts/AuthContext";
import Videos from "../../components/Videos/Videos";
import formatValue from "../../utils/formatValue";
import profile from "../../assets/thumbnail-1.png";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Channel = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user: currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const { data } = await api.get(
          `/api/v1/videos/channel/${currentUser._id}`
        );
        setVideos(data.videos);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    }

    fetchVideos();
  }, [currentUser]);

  return (
    <Layout>
      <div className="channel">
        <div className="channel-container">
          <div className="wrapper">
            <div className="info">
              <div className="image">
                <img src={profile} alt="channel" />
              </div>
              <div className="body">
                <h2>{currentUser?.name}</h2>
                <p>
                  <span>{formatValue(currentUser.subscribers)}</span>{" "}
                  subscribers
                </p>
                <p>
                  <span>{formatValue(3800)}</span> videos
                </p>
              </div>
            </div>
            <div className="buttons">
              <Button
                width="w-max"
                color="light"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </Button>
              <Button
                width="w-max"
                color="light"
                onClick={() => navigate("/upload")}
              >
                Upload Videos
              </Button>
            </div>
          </div>
        </div>
        {loading && <Loading />}
        {!loading && videos.length > 0 && (
          <div className="video-list">
            <Videos videos={videos} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Channel;
