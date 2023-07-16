import "./Recommendation.scss";
import VideoCard from "../VideoCard/VideoCard";
import thumbnail1 from "../../assets/thumbnail-1.png";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Recommendation = ({ videos = [] }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="recommendation">
      {videos.length > 0 &&
        videos.map((video) => (
          <VideoCard
            key={video._id}
            id={video._id}
            title={video.title}
            thumbnail={thumbnail1}
            channelName={video.uploader.name}
            views={video.views}
            date={video.createdAt}
            verticle={windowSize > 950 ? true : false}
          />
        ))}
    </div>
  );
};

export default Recommendation;
