import React from 'react';
import { BorderlessButton } from '../../components/BorderlessButton';
import './ChallengesPage.css';

export function ChallengesPage() {
    const challenge = {
        title: "10-MinuteSketch",
        description: "The #10-MinuteSketch challenge lets participants create a sketch in just 10 minutes, showcasing creativity, quick thinking, and originality under time pressure.",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        criteriaTags: [
            { name: "Originality" },
            { name: "Impact" },
            { name: "Relevance"  }
        ]
    };

    return (
        <div className="challenges-page">
            {/* Challenge Area */}
            <div className="challenge-main">
                <h1 className="main-title">This Week's Challenge</h1>
                
                <div className="challenge-tag-container">
                    <div className="challenge-tag"># {challenge.title}</div>
                </div>

                <div className="challenge-content">
                    <div className="description-box">
                        <p>
                            {challenge.description}
                        </p>
                    </div>
                    
                    <div className="circles-container">
                        {challenge.criteriaTags.map((tag, index) => (
                            <div key={index} className="info-circle">
                                <span>{tag.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Friends Challenge Area */}
            <div className="friends-challenge-area">
                <h2 className="friends-challenge-text">Your friends have joined the challenge!</h2>
                <BorderlessButton 
                    to="/friends-space" 
                    message="Go to Friends Space" 
                    type="lightbody" 
                />
            </div>
        </div>
    );
}
