import React, { useEffect } from "react";
import useAPI from "../../store/useAPI";

const Video = () => {
  const { video, isLoadingVideo, getVideo } = useAPI();

  useEffect(() => {
    getVideo("hello");
  }, []);

  return <div>video</div>;
};

export default Video;
