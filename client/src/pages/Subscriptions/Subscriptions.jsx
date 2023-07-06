import Layout from "../../components/Layout/Layout";
import Videos from "../../components/Videos/Videos";
import "./Subscriptions.scss";

const Subscriptions = () => {
  return (
    <Layout>
      <div className="subscriptions">
        <Videos />
      </div>
    </Layout>
  );
};

export default Subscriptions;
