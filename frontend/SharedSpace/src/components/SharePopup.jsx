import './SharePopup.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BorderedButton } from './BorderedButton';
import API_BASE_URL from '../apiConfig';

export function SharePopup({ trigger, setTrigger }) {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [artworkTitle, setArtworkTitle] = useState(''); // Initialize empty
    const [isPublic, setIsPublic] = useState(true);
    const [challenges, setChallenges] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState('');
    const [description, setDescription] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    // Fetch Active Challenges from Backend
    useEffect(() => {
        if (trigger) {
            const fetchChallenges = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`${API_BASE_URL}/api/challenges/active`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log("Active challenges in Frontend:", data);

                        // Since it's now an array, we can set it directly
                        setChallenges(Array.isArray(data) ? data : [data]);
                    } else {
                        setChallenges([]); // Clear if none found
                    }
                } catch (error) {
                    console.error("Error fetching challenges:", error);
                }
            };
            fetchChallenges();
        }
    }, [trigger]);

    if (!trigger) return null;

    const handleClose = () => {
        if (isUploading) return;
        setTrigger(false);
        setFiles([]);
        setArtworkTitle('');
        setDescription('');
        setIsPublic(true);
        setSelectedChallenge('');
        setUploadProgress('');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        setIsUploading(true);
        const totalFiles = files.length;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                setUploadProgress(`Uploading ${i + 1} of ${totalFiles}: ${file.name}`);

                // 1. Upload to Cloudinary
                const formData = new FormData();
                formData.append('file', file);

                const uploadResponse = await fetch(`${API_BASE_URL}/api/artworks/upload`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData,
                });

                if (!uploadResponse.ok) continue;
                const uploadData = await uploadResponse.json();

                // 🛡️ 2. DECIDE ENDPOINT: Casual Post vs Challenge Submission
                // If selectedChallenge exists, use the challenge submit API
                const endpoint = selectedChallenge
                    ? `${API_BASE_URL}/api/challenges/submit`
                    : `${API_BASE_URL}/api/artworks/create/`;

                setUploadProgress(`Submitting ${file.name}...`);

                await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: totalFiles > 1 ? `${artworkTitle} (${i + 1})` : artworkTitle,
                        description: description,
                        imageURL: uploadData.imageURL,
                        privacy: selectedChallenge ? 'public' : (isPublic ? 'public' : 'private'),
                        challengeId: selectedChallenge || null, // 🛡️ Important for the submit API
                        tags: []
                    }),
                });

            } catch (error) {
                console.error('Error sharing file:', error);
            }
        }

        setIsUploading(false);
        handleClose();
        navigate('/home-posted');
    };

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        if (selectedFiles.length > 0 && !artworkTitle) {
            setArtworkTitle(selectedFiles[0].name.replace(/\.[^/.]+$/, ""));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);

        if (droppedFiles.length === 1) {
            setArtworkTitle(droppedFiles[0].name.replace(/\.[^/.]+$/, ""));
        }
    };

    const handleBrowseClick = () => {
        document.getElementById('file-input').click();
    };

    return (
        <div className="share-popup-overlay" onClick={handleClose}>
            <div className="share-popup-content" onClick={(e) => e.stopPropagation()}>

                <div className="popup-header">
                    <h2 className="popup-title">Upload Files</h2>
                </div>

                <form onSubmit={handleSave} className="popup-form">
                    <div className="upload-section">
                        <div
                            className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleBrowseClick}
                        >
                            <p className="upload-text">Drag and drop files here</p>
                            <p className="upload-subtext">or</p>
                            <p className="upload-subtext">Browse to upload files</p>

                            <input
                                id="file-input"
                                type="file"
                                className="file-input"
                                multiple
                                accept="image/*"
                                onChange={handleFileSelect}
                            />
                        </div>

                        {files.length > 0 && (
                            <div className="file-preview">
                                {files.map((file, index) => (
                                    <div key={index} className="file-chip">
                                        <span>{file.name}</span>
                                        <button type="button" className="remove-file" onClick={() => setFiles(files.filter((_, i) => i !== index))}>×</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="details-section">
                        <div className="form-group">
                            <label className="form-label">Artwork Title</label>
                            <input
                                type="text"
                                className="form-input"
                                value={artworkTitle}
                                onChange={(e) => setArtworkTitle(e.target.value)}
                                placeholder="Give your art a name..."
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Join Challenge</label>
                            <select
                                className="form-input"
                                value={selectedChallenge}
                                onChange={(e) => setSelectedChallenge(e.target.value)}
                            >
                                <option value="">No Challenge (Casual Post)</option>
                                {challenges.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {/* 🛡️ Fixed: Use c.title instead of c.challengeName */}
                                        🏆 {c.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Privacy</label>
                            <div className="toggle-label" onClick={() => setIsPublic(!isPublic)}>
                                <div className={`toggle-switch ${isPublic ? 'active' : ''}`}>
                                    <div className={`toggle-slider ${isPublic ? 'active' : ''}`}></div>
                                </div>
                                <span className="toggle-text">{isPublic ? 'Public' : 'Private'}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell us about your art..."
                            />
                        </div>

                        {uploadProgress && <div className="upload-progress-message">{uploadProgress}</div>}

                        <div className="popup-actions">
                            <BorderedButton
                                message={isUploading ? 'Uploading...' : 'Post Artwork'}
                                size='pink'
                                type="submit"
                            />
                            <BorderedButton message='Cancel' size='purple' onClick={handleClose} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}