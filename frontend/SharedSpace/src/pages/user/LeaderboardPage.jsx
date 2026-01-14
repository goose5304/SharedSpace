import './LeaderboardPage.css'
import React, { useState, useEffect } from 'react';
import PlaceholderArt from '../../assets/arts/cherryblossom.jpg';
import DefaultAvatar from '/defaultAvatar.png';
import API_BASE_URL from '../../apiConfig';

export function LeaderboardPage() {
    const [ranking5, setRanking5] = useState([]);
    const [votingRanks3, setVotingRanks3] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const colors = ['#CB6D6D', '#EF8C8C', '#EDA8A8', '#FFE2E2', '#FFE2E2'];

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                // 1. Fetch Streak Leaders
                const streakRes = await fetch(`${API_BASE_URL}/api/leaderboard/streaks`);
                if (streakRes.ok) {
                    const streakData = await streakRes.json();
                    setRanking5(streakData);
                }

                // 2. Fetch Top Artworks
                const artRes = await fetch(`${API_BASE_URL}/api/leaderboard/artworks`);
                if (artRes.ok) {
                    const artData = await artRes.json();
                    setVotingRanks3(artData);
                }
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    // Helper to get item at index or return a placeholder
    const getPodiumItem = (index) => {
        if (votingRanks3[index]) return votingRanks3[index];
        return {
            img: PlaceholderArt,
            totalScore: 0,
            author: null,
            isPlaceholder: true
        };
    };

    if (isLoading) return <div className="lb-current-leaderboardBody"><h1>Loading Rankings...</h1></div>;

    // Calculate ranks dynamically based on scores
    let currentRank = 0;
    let lastScore = null;

    const rankedUsers = ranking5.map((user) => {
        if (user.score !== lastScore) {
            currentRank++;
        }
        lastScore = user.score;
        return { ...user, displayRank: currentRank };
    });

    return (
        <div className="lb-current-leaderboardBody">
            <h1 className="lb-current-leaderboard-title">Leaderboard</h1>

            <div className="lb-current-leaderboard-wrapper">
                {/* User Rankings Section */}
                <div className="lb-current-leaderboard-section">
                    <h2 className="lb-current-section-title">Most Active Users</h2>
                    <div className="lb-current-leaderboard-container">
                        {rankedUsers.map((user, index) => (
                            <div
                                key={index}
                                className="lb-current-leaderboard-item"
                                style={{ backgroundColor: colors[index] || '#FFE2E2' }}
                            >
                                {/* 🏆 Uses calculated displayRank instead of index + 1 */}
                                <span className="lb-current-rank-number">{user.displayRank}</span>
                                <img src={user.img || DefaultAvatar} className='lb-current-profile-avatar' alt={user.name} />
                                <span className="lb-current-user-name">{user.name}</span>
                                <span className="lb-current-user-score">{user.score}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Artwork Voting Rankings Section - Podium Style */}
                <div className="lb-current-leaderboard-section">
                    <h2 className="lb-current-section-title">Most Voted Artworks</h2>
                    <div className="lb-current-artwork-podium">

                        {/* 2nd Place - Left */}
                        <div className={`lb-current-artwork-item lb-current-artwork-second ${getPodiumItem(1).isPlaceholder ? 'placeholder-spot' : ''}`}>
                            <img src={getPodiumItem(1).img} className='lb-current-artwork-image' alt="2nd place" />
                            <span className="lb-current-artwork-votes">{getPodiumItem(1).totalScore} pts</span>
                            {getPodiumItem(1).author ? (
                                <span className="lb-current-artwork-author">by {getPodiumItem(1).author}</span>
                            ) : (
                                <span className="lb-current-artwork-author" style={{ fontStyle: 'italic' }}>Claim this spot!</span>
                            )}
                        </div>

                        {/* 1st Place - Center */}
                        <div className={`lb-current-artwork-item lb-current-artwork-first ${getPodiumItem(0).isPlaceholder ? 'placeholder-spot' : ''}`}>
                            <img src={getPodiumItem(0).img} className='lb-current-artwork-image' alt="1st place" />
                            <span className="lb-current-artwork-votes">{getPodiumItem(0).totalScore} pts</span>
                            {getPodiumItem(0).author ? (
                                <span className="lb-current-artwork-author">by {getPodiumItem(0).author}</span>
                            ) : (
                                <span className="lb-current-artwork-author" style={{ fontStyle: 'italic' }}>Claim this spot!</span>
                            )}
                        </div>

                        {/* 3rd Place - Right */}
                        <div className={`lb-current-artwork-item lb-current-artwork-third ${getPodiumItem(2).isPlaceholder ? 'placeholder-spot' : ''}`}>
                            <img src={getPodiumItem(2).img} className='lb-current-artwork-image' alt="3rd place" />
                            <span className="lb-current-artwork-votes">{getPodiumItem(2).totalScore} pts</span>
                            {getPodiumItem(2).author ? (
                                <span className="lb-current-artwork-author">by {getPodiumItem(2).author}</span>
                            ) : (
                                <span className="lb-current-artwork-author" style={{ fontStyle: 'italic' }}>Claim this spot!</span>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}