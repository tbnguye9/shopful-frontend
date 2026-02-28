import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Profile.css';

const Profile = ({ basePath = "/" }) => {
    const [user, setUser] = useState({
        name: "John",
        email: "JOHNDOE@gmail.com",
        password: "********",
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleEditProfile = () => {
        if (isEditing) {
            // Save changes
            alert("Profile updated successfully!");
        }
        setIsEditing(!isEditing);
    };

    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmDelete) {
            alert("Account deletion requested.");
        }
    };

    const handleInputChange = (field, value) => {
        setUser(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="profile-container">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-content">
                    <Link to={basePath} className="logo">Shopful</Link>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/favorites" className="nav-link">Favorites</Link>
                        <Link to="/profile" className="nav-link active">Profile</Link>
                    </div>
                </div>
            </nav>

            <div className="profile-main-content">
                {/* Profile Section */}
                <section className="profile-section">
                    <div className="profile-card">
                        <div className="profile-header">
                            <h2 className="profile-title">Profile</h2>
                            <div className="profile-avatar">
                                <div className="avatar-placeholder">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                        </div>

                        <div className="profile-form">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name</label>
                                {isEditing ? (
                                    <input
                                        id="name"
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="form-input"
                                    />
                                ) : (
                                    <div className="form-value">{user.name}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                {isEditing ? (
                                    <input
                                        id="email"
                                        type="email"
                                        value={user.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="form-input"
                                    />
                                ) : (
                                    <div className="form-value">{user.email}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                {isEditing ? (
                                    <input
                                        id="password"
                                        type="password"
                                        value={user.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className="form-input"
                                    />
                                ) : (
                                    <div className="form-value">{user.password}</div>
                                )}
                            </div>

                            <div className="profile-actions">
                                <button
                                    className={`edit-profile-btn ${isEditing ? 'save' : 'edit'}`}
                                    onClick={handleEditProfile}
                                >
                                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                                </button>
                                <button
                                    className="delete-account-btn"
                                    onClick={handleDeleteAccount}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ad Banner */}
                <section className="profile-ad-section">
                    <div className="ad-banner">
                        <div className="ad-content">
                            <div className="ad-badge">BEST OFFER</div>
                            <h2 className="ad-title">BLACK FRIDAY</h2>
                            <p className="ad-subtitle">EXCLUSIVE DEALS FOR YOU</p>
                            <button className="ad-cta">SHOP NOW</button>
                        </div>
                        <div className="ad-image">
                            <div className="placeholder-ad">SPECIAL OFFER</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;