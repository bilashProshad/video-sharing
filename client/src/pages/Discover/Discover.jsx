import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Videos from "../../components/Videos/Videos";
import "./Discover.scss";
import api from "../../http";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading/Loading";
import NotFoundVideos from "../../components/NotFoundVideos/NotFoundVideos";
import { useSidebarContext } from "../../contexts/SidebarContext";

const Discover = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setActiveLink } = useSidebarContext();

  useEffect(() => {
    setActiveLink("discover");

    const fetchVideos = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/v1/videos/random`);
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
      <div className="discover">
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

export default Discover;
