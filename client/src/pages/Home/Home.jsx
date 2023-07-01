import "./Home.scss";
import Layout from "../../components/Layout/Layout";
import Videos from "../../components/Videos/Videos";

const Home = () => {
  return (
    <>
      <Layout>
        <div className="home">
          <Videos />
        </div>
      </Layout>
    </>
  );
};

export default Home;
