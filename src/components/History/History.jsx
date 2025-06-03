import React from 'react';
import GoalCard from '../GoalCard/GoalCard';
import './History.css';

const History = ({ history, onEdit, onDelete }) => {
    return (
        <div className="history-container">
            <div className="history-header">
                <h3 className="history-title">Goal History</h3>
                <div className="history-stats">
                    <small>{history.length} goals saved</small>
                </div>
            </div>
            {history.length === 0 ? (
                <p className="history-empty">No goals saved yet.</p>
            ) : (
                <div className="history-list">
                    {history.map((goal, index) => (
                        <GoalCard
                            key={index}
                            goal={goal}
                            onEdit={() => onEdit({ goal, index })}
                            onDelete={() => onDelete(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
