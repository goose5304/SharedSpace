import React, { useState } from 'react';
import { ArtPopup } from '../../components/ArtPopup';
import { BorderedButton } from '../../components/BorderedButton';
import SampleImg from '../../assets/SharedSpaceLogo.svg';
import SampleImg2 from '../../assets/react.svg';
import './ProfilePage.css';


export function ProfilePage() {
  const user = {
    _id: "u123456789",
    username: "Feesha",
    email: "artist@example.com",
    password: "hashed_password_secure",
    bio: "GRAHHHHHHHHHHHHgrahrggrgrhrhrh",
    avatar: SampleImg,
    posts: [
      { img: SampleImg, date: "1/1/2026", description: "My first post!" },
      { img: SampleImg2, date: "1/5/2026", description: "React logo art" },
      { img: SampleImg, date: "1/10/2026", description: "Another masterpiece" },
      { img: SampleImg2, date: "1/15/2026", description: "Work in progress" },
      { img: SampleImg, date: "1/20/2026", description: "Final piece" },
      { img: SampleImg2, date: "1/25/2026", description: "Sketching" },
    ],
    achievements: [
      { id: 1, icon: "🎨", title: "Creative Spirit", desc: "Posted 10+ artworks" },
      { id: 2, icon: "🔥", title: "On Fire", desc: "7 day streak" },
      { id: 3, icon: "🏆", title: "Top Rated", desc: "Featured in weekly top" },
    ],
    friends: [
      { id: 1, name: "Alex", avatar: SampleImg2 },
      { id: 2, name: "Jordan", avatar: SampleImg },
      { id: 3, name: "Casey", avatar: SampleImg2 },
      { id: 4, name: "Taylor", avatar: SampleImg },
    ]
  };

  const [activeArt, setActiveArt] = useState(null);

  return (
    <div className="profile-page">
      <ArtPopup
        trigger={activeArt != null}
        setTrigger={() => setActiveArt(null)}
        img={activeArt?.img}
        date={activeArt?.date}
        desc={activeArt?.description}
      />

      <div className="profile-header">
        <div className="profile-info-container">
          <div className="profile-avatar">
            <img src={user.avatar} alt={user.username} />
          </div>
          
          <div className="profile-details">
            <div className="profile-names">
              <h1>{user.username}</h1>
              <BorderedButton to="/settings" message="Edit Profile" size="purple" />
            </div>

            <p className="profile-bio">{user.bio}</p>
          </div>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-main">
            <div className="sidebar-card">
             <h2 className="sidebar-title">Recent Posts</h2>
              <div className="posts-grid">

            {user.posts.map((post, index) => (
              <div 
                key={index} 
                className="post-card"
                onClick={() => setActiveArt(post)}
              >
                <img src={post.img} alt={post.description} />
              </div>
            ))}
          </div>
        </div>
        </div>

        <div className="profile-sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-title">Achievements</h3>
                <div className="achievements-list">
                {user.achievements.map((ach) => (
                    <span key={ach.id} className="achievement-icon">
                    {ach.icon}
                    </span>
                ))}
                </div>
          </div>

          <div className="sidebar-card">
            <h3 className="sidebar-title">Friends</h3>
            <div className="friends-grid">
              {user.friends.map((friend) => (
                <div key={friend.id} className="friend-item">
                  <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                  <span className="friend-name">{friend.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}