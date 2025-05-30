// Goal form utility functions
import Goal from '../models/Goal';

// Share goal to native share API
export const shareGoal = async (goalData, title) => {
    const goalToShare = { ...goalData, title };
    const goalText = new Goal(goalToShare).toFormattedText();
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'My Success Goal',
                text: goalText,
            });
            console.log('Shared successfully!');
            return true;
        } catch (error) {
            console.error('Error sharing:', error);
            return false;
        }
    } else {
        alert('Web Share API is not supported in your browser.');
        return false;
    }
};

// Download goal as text file
export const downloadGoal = (goalData, title) => {
    const goalToDownload = { ...goalData, title };
    const goalText = new Goal(goalToDownload).toFormattedText();
    
    const blob = new Blob([goalText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Success_Goal.txt';
    link.click();
    URL.revokeObjectURL(url);
};

// Create empty goal data structure
export const createEmptyGoal = () => ({
    title: '',
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timebound: '',
});

// Check if goal has any content
export const hasGoalContent = (goalData) => {
    return Object.values(goalData).some(value => value && value.trim() !== '');
}; 