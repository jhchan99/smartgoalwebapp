import React, { useState, useEffect } from 'react';
import { BellIcon, CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import './ReminderCard.css';

const ReminderCard = ({ show, goal, onClose, onReminderSet }) => {
    const [isSliding, setIsSliding] = useState(false);
    const [reminders, setReminders] = useState({
        daily: false,
        weekly: false,
        milestone: false,
        deadline: false,
        customDates: []
    });

    const [dailyTime, setDailyTime] = useState('09:00');
    const [weeklyDay, setWeeklyDay] = useState('monday');
    const [customDate, setCustomDate] = useState('');

    useEffect(() => {
        if (show) {
            setIsSliding(true);
        }
        return () => {
            setIsSliding(false);
        };
    }, [show]);

    const handleClose = () => {
        onClose();
    };

    const handleReminderToggle = (type) => {
        setReminders(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const addCustomDate = () => {
        if (customDate && !reminders.customDates.includes(customDate)) {
            setReminders(prev => ({
                ...prev,
                customDates: [...prev.customDates, customDate]
            }));
            setCustomDate('');
        }
    };

    const removeCustomDate = (dateToRemove) => {
        setReminders(prev => ({
            ...prev,
            customDates: prev.customDates.filter(date => date !== dateToRemove)
        }));
    };

    const handleSetReminders = () => {
        const reminderData = {
            ...reminders,
            dailyTime,
            weeklyDay,
            goal: goal
        };
        
        onReminderSet(reminderData);
    };

    const hasAnyReminder = Object.values(reminders).some(val => 
        Array.isArray(val) ? val.length > 0 : val
    );




    return (
        <div className={`reminder-card-overlay ${isSliding ? 'show' : ''}`}>
            <div className={`reminder-card ${isSliding ? 'slide-in' : 'slide-out'}`}>
                <div className="reminder-card-header">
                    <div className="reminder-card-title">
                        <BellIcon className="reminder-icon" />
                        <h3>Set Reminders</h3>
                    </div>
                    {/* do not add a close button */}
                </div>

                <div className="reminder-card-content">
                    <p className="reminder-subtitle">
                        Stay on track with your goal: <strong>"{goal?.title}"</strong>
                    </p>

                    <div className="reminder-options">
                        {/* Daily Reminder */}
                        <div className="reminder-option">
                            <label className="reminder-checkbox">
                                <input
                                    type="checkbox"
                                    checked={reminders.daily}
                                    onChange={() => handleReminderToggle('daily')}
                                />
                                <span className="checkmark"></span>
                                <div className="reminder-label">
                                    <ClockIcon className="option-icon" />
                                    <span>Daily reminder</span>
                                </div>
                            </label>
                            {reminders.daily && (
                                <input
                                    type="time"
                                    value={dailyTime}
                                    onChange={(e) => setDailyTime(e.target.value)}
                                    className="time-input"
                                />
                            )}
                        </div>

                        {/* Weekly Reminder */}
                        <div className="reminder-option">
                            <label className="reminder-checkbox">
                                <input
                                    type="checkbox"
                                    checked={reminders.weekly}
                                    onChange={() => handleReminderToggle('weekly')}
                                />
                                <span className="checkmark"></span>
                                <div className="reminder-label">
                                    <CalendarIcon className="option-icon" />
                                    <span>Weekly check-in</span>
                                </div>
                            </label>
                            {reminders.weekly && (
                                <select
                                    value={weeklyDay}
                                    onChange={(e) => setWeeklyDay(e.target.value)}
                                    className="day-select"
                                >
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                </select>
                            )}
                        </div>

                        {/* Milestone Reminder */}
                        <div className="reminder-option">
                            <label className="reminder-checkbox">
                                <input
                                    type="checkbox"
                                    checked={reminders.milestone}
                                    onChange={() => handleReminderToggle('milestone')}
                                />
                                <span className="checkmark"></span>
                                <div className="reminder-label">
                                    <span>Milestone check (halfway to deadline)</span>
                                </div>
                            </label>
                        </div>

                        {/* Deadline Reminder */}
                        <div className="reminder-option">
                            <label className="reminder-checkbox">
                                <input
                                    type="checkbox"
                                    checked={reminders.deadline}
                                    onChange={() => handleReminderToggle('deadline')}
                                />
                                <span className="checkmark"></span>
                                <div className="reminder-label">
                                    <span>Deadline reminder (day before)</span>
                                </div>
                            </label>
                        </div>

                        {/* Custom Dates */}
                        <div className="reminder-option">
                            <div className="custom-dates-section">
                                <label>Custom reminder dates:</label>
                                <div className="custom-date-input">
                                    <input
                                        type="date"
                                        value={customDate}
                                        onChange={(e) => setCustomDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="date-input"
                                    />
                                    <button onClick={addCustomDate} className="add-date-btn">
                                        Add
                                    </button>
                                </div>
                                {reminders.customDates.length > 0 && (
                                    <div className="custom-dates-list">
                                        {reminders.customDates.map((date, index) => (
                                            <span key={index} className="custom-date-tag">
                                                {new Date(date).toLocaleDateString()}
                                                <button
                                                    onClick={() => removeCustomDate(date)}
                                                    className="remove-date-btn"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reminder-card-actions">
                    <button onClick={handleClose} className="reminder-skip-btn">
                        Skip for now
                    </button>
                    <button
                        onClick={handleSetReminders}
                        className="reminder-set-btn"
                        disabled={!hasAnyReminder}
                    >
                        Set Reminders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReminderCard; 