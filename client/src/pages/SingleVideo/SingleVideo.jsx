import Layout from "../../components/Layout/Layout";
import "./SingleVideo.scss";
import video from "../../assets/video.mp4";
import profile from "../../assets/profile.png";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { CgPlayListAdd } from "react-icons/cg";
import { Link } from "react-router-dom";
import DescriptionAccordian from "../../components/DescriptionAccordian/DescriptionAccordian";
import Recommendation from "../../components/Recommendation/Recommendation";
import CommentBox from "../../components/CommentBox/CommentBox";
import Comments from "../../components/Comments/Comments";

const SingleVideo = () => {
  return (
    <Layout showSidebar={false} showSidebarSlider={true} expand={false}>
      <div className="single-video">
        <div className="content">
          <video src={video} controls muted autoPlay></video>
          <h1 className="title">Get to Know Photoshop CC</h1>
          <div className="info">
            <div className="channel">
              <div>
                <img src={profile} alt="channel" />
                <Link to={`/`}>
                  <h4>Channel Name</h4>
                  <small>2.49M subscribers</small>
                </Link>
              </div>
              <button className="subscribe-btn">Subscribe</button>
            </div>
            <div className="actions">
              <div className="reaction-buttons">
                <button>
                  <AiOutlineLike />
                  <span>3.1k</span>
                </button>
                <button>
                  <AiOutlineDislike />
                  <span>3.1k</span>
                </button>
              </div>
              <button>
                <PiShareFatLight />
                <span>Share</span>
              </button>
              <button>
                <CgPlayListAdd />
                <span>Save</span>
              </button>
            </div>
          </div>
          <div className="description">
            <DescriptionAccordian
              description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fugiat,
        molestias minima officiis, ipsa fugit quis tempora quibusdam quia dolor,
        dolores ratione repellendus sed rem. Deserunt nam voluptas magni
        facilis! Itaque, dicta distinctio! Aut doloribus odit cumque placeat
        quam incidunt aliquid quasi quis voluptates, nostrum deleniti maxime hic
        dignissimos. Veniam dolor inventore excepturi illum minus laboriosam
        vero amet aspernatur ut. Repudiandae magnam tempora nesciunt nihil id
        dignissimos ex sed minus eos velit quasi fugit placeat debitis labore
        sapiente aliquid consectetur rerum perferendis, dolores iure doloremque
        saepe odio! Explicabo, illo eveniet. Dicta nesciunt accusantium
        repellendus ad facilis cumque, maiores expedita quod maxime temporibus
        mollitia ex, voluptatem recusandae harum et nihil corrupti amet quos
        doloremque voluptatibus laboriosam voluptatum itaque distinctio? Odio,
        debitis? Ducimus iure autem consequuntur eum aperiam debitis obcaecati
        enim dolor repudiandae exercitationem perspiciatis repellat quasi beatae
        accusantium, optio, suscipit totam maiores fugit. Placeat illo
        laboriosam, praesentium itaque rerum nisi necessitatibus!
      `}
            />
          </div>
          <div className="all-comments">
            <h3>247 Comments</h3>
            <CommentBox />
            <Comments />
          </div>
        </div>
        <Recommendation />
      </div>
    </Layout>
  );
};

export default SingleVideo;
