import "./Home.scss";
import Layout from "../../components/Layout/Layout";
import Videos from "../../components/Videos/Videos";
import { useEffect, useState } from "react";
import api from "../../http";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        </div>
      </Layout>
    </>
  );
};

export default Home;
