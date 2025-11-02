import React, { useState, useEffect } from 'react';
import { Code, Trophy, Calendar, TrendingUp, CheckCircle, Target, Award, RefreshCw } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function LeetCodeDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = portfolioData.leetcode?.username || '1s4byeSaJZ';
  const manualData = portfolioData.leetcode;

  useEffect(() => {
    fetchLeetCodeData();
  }, []);

  const fetchLeetCodeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try multiple API endpoints
      const apis = [
        `https://leetcode-stats-api.herokuapp.com/${username}`,
        `https://leetcode-api-faisalshohag.vercel.app/${username}`,
        `https://leetcodestats.cyclic.app/${username}`,
        `https://leetcode-stats-six.vercel.app/${username}`
      ];

      let data = null;
      
      // Try each API
      for (const apiUrl of apis) {
        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
          });
          
          if (response.ok) {
            data = await response.json();
            if (data.status === 'success' || data.totalSolved !== undefined) {
              break;
            }
          }
        } catch (e) {
          continue; // Try next API
        }
      }

      // If all APIs failed, use manual data
      if (!data || (!data.status && !data.totalSolved)) {
        if (manualData) {
          setStats({
            totalSolved: manualData.totalSolved || 0,
            easySolved: manualData.easySolved || 0,
            mediumSolved: manualData.mediumSolved || 0,
            hardSolved: manualData.hardSolved || 0,
            acceptanceRate: manualData.acceptanceRate || '0',
            ranking: manualData.ranking || 0,
            totalSubmissions: manualData.totalSubmissions || 0,
            isManual: true
          });
        } else {
          throw new Error('API aur manual data dono unavailable hain');
        }
      } else {
        // Use API data
        setStats({
          totalSolved: data.totalSolved || 0,
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
          acceptanceRate: data.acceptanceRate ? parseFloat(data.acceptanceRate).toFixed(1) : '0',
          ranking: data.ranking || 0,
          totalSubmissions: data.totalSubmissions || 0,
          isManual: false
        });
      }

      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      
      // Fallback to manual data
      if (manualData) {
        setStats({
          totalSolved: manualData.totalSolved || 0,
          easySolved: manualData.easySolved || 0,
          mediumSolved: manualData.mediumSolved || 0,
          hardSolved: manualData.hardSolved || 0,
          acceptanceRate: manualData.acceptanceRate || '0',
          ranking: manualData.ranking || 0,
          totalSubmissions: manualData.totalSubmissions || 0,
          isManual: true
        });
        setLoading(false);
      } else {
        setError('LeetCode data load nahi ho raha. Portfolio.json mein data add karein.');
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <section id="leetcode" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-400">Loading LeetCode stats...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && !stats) {
    return (
      <section id="leetcode" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-red-500/5 to-yellow-500/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <Code className="text-orange-400 mx-auto mb-4" size={48} />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                LeetCode Dashboard
              </span>
            </h2>
          </div>
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-gray-400 mb-2">{error}</p>
            <p className="text-gray-500 text-sm mb-6">
              Portfolio.json mein leetcode data add karein ya LeetCode profile link pe click karein.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={fetchLeetCodeData}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
              >
                <RefreshCw size={20} />
                Retry
              </button>
              <a
                href={`https://leetcode.com/u/${username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold hover:scale-105 transition-all"
              >
                <Code size={20} />
                LeetCode Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const totalSolved = stats.totalSolved || 0;
  const easySolved = stats.easySolved || 0;
  const mediumSolved = stats.mediumSolved || 0;
  const hardSolved = stats.hardSolved || 0;
  const acceptanceRate = stats.acceptanceRate || '0';
  const ranking = stats.ranking || 0;
  const totalSubmissions = stats.totalSubmissions || 0;

  return (
    <section id="leetcode" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-red-500/5 to-yellow-500/5"></div>
      <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Code className="text-orange-400 w-8 h-8 sm:w-10 sm:h-10" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                LeetCode Dashboard
              </span>
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-3 sm:mb-4 px-4">My coding practice and achievements</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <a
              href={`https://leetcode.com/u/${username}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-xs sm:text-sm md:text-base touch-manipulation"
            >
              View Full Profile <TrendingUp size={14} className="sm:w-5 sm:h-5" />
            </a>
            {stats && !stats.isManual && (
              <button
                onClick={fetchLeetCodeData}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors text-xs sm:text-sm md:text-base touch-manipulation"
              >
                <RefreshCw size={14} className="sm:w-5 sm:h-5" />
                Refresh
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Total Solved */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-orange-400/50 active:border-orange-400/30 transition-all duration-300 group touch-manipulation">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Trophy className="text-orange-400 group-hover:scale-110 transition-transform w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl font-bold text-orange-400">{totalSolved}</span>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1 text-xs sm:text-sm">Problems Solved</h3>
            <p className="text-gray-500 text-xs">Total accepted</p>
          </div>

          {/* Acceptance Rate */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-green-400/50 active:border-green-400/30 transition-all duration-300 group touch-manipulation">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Target className="text-green-400 group-hover:scale-110 transition-transform w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl font-bold text-green-400">{acceptanceRate}%</span>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1 text-xs sm:text-sm">Acceptance Rate</h3>
            <p className="text-gray-500 text-xs">Success rate</p>
          </div>

          {/* Ranking */}
          {ranking > 0 && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-purple-400/50 active:border-purple-400/30 transition-all duration-300 group touch-manipulation">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <Award className="text-purple-400 group-hover:scale-110 transition-transform w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-2xl sm:text-3xl font-bold text-purple-400">
                  {ranking > 1000 ? `${(ranking / 1000).toFixed(1)}K` : ranking}
                </span>
              </div>
              <h3 className="text-gray-300 font-semibold mb-1 text-xs sm:text-sm">Global Ranking</h3>
              <p className="text-gray-500 text-xs">Among all users</p>
            </div>
          )}

          {/* Total Submissions */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-blue-400/50 active:border-blue-400/30 transition-all duration-300 group touch-manipulation">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <CheckCircle className="text-blue-400 group-hover:scale-110 transition-transform w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl font-bold text-blue-400">{totalSubmissions}</span>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1 text-xs sm:text-sm">Total Submissions</h3>
            <p className="text-gray-500 text-xs">All attempts</p>
          </div>
        </div>

        {/* Difficulty Breakdown - Mobile Optimized */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            { difficulty: 'Easy', count: easySolved, color: 'green' },
            { difficulty: 'Medium', count: mediumSolved, color: 'yellow' },
            { difficulty: 'Hard', count: hardSolved, color: 'red' }
          ].map((item, idx) => {
            const percentage = totalSolved > 0 ? (item.count / totalSolved) * 100 : 0;
            const gradientColors = {
              green: 'linear-gradient(to right, #22c55e, #16a34a)',
              yellow: 'linear-gradient(to right, #eab308, #ca8a04)',
              red: 'linear-gradient(to right, #ef4444, #dc2626)'
            };
            const borderColors = {
              green: 'rgba(34, 197, 94, 0.3)',
              yellow: 'rgba(234, 179, 8, 0.3)',
              red: 'rgba(239, 68, 68, 0.3)'
            };
            const textColors = {
              green: 'text-green-400',
              yellow: 'text-yellow-400',
              red: 'text-red-400'
            };
            
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-opacity-50 transition-all duration-300 group"
                style={{ borderColor: borderColors[item.color] }}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className={`text-lg font-bold ${textColors[item.color]}`}>
                    {item.difficulty}
                  </span>
                  <span className={`text-3xl font-bold ${textColors[item.color]}`}>
                    {item.count}
                  </span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${percentage}%`,
                      background: gradientColors[item.color]
                    }}
                  ></div>
                </div>
                <p className="text-gray-500 text-sm">{percentage.toFixed(1)}% of total solved</p>
              </div>
            );
          })}
        </div>

        {/* Profile Link */}
        <div className="text-center">
          <a
            href={`https://leetcode.com/u/${username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 touch-manipulation"
          >
            <Code size={18} className="sm:w-5 sm:h-5" />
            View Full LeetCode Profile
          </a>
        </div>
      </div>
    </section>
  );
}


