import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const sampleVideo = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Replace with your video URL

function VideoPlayer({ src = sampleVideo, poster, isPlaying, onPlay, onPause }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  // Pause if isPlaying becomes false
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isPlaying && !video.paused) {
      video.pause();
      setPlaying(false);
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
      if (onPlay) onPlay();
    } else {
      video.pause();
      setPlaying(false);
      if (onPause) onPause();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const percent = e.target.value;
    video.currentTime = (percent / 100) * video.duration;
    setProgress(percent);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const vol = e.target.value;
    video.volume = vol;
    setVolume(vol);
  };

  const handleEnded = () => {
    setPlaying(false);
    if (onPause) onPause();
  };

  return (
    <div className="video-player-card">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="video-element"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onClick={handlePlayPause}
        style={{ borderRadius: '18px' }}
      />
      <div className="video-controls">
        <button className="video-btn" onClick={handlePlayPause} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? (
            <svg width="24" height="24" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="2" fill="#2563eb"/><rect x="14" y="5" width="4" height="14" rx="2" fill="#2563eb"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24"><polygon points="6,4 20,12 6,20" fill="#2563eb"/></svg>
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="video-progress"
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="video-volume"
        />
      </div>
    </div>
  );
}

export default VideoPlayer; 