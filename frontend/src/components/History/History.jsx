import React from 'react';
import GoalCard from '../GoalCard/GoalCard';
import './History.css';

const History = ({ history, onEdit, onDelete, loading }) => {
    const handleDelete = (goal, index) => {
        // Pass both the goal object and index to handle both authenticated and non-authenticated users
        if (goal.id) {
            // For authenticated users - pass the Firestore document ID
            onDelete(goal.id, index);
        } else {
            // For anonymous users - pass null as goalId and use index
            onDelete(null, index);
        }
    };

    const handleEdit = (goal, index) => {
        onEdit({ goal, index });
    };

    if (loading) {
        return (
            <div className="history-container">
                <div className="history-header">
                    <h3 className="history-title">Goal History</h3>
                </div>
                <p className="history-loading">Loading your goals...</p>
            </div>
        );
    }

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
                            key={goal.id || index}
                            goal={goal}
                            onEdit={() => handleEdit(goal, index)}
                            onDelete={() => handleDelete(goal, index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
