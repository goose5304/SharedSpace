import React, { useState, useEffect } from 'react';
import SampleImg from '../../assets/arts/ukiyo.jpg';
import SampleImg2 from '../../assets/arts/almondtree.jpg';
import './ModDashboardPage.css';
import API_BASE_URL from '../../apiConfig';
import { SuccessPopup } from '../../components/SuccessPopup';

export function ModDashboardPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Challenge Form State
  const [challengeForm, setChallengeForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    criteriaTags: []
  });
  const [newTag, setNewTag] = useState({ name: '', points: 1 });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Fetch users
        const usersResponse = await fetch(`${API_BASE_URL}/api/users/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const formattedUsers = usersData.users
            .filter(user => user.userType !== 'admin')
            .map(user => ({
              id: user._id,
              username: user.username,
              email: user.email,
              type: 'User',
              date: new Date(parseInt(user._id.substring(0, 8), 16) * 1000).toISOString().split('T')[0]
            }));
          setUsers(formattedUsers);
        }

        // Fetch reports
        const reportsResponse = await fetch(`${API_BASE_URL}/api/reports/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (reportsResponse.ok) {
          const reportsData = await reportsResponse.json();
          const formattedReports = reportsData.map(report => ({
            id: report._id,
            preview: report.artworkID?.imageURL || SampleImg,
            reason: report.reason,
            date: new Date(parseInt(report._id.substring(0, 8), 16) * 1000).toISOString().split('T')[0]
          }));
          setReports(formattedReports);
        }

        // Fetch challenges
        const challengesResponse = await fetch(`${API_BASE_URL}/api/challenges/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (challengesResponse.ok) {
          const challengesData = await challengesResponse.json();
          setChallenges(challengesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTag = () => {
    if (newTag.name) {
      setChallengeForm({
        ...challengeForm,
        criteriaTags: [...challengeForm.criteriaTags, newTag]
      });
      setNewTag({ name: '', points: 1 });
    }
  };

  const codeRemoveTag = (index) => {
    const updatedTags = challengeForm.criteriaTags.filter((_, i) => i !== index);
    setChallengeForm({ ...challengeForm, criteriaTags: updatedTags });
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/api/challenges/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(challengeForm)
      });

      if (response.ok) {
        setSuccessMessage('Challenge created successfully!');
        setShowSuccessPopup(true);
        setChallengeForm({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          criteriaTags: []
        });
        // Refresh challenges list
        const challengesResponse = await fetch(`${API_BASE_URL}/api/challenges/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (challengesResponse.ok) {
          const challengesData = await challengesResponse.json();
          setChallenges(challengesData);
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to create challenge: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('Error creating challenge');
    }
  };

  return (
    <div className="mod-dashboard-page">
      <div className="mod-layout">
        <div className="mod-sidebar">
          <div className="card-shadow sidebar-panel">
            <div className="panel-header">Panel</div>
            <button
              className={`mod-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`mod-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
            <button
              className={`mod-nav-btn ${activeTab === 'challenges' ? 'active' : ''}`}
              onClick={() => setActiveTab('challenges')}
            >
              Challenges
            </button>
          </div>
        </div>

        <div className="mod-main">
          <div className="card-shadow content-card">
            {loading ? (
              <div>Loading...</div>
            ) : activeTab === 'users' ? (
              <>
                {/* Users header */}
                <div className="table-header">
                  <span>Username</span>
                  <span>Email</span>
                  <span>Account Type</span>
                  <span>Creation Date</span>
                  <span>Action</span>
                </div>

                {/* Users body */}
                <div className="table-body">
                  {users.map(user => (
                    <div key={user.id} className="table-row">
                      <span>{user.username}</span>
                      <span>{user.email}</span>
                      <span>{user.type}</span>
                      <span>{user.date}</span>

                      {/* Dropdown */}
                      <select className="action-select">
                        <option value="">Select</option>
                        <option value="ban">Ban User</option>
                        <option value="delete">Ignore</option>
                      </select>

                    </div>
                  ))}
                </div>
              </>
            ) : activeTab === 'reports' ? (
              <>
                {/* Moderating posts */}
                {/* Posts Header */}
                <div className="table-header">
                  <span>Report ID</span>
                  <span>Preview</span>
                  <span>Reason</span>
                  <span>Posted Date</span>
                  <span>Action</span>
                </div>

                {/* Posts Body */}
                <div className="table-body">
                  {reports.map(report => (
                    <div key={report.id} className="table-row">
                      <span>{report.id}</span>
                      <div className="preview-container">
                        <img src={report.preview} alt="Report Preview" className="report-preview-img" />
                      </div>
                      <span>{report.reason}</span>
                      <span>{report.date}</span>

                      {/* Dropdown */}
                      <select className="action-select">
                        <option value="">Select</option>
                        <option value="ignore">Remove Content</option>
                        <option value="remove">Ban User</option>
                        <option value="ban">Ignore</option>
                      </select>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="challenges-tab">
                <h2>Create New Challenge</h2>
                <form onSubmit={handleCreateChallenge} className="challenge-form">
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={challengeForm.title}
                      onChange={(e) => setChallengeForm({ ...challengeForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      value={challengeForm.description}
                      onChange={(e) => setChallengeForm({ ...challengeForm, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Start Date:</label>
                      <input
                        type="date"
                        value={challengeForm.startDate}
                        onChange={(e) => setChallengeForm({ ...challengeForm, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>End Date:</label>
                      <input
                        type="date"
                        value={challengeForm.endDate}
                        onChange={(e) => setChallengeForm({ ...challengeForm, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Criteria Tags:</label>
                    <div className="tag-input-row">
                      <input
                        type="text"
                        placeholder="Tag Name"
                        value={newTag.name}
                        onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                      />
                      <input
                        type="number"
                        placeholder="Points"
                        value={newTag.points}
                        onChange={(e) => setNewTag({ ...newTag, points: parseInt(e.target.value) })}
                        style={{ width: '80px' }}
                      />
                      <button type="button" onClick={handleAddTag} className="add-tag-btn">Add Tag</button>
                    </div>
                    <div className="tags-list">
                      {challengeForm.criteriaTags.map((tag, index) => (
                        <span key={index} className="tag-item">
                          {tag.name} ({tag.points} pts)
                          <button type="button" onClick={() => codeRemoveTag(index)} className="remove-tag-btn">x</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="create-challenge-btn">Create Challenge</button>
                </form>

                <h2>Existing Challenges</h2>
                <div className="challenges-list">
                  <div className="table-header">
                    <span>Title</span>
                    <span>Start Date</span>
                    <span>End Date</span>
                  </div>
                  <div className="table-body">
                    {challenges.map(challenge => (
                      <div key={challenge._id} className="table-row">
                        <span>{challenge.title}</span>
                        <span>{new Date(challenge.startDate).toLocaleDateString()}</span>
                        <span>{new Date(challenge.endDate).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showSuccessPopup && <SuccessPopup message={successMessage} onClose={() => setShowSuccessPopup(false)} />}
    </div>
  );
}
