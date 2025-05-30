import React, { useState } from 'react';
import { PencilIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
import LoadingBubbles from './LoadingBubbles';

const GeneratedTitleDisplay = ({ 
  generatedTitle, 
  customTitle, 
  isGenerating, 
  onTitleEdit, 
  hasContent 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const displayTitle = customTitle || generatedTitle || '';
  const isCustom = !!customTitle;
  const showPlaceholder = !hasContent && !generatedTitle && !customTitle;

  const handleEdit = () => {
    setEditValue(displayTitle);
    setIsEditing(true);
  };

  const handleSave = () => {
    onTitleEdit(editValue.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue('');
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isGenerating) {
    return (
      <div className="generated-title-container">
        <LoadingBubbles show={true} />
      </div>
    );
  }

  return (
    <div className="generated-title-container">
      <div className="title-section">
        {isEditing ? (
          <div className="title-edit-mode">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="title-edit-input"
              autoFocus
              placeholder="Enter goal title..."
            />
            <div className="title-edit-actions">
              <button onClick={handleSave} className="title-action-btn save">
                <CheckIcon className="title-action-icon" />
              </button>
              <button onClick={handleCancel} className="title-action-btn cancel">
                <XIcon className="title-action-icon" />
              </button>
            </div>
          </div>
        ) : (
          <div className="title-display-mode">
            <h3 className={`generated-title ${showPlaceholder ? 'placeholder' : ''} ${isCustom ? 'custom' : ''}`}>
              {displayTitle}
            </h3>
            {!showPlaceholder && (
              <button onClick={handleEdit} className="title-edit-btn" title="Edit title">
                <PencilIcon className="title-edit-icon" />
              </button>
            )}
          </div>
        )}
      </div>
      
      {isCustom && (
        <div className="title-status">
          <span className="custom-title-indicator">Custom title</span>
        </div>
      )}
    </div>
  );
};

export default GeneratedTitleDisplay;
