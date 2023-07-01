import "./Recommendation.scss";
import VideoCard from "../VideoCard/VideoCard";
import thumbnail1 from "../../assets/thumbnail-1.png";
import { useEffect, useState } from "react";

const Recommendation = () => {
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
      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
        verticle={windowSize > 950 ? true : false}
      />
      <VideoCard
        title={`Get to know Photoshop CCf saddfsaaaa aaaaaaa aaaaaaaaaaaaa aaaa aaaaaaa`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
        verticle={windowSize > 950 ? true : false}
      />
      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
        verticle={windowSize > 950 ? true : false}
      />
      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
        verticle={windowSize > 950 ? true : false}
      />
      <VideoCard
        title={`Get to know Photoshop CCf saddfsaaaa aaaaaaa aaaaaaaaaaaaa aaaa aaaaaaa`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
        verticle={windowSize > 950 ? true : false}
      />
      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
        verticle={windowSize > 950 ? true : false}
      />
      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
        verticle={windowSize > 950 ? true : false}
      />
      <VideoCard
        title={`Get to know Photoshop CCf saddfsaaaa aaaaaaa aaaaaaaaaaaaa aaaa aaaaaaa`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
        verticle={windowSize > 950 ? true : false}
      />
      <VideoCard
        title={`Get to know Photoshop CC`}
        thumbnail={thumbnail1}
        channelName={`Adobe Creative Cloud`}
        views={`27K Views`}
        date={`1 year ago`}
        verticle={windowSize > 950 ? true : false}
      />
    </div>
  );
};

export default Recommendation;
