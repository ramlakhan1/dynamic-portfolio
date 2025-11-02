import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const YOUTUBE_API_KEY = 'AIzaSyDBEIAk_S8126EjNZ6Wg6NCgUs1E1vEYPc'; // <-- Replace with your API key
const MAX_RESULTS = 6;

function YouTubeSearchPlayer({ isPlaying, onPlay, onPause }) {
  const [search, setSearch] = useState('');
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const iframeRef = useRef(null);
  const [iframeKey, setIframeKey] = useState(0); // for force reload

  // If isPlaying becomes false, reload iframe to stop video
  useEffect(() => {
    if (!isPlaying && selected) {
      setIframeKey(k => k + 1);
      if (onPause) onPause();
    }
  }, [isPlaying, selected, onPause]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    setError('');
    setVideos([]);
    setSelected(null);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${MAX_RESULTS}&q=${encodeURIComponent(
          search
        )}&key=${YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      if (data.items) {
        setVideos(data.items);
        setSelected(data.items[0]);
      } else {
        setError('No videos found.');
      }
    } catch (err) {
      setError('Failed to fetch videos.');
    }
    setLoading(false);
  };

  // When user clicks a playlist item, play that video
  const handleSelect = (v) => {
    setSelected(v);
    if (onPlay) onPlay();
  };

  return (
    <div className="yt-search-player-card">
      <form className="yt-search-bar" onSubmit={handleSearch} autoComplete="off">
        <input
          type="text"
          placeholder="Search YouTube videos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="yt-search-input"
        />
        <button type="submit" className="yt-search-btn">Search</button>
      </form>
      {loading && <div className="yt-search-loading">Searching...</div>}
      {error && <div className="yt-search-error">{error}</div>}
      {selected && (
        <div className="yt-search-main-video">
          <div className="youtube-embed-responsive">
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${selected.id.videoId}${isPlaying ? '?autoplay=1' : ''}`}
              title={selected.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => { if (isPlaying && onPlay) onPlay(); }}
            ></iframe>
          </div>
          <div className="youtube-title">{selected.snippet.title}</div>
        </div>
      )}
      {videos.length > 1 && (
        <div className="yt-search-playlist">
          {videos.map((v, i) => (
            <div
              key={v.id.videoId}
              className={`yt-search-playlist-item${selected && v.id.videoId === selected.id.videoId ? ' active' : ''}`}
              onClick={() => handleSelect(v)}
            >
              <img src={v.snippet.thumbnails.default.url} alt={v.snippet.title} />
              <div className="yt-search-playlist-title">{v.snippet.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YouTubeSearchPlayer; 