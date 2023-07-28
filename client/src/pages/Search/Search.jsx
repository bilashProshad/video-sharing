import { useEffect, useState } from "react";
import "./Search.scss";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { toast } from "react-hot-toast";
import api from "../../http";
import Layout from "../../components/Layout/Layout";
import Loading from "../../components/Loading/Loading";
import Videos from "../../components/Videos/Videos";
import NotFoundVideos from "../../components/NotFoundVideos/NotFoundVideos";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const { setActiveLink } = useSidebarContext();

  useEffect(() => {
    setActiveLink("home");

    const fetchVideos = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(
          `/api/v1/videos/search${location.search}`
        );
        setVideos(data.videos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    fetchVideos();
  }, [location, setActiveLink]);

  return (
    <>
      <Layout>
        <div className="home">
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
    </>
  );
};

export default Search;
