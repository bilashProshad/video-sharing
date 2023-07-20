import ChannelVideoCard from "../ChannelVideoCard/ChannelVideoCard";
import "./ChannelVideos.scss";
import thumbnail1 from "../../assets/thumbnail-1.png";

const ChannelVideos = ({ videos = [] }) => {
  return (
    <div className="channel-videos">
      {videos.length > 0 &&
        videos.map((video) => (
          <ChannelVideoCard
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

export default ChannelVideos;
