import React from 'react';
import { ShareIcon, DownloadIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import './GoalCard.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import PropTypes from 'prop-types';

const GoalCard = ({ goal, onEdit, onDelete }) => {
    const handleEdit = () => {
        if (onEdit) onEdit(goal);
    };

    const handleDelete = () => {
        if (onDelete) onDelete();
    };

    const handleShareToNotes = async () => {
        const goalText = `
            SMART Goal
            -----------
            Title: ${goal.title}
            Specific: ${goal.specific}
            Measurable: ${goal.measurable}
            Achievable: ${goal.achievable}
            Relevant: ${goal.relevant}
            Time-bound: ${goal.timebound}
        `;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Success Goal',
                    text: goalText,
                });
                console.log('Shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    };

    const handleDownload = () => {
        const goalText = `
            Success Goal
            -----------
            Title: ${goal.title}
            Specific: ${goal.specific}
            Measurable: ${goal.measurable}
            Achievable: ${goal.achievable}
            Relevant: ${goal.relevant}
            Time-bound: ${goal.timebound}
        `;
        const blob = new Blob([goalText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Success_Goal.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    const dropdownOptions = [
        {
            label: 'Edit',
            icon: <PencilIcon />,
            onClick: handleEdit
        },
        {
            label: 'Share',
            icon: <ShareIcon />,
            onClick: handleShareToNotes
        },
        {
            label: 'Download',
            icon: <DownloadIcon />,
            onClick: handleDownload
        },
        {
            label: 'Delete',
            icon: <TrashIcon />,
            onClick: handleDelete,
            className: 'danger'
        }
    ];

    return (
        <div className="goalcard-container">
            <div className="goalcard-details">
                <h3 className="goalcard-title">Title: {goal.title}</h3>
                <h3>Specific: {goal.specific}</h3>
                <h3>Measurable: {goal.measurable}</h3>
                <h3>Achievable: {goal.achievable}</h3>
                <h3>Relevant: {goal.relevant}</h3>
                <h3>Time-bound: {goal.timebound}</h3>
            </div>
            <div className="goalcard-actions">
                <DropdownMenu 
                    options={dropdownOptions}
                    position="bottom-right"
                    className="goalcard-dropdown"
                />
            </div>
        </div>
    );
};

GoalCard.propTypes = {
    goal: PropTypes.shape({
        title: PropTypes.string.isRequired,
        specific: PropTypes.string.isRequired,
        measurable: PropTypes.string.isRequired,
        achievable: PropTypes.string.isRequired,
        relevant: PropTypes.string.isRequired,
        timebound: PropTypes.string.isRequired,
    }).isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default GoalCard;