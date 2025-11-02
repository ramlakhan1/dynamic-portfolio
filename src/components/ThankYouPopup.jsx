import React, { useState, useEffect, useCallback } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

export default function ThankYouPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [flowers, setFlowers] = useState([]);

  const createFlowers = useCallback(() => {
    const newFlowers = [];
    for (let i = 0; i < 30; i++) {
      newFlowers.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * 360,
        color: ['#FF6B9D', '#C44569', '#FFC5D9', '#FFB3BA', '#FF8CC8'][
          Math.floor(Math.random() * 5)
        ],
      });
    }
    setFlowers(newFlowers);
  }, []);

  useEffect(() => {
    // Small delay to ensure website renders first
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenThankYou');
      if (!hasSeenPopup) {
        createFlowers();
        setShowPopup(true);
        sessionStorage.setItem('hasSeenThankYou', 'true');
      }
    }, 5000); // 5 seconds - enough time for website to fully render

    // Exit intent detection - show popup when user tries to leave
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        const hasSeenPopup = sessionStorage.getItem('hasSeenThankYou');
        if (!hasSeenPopup) {
          createFlowers();
          setShowPopup(true);
          sessionStorage.setItem('hasSeenThankYou', 'true');
          clearTimeout(timer);
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [createFlowers]);

  const closePopup = () => {
    setShowPopup(false);
  };

  // Return null immediately if popup not showing - won't block render
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closePopup}
      ></div>

      {/* Animated Flowers */}
      {flowers.length > 0 && flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute animate-floatFlower pointer-events-none"
          style={{
            left: `${flower.left}%`,
            bottom: '-50px',
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
            zIndex: 10,
          }}
        >
          <FlowerSVG
            size={flower.size}
            color={flower.color}
            rotation={flower.rotation}
          />
        </div>
      ))}

      {/* Main Popup */}
      <div className="relative z-20 bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-blue-900/95 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 md:p-12 max-w-lg w-full transform animate-popupScale shadow-2xl">
        {/* Sparkles */}
        <Sparkles className="absolute top-4 right-4 text-yellow-400 animate-spin-slow opacity-50" size={24} />
        <Sparkles className="absolute bottom-4 left-4 text-pink-400 animate-spin-slow opacity-50" size={20} style={{ animationDirection: 'reverse' }} />

        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:rotate-90 hover:scale-110"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Animated Heart */}
          <div className="flex justify-center">
            <Heart
              className="text-pink-400 fill-pink-400 animate-heartbeat"
              size={60}
            />
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            Thank You!
          </h2>

          {/* Message */}
          <p className="text-xl text-gray-200 leading-relaxed">
            Thanks for visiting my website!
          </p>
          <p className="text-lg text-gray-300">
            I hope you enjoyed exploring my portfolio. Feel free to reach out if you'd like to connect!
          </p>

          {/* Decorative Flowers */}
          <div className="flex justify-center gap-4 pt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="animate-bounce"
                style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}
              >
                <FlowerSVG
                  size={40}
                  color={['#FF6B9D', '#C44569', '#FFC5D9'][i]}
                  rotation={i * 120}
                />
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={closePopup}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
}

// Flower SVG Component
function FlowerSVG({ size, color, rotation }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        transform: `rotate(${rotation}deg)`,
        filter: `drop-shadow(0 0 10px ${color}80)`,
      }}
      className="animate-rotateFlower pointer-events-none"
    >
      {/* Petals */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="15"
          ry="35"
          fill={color}
          opacity="0.9"
          transform={`rotate(${i * 60} 50 50)`}
        />
      ))}
      {/* Center */}
      <circle cx="50" cy="50" r="12" fill="#FFD700" opacity="0.9" />
      <circle cx="50" cy="50" r="6" fill="#FFA500" />
    </svg>
  );
}
