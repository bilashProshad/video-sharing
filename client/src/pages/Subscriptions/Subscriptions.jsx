import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Videos from "../../components/Videos/Videos";
import toast from "react-hot-toast";
import "./Subscriptions.scss";
import api from "../../http";
import Loading from "../../components/Loading/Loading";
import NotFoundVideos from "../../components/NotFoundVideos/NotFoundVideos";
import { useSidebarContext } from "../../contexts/SidebarContext";

const Subscriptions = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setActiveLink } = useSidebarContext();

  useEffect(() => {
    setActiveLink("subscriptions");

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
  }, [setActiveLink]);

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

        {!loading && videos.length <= 0 && <NotFoundVideos />}
      </div>
    </Layout>
  );
};

export default Subscriptions;
