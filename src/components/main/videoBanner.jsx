import React,{ useEffect, useRef } from "react";
import bannerVideo from "./../../assets/videos/banner/banner.webm";
import { Link } from "react-router-dom";

export default function VideoBanner() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.25;
    videoRef.current.play();
  }, []);

  return (
      <header className="video-banner">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          src={bannerVideo}
        />
        <div className="banner-items">
          <div className="banner-title" >Welcome to Milo Market!</div>
          <span className="banner-description">Here you will find all the organics in the world</span>
          <Link to="/store">
          <button >Check out the store</button>
          </Link>
        </div>
      </header>
  );
}
