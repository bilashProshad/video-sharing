import Layout from "../../components/Layout/Layout";
import Videos from "../../components/Videos/Videos";
import "./Discover.scss";

const Discover = () => {
  return (
    <Layout>
      <div className="discover">
        <Videos />
      </div>
    </Layout>
  );
};

export default Discover;
