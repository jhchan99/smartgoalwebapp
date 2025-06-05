import React from 'react';
import SidebarButton from '../SidebarButton/SidebarButton';
import './Header.css';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../auth/firebase';
import { useNavigate } from 'react-router-dom';

const Header = ({ sidebarOpen, onSidebarToggle, unviewedCount = 0 }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optionally redirect or show a message
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <SidebarButton
          variant="open"
          onClick={onSidebarToggle}
          showNotificationBadge={!sidebarOpen && unviewedCount > 0}
        />
      </div>
      
      <div className="header-center">
        <p className="app-subtitle">Turn ambition into action — instantly.</p>
      </div>
      
      <div className="header-right">
        {/* Space for future header actions */}
        <div className="header-auth">
          {currentUser ? (
            <div className="user-menu">
              <span className="user-email">{currentUser.email}</span>
              <button onClick={handleSignOut} className="sign-out-btn" aria-label="Sign Out">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={handleSignIn} className="sign-in-btn" aria-label="Sign In">
              Sign In
            </button>
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;
