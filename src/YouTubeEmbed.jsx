import React from 'react';
import './App.css';

function YouTubeEmbed({ videoId, title }) {
  return (
    <div className="youtube-embed-card">
      <div className="youtube-embed-responsive">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'YouTube video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {title && <div className="youtube-title">{title}</div>}
    </div>
  );
}

export default YouTubeEmbed; 