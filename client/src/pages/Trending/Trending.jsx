import Layout from "../../components/Layout/Layout";
import Videos from "../../components/Videos/Videos";
import "./Trending.scss";

const Trending = () => {
  return (
    <Layout>
      <div className="trending">
        <Videos />
      </div>
    </Layout>
  );
};

export default Trending;
