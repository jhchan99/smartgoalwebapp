import React from 'react';
import { UserIcon, BellIcon, CalendarIcon } from '@heroicons/react/outline';
import './LoginPromptCard.css';

const LoginPromptCard = ({ goal, onClose, onLogin }) => {
    return (
        <div className="login-prompt-card">
            <div className="login-prompt-header">
                <div className="login-prompt-title">
                    <BellIcon className="login-prompt-icon" />
                    <h3>Set Reminders</h3>
                </div>
            </div>

            <div className="login-prompt-content">
                <div className="login-prompt-hero">
                    <UserIcon className="hero-icon" />
                    <h4>Sign in to unlock premium features</h4>
                    <p>
                        Your goal <strong>"{goal?.title}"</strong> has been saved locally. 
                        Sign in to set reminders and sync with Google Todo!
                    </p>
                </div>

                <div className="feature-list">
                    <div className="feature-item">
                        <CalendarIcon className="feature-icon" />
                        <div>
                            <strong>Smart Reminders</strong>
                            <p>Daily, weekly, and custom reminders</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <BellIcon className="feature-icon" />
                        <div>
                            <strong>Google Todo Integration</strong>
                            <p>Sync your goals with Google Tasks</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <UserIcon className="feature-icon" />
                        <div>
                            <strong>Cloud Sync</strong>
                            <p>Access your goals from any device</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-prompt-actions">
                <button onClick={onClose} className="login-prompt-skip-btn">
                    Skip for now
                </button>
                <button onClick={onLogin} className="login-prompt-signin-btn">
                    Sign In to Continue
                </button>
            </div>
        </div>
    );
};

export default LoginPromptCard;
