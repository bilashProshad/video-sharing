import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Videos from "../../components/Videos/Videos";
import toast from "react-hot-toast";
import "./Subscriptions.scss";
import api from "../../http";
import Loading from "../../components/Loading/Loading";

const Subscriptions = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/v1/videos/subscribed`);
        setVideos(data.videos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    fetchVideos();
  }, []);

  return (
    <Layout>
      <div className="subscriptions">
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <Videos videos={videos} />
        )}
      </div>
    </Layout>
  );
};

export default Subscriptions;
