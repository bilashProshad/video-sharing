import "./Videos.scss";
import VideoCard from "../VideoCard/VideoCard";
import thumbnail1 from "../../assets/thumbnail-1.png";
import thumbnail2 from "../../assets/thumbnail-2.png";
import thumbnail3 from "../../assets/thumbnail-3.png";

const Videos = () => {
  return (
    <div className="videos">
      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
      />

      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail2}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
      />

      <VideoCard
        title={`Get to know Photoshop CC Get to know Photoshop CC Get to know Photoshop CC Get to know Photoshop CC Get to know Photoshop CC`}
        thumbnail={thumbnail3}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
      />

      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
      />

      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail2}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
      />

      <VideoCard
        title={`Get to know Photoshop CC Get to know Photoshop CC Get to know Photoshop CC Get to know Photoshop CC Get to know Photoshop CC`}
        thumbnail={thumbnail3}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
      />

      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
      />

      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail2}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
      />
    </div>
  );
};

export default Videos;
