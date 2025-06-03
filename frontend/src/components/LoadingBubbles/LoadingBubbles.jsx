import React from 'react';
import { HashLoader } from 'react-spinners';

const LoadingBubbles = ({ show }) => {
  if (!show) return null;

  return (
    <div className="loading-container">
      <span className="loading-text">Generating title</span>
      <HashLoader
        color="#6b7280"
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.8}
      />
    </div>
  );
};

export default LoadingBubbles;