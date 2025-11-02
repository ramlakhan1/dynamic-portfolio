import React, { useState, useEffect } from 'react';
import { Github, Code, GitBranch, Star, TrendingUp, RefreshCw, Users, Folder, Calendar } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function GitHubDashboard() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [contributionStats, setContributionStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'ramlakhan1';

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user profile
      const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!profileResponse.ok) {
        throw new Error('GitHub profile not found');
      }

      const profileData = await profileResponse.json();
      setProfile(profileData);

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (reposResponse.ok) {
        const reposData = await reposResponse.json();
        
        // Filter out forked repos for stats (optional - you can include them)
        const ownRepos = reposData.filter(repo => !repo.fork);
        setRepos(ownRepos.slice(0, 6)); // Top 6 repos

        // Calculate stats from repositories
        const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
        const totalSize = ownRepos.reduce((sum, repo) => sum + repo.size, 0);
        
        setContributionStats({
          totalRepos: ownRepos.length,
          totalStars,
          totalForks,
          totalSize: (totalSize / 1024).toFixed(1), // Convert to MB
          languages: calculateLanguages(ownRepos)
        });
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError('GitHub data fetch nahi ho raha. Please try again later.');
      setLoading(false);
    }
  };

  const calculateLanguages = (repos) => {
    const langMap = {};
    
    repos.forEach(repo => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    return Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, count]) => ({ language: lang, count }));
  };

  if (loading) {
    return (
      <section id="github" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-400">GitHub stats load ho rahe hain...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section id="github" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-pink-500/5 to-blue-500/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <Github className="text-purple-400 mx-auto mb-4" size={48} />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                GitHub Dashboard
              </span>
            </h2>
          </div>
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-gray-400 mb-2">{error || 'GitHub profile load nahi ho raha'}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={fetchGitHubData}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
              >
                <RefreshCw size={20} />
                Retry
              </button>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold hover:scale-105 transition-all"
              >
                <Github size={20} />
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-32 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-pink-500/5 to-blue-500/5"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Github className="text-purple-400" size={40} />
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                GitHub Dashboard
              </span>
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src={profile.avatar_url}
              alt={profile.name || username}
              className="w-16 h-16 rounded-full border-2 border-purple-400"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-200">{profile.name || username}</h3>
              <p className="text-gray-400">@{profile.login}</p>
            </div>
          </div>
          {profile.bio && (
            <p className="text-gray-400 mb-4 max-w-2xl mx-auto">{profile.bio}</p>
          )}
          <div className="flex items-center justify-center gap-4">
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Full Profile <TrendingUp size={18} />
            </a>
            <button
              onClick={fetchGitHubData}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Public Repositories */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <Folder className="text-purple-400 group-hover:scale-110 transition-transform" size={32} />
              <span className="text-3xl font-bold text-purple-400">{profile.public_repos}</span>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1">Public Repositories</h3>
            <p className="text-gray-500 text-sm">Total repos</p>
          </div>

          {/* Followers */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-pink-400/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-pink-400 group-hover:scale-110 transition-transform" size={32} />
              <span className="text-3xl font-bold text-pink-400">{profile.followers}</span>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1">Followers</h3>
            <p className="text-gray-500 text-sm">GitHub followers</p>
          </div>

          {/* Following */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-blue-400 group-hover:scale-110 transition-transform" size={32} />
              <span className="text-3xl font-bold text-blue-400">{profile.following}</span>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1">Following</h3>
            <p className="text-gray-500 text-sm">Following users</p>
          </div>

          {/* Total Stars */}
          {contributionStats && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <Star className="text-yellow-400 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-3xl font-bold text-yellow-400">{contributionStats.totalStars}</span>
              </div>
              <h3 className="text-gray-300 font-semibold mb-1">Total Stars</h3>
              <p className="text-gray-500 text-sm">Stars received</p>
            </div>
          )}
        </div>

        {/* Additional Stats */}
        {contributionStats && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="text-green-400" size={24} />
                <span className="text-gray-300 font-semibold">Total Forks</span>
              </div>
              <p className="text-3xl font-bold text-green-400">{contributionStats.totalForks}</p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Code className="text-orange-400" size={24} />
                <span className="text-gray-300 font-semibold">Code Size</span>
              </div>
              <p className="text-3xl font-bold text-orange-400">{contributionStats.totalSize} MB</p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-blue-400" size={24} />
                <span className="text-gray-300 font-semibold">Member Since</span>
              </div>
              <p className="text-lg font-bold text-blue-400">
                {new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
        )}

        {/* Top Languages */}
        {contributionStats && contributionStats.languages.length > 0 && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Code className="text-purple-400" size={24} />
              <h3 className="text-2xl font-bold text-gray-200">Top Languages</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contributionStats.languages.map((lang, idx) => {
                const percentage = (lang.count / contributionStats.totalRepos) * 100;
                const colors = [
                  'from-purple-500 to-pink-500',
                  'from-blue-500 to-cyan-500',
                  'from-green-500 to-emerald-500',
                  'from-yellow-500 to-orange-500',
                  'from-red-500 to-pink-500',
                  'from-indigo-500 to-purple-500'
                ];
                return (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-400/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 font-semibold">{lang.language}</span>
                      <span className="text-purple-400 font-bold">{lang.count}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors[idx % colors.length]} rounded-full transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{percentage.toFixed(1)}% of repos</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Featured Repositories */}
        {repos.length > 0 && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-yellow-400" size={24} />
              <h3 className="text-2xl font-bold text-gray-200">Featured Repositories</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-400/50 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-200 group-hover:text-purple-400 transition-colors">
                      {repo.name}
                    </h4>
                    <Github size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  {repo.description && (
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{repo.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitBranch size={14} />
                      {repo.forks_count}
                    </span>
                  </div>
                  {repo.updated_at && (
                    <p className="text-gray-600 text-xs mt-2">
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Profile Link */}
        <div className="text-center">
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            <Github size={20} />
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
