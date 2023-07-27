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
import { useParams, useNavigate } from "react-router-dom";

const Channel = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState({ subscribers: 0 });
  const [subscribed, setSubscribed] = useState(false);
  const [totalVideos, setTotalVideos] = useState(0);

  const { user: currentUser } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/v1/videos/channel/${id}`);
        setVideos(data.videos);
        setChannel(data.channel);
        setSubscribed(data.subscribed);
        setTotalVideos(data.totalVideos);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    }

    fetchVideos();
  }, [id]);

  const subscribeHandler = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser._id === id) {
      toast.error("You can't subscribe your own channel");
      return;
    }

    try {
      await api.put(`/api/v1/user/sub/${id}`);
      setSubscribed(true);
      setChannel({
        ...channel,
        subscribers: channel.subscribers + 1,
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

    if (currentUser._id === id) {
      toast.error("You can't unsubscribe your own channel");
      return;
    }

    try {
      await api.put(`/api/v1/user/unsub/${id}`);
      setSubscribed(false);
      setChannel({
        ...channel,
        subscribers: channel.subscribers - 1,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="channel">
        <div className="channel-container">
          <div className="wrapper">
            <div className="info">
              <div className="image">
                <img
                  src={
                    channel && channel.avatar && channel.avatar.public_id
                      ? channel.avatar.url
                      : profile
                  }
                  alt={channel?.name}
                />
              </div>
              <div className="body">
                <h2>{channel?.name}</h2>
                <p>
                  <span>{formatValue(+channel.subscribers)}</span> subscribers
                </p>
                <p>
                  <span>{formatValue(+totalVideos)}</span> videos
                </p>
              </div>
            </div>
            <div className="buttons">
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
