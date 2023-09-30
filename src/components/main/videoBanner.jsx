import { useEffect, useRef } from "react"
import bannerVideo from "./../../assets/videos/banner/banner.webm"
export default function VideoBanner(){
    const videoRef = useRef(null)
    useEffect(()=>{
        if(videoRef.current)
        videoRef.current.playbackRate = 1.25
        videoRef.current.play()
    },[])

    return(
        <>
        <div className="video-banner" >
        <video ref={videoRef} autoPlay muted loop playsInline showcontrols="false" src={bannerVideo} />
        </div>
        </>
    )
}