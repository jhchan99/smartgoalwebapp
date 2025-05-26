import React, {useState, useEffect} from 'react';
import './GoalsForm.css';

const GoalsForm = ({history, setHistory, editingGoal, setEditingGoal}) => {

    const [goalData, setGoalData] = useState({
        title: '',
        specific: '',
        measurable: '',
        achievable: '',
        relevant: '',
        timebound: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    // When editingGoal changes, load it into the form
    useEffect(() => {
        if (editingGoal) {
            setGoalData(editingGoal.goal);
            setIsEditing(true);
            setEditingIndex(editingGoal.index);
        }
    }, [editingGoal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (isEditing && editingIndex !== null) {
            // Update existing goal
            const updatedHistory = [...history];
            updatedHistory[editingIndex] = { ...goalData, dateSaved: new Date().toLocaleString() };
            setHistory(updatedHistory);
            setIsEditing(false);
            setEditingIndex(null);
            setEditingGoal(null);
        } else {
            // Add new goal
            setHistory([{ ...goalData, dateSaved: new Date().toLocaleString() }, ...history]);
        }
        setGoalData({
            title: '',
            specific: '',
            measurable: '',
            achievable: '',
            relevant: '',
            timebound: '',
        });
    };

    return (
        <div className="goalsform-container">
            <h2 className="goalsform-title">Make your Goal</h2>

            <div className="goalsform-field">
                <label htmlFor="title" className="goalsform-label">Name it</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="goalsform-input"
                    placeholder="Give a name to your goal"
                    value={goalData.title}
                    onChange={handleChange}
                />
            </div>
            <div className="goalsform-field">
                <label htmlFor="specific" className="goalsform-label">Be specific</label>
                <input
                    type="text"
                    id="specific"
                    name="specific"
                    className="goalsform-input"
                    placeholder="What do you want to achieve?"
                    value={goalData.specific}
                    onChange={handleChange}
                />
            </div>
            <div className="goalsform-field">
                <label htmlFor="measurable" className="goalsform-label">Make it measurable</label>
                <input
                    type="text"
                    id="measurable"
                    name="measurable"
                    className="goalsform-input"
                    placeholder="How will you measure your progress?"
                    value={goalData.measurable}
                    onChange={handleChange}
                />
            </div>
            <div className="goalsform-field">
                <label htmlFor="achievable" className="goalsform-label">Make sure it's achievable</label>
                <textarea
                    id="achievable"
                    name="achievable"
                    className="goalsform-textarea"
                    placeholder="How will you achieve this goal?"
                    value={goalData.achievable}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="goalsform-field">
                <label htmlFor="relevant" className="goalsform-label">Make it relevant</label>
                <input
                    type="text"
                    id="relevant"
                    name="relevant"
                    className="goalsform-input"
                    placeholder="Why is this goal relevant to you?"
                    value={goalData.relevant}
                    onChange={handleChange}
                />
            </div>
            <div className="goalsform-field">
                <label htmlFor="timebound" className="goalsform-label">Keep it time-bound</label>
                <input
                    type="date"
                    id="timebound"
                    name="timebound"
                    className="goalsform-input"
                    value={goalData.timebound}
                    onChange={handleChange}
                />
            </div>
            <div className="goalsform-actions">
                <button
                    onClick={handleSave}
                    className="goalsform-save-btn"
                >
                    {isEditing ? "Update Goal" : "Save Goal"}
                </button>
            </div>
        </div>
    );
};

export default GoalsForm;
