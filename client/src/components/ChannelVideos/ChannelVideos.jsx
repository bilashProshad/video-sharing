import ChannelVideoCard from "../ChannelVideoCard/ChannelVideoCard";
import "./ChannelVideos.scss";

const ChannelVideos = ({ videos = [] }) => {
  return (
    <div className="channel-videos">
      {videos.length > 0 &&
        videos.map((video) => (
          <ChannelVideoCard
            key={video._id}
            id={video._id}
            title={video.title}
            channelName={video.uploader.name}
            views={video.views}
            date={video.createdAt}
            videoUrl={video.video.url}
          />
        ))}
    </div>
  );
};

export default ChannelVideos;
