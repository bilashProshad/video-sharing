import "./Videos.scss";
import VideoCard from "../VideoCard/VideoCard";
import thumbnail1 from "../../assets/thumbnail-1.png";

// eslint-disable-next-line react/prop-types
const Videos = ({ videos = [] }) => {
  return (
    <div className="videos">
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
          />
        ))}
    </div>
  );
};

export default Videos;
