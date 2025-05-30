// Goal validation utilities

// Validation configuration - easy to adjust in the future
export const VALIDATION_RULES = {
    specific: {
        minWords: 5,
        hint: "Try to be more specific - describe exactly what you want to achieve"
    },
    measurable: {
        minWords: 3,
        hint: "Include numbers, quantities, or clear indicators of progress"
    },
    achievable: {
        minWords: 8,
        hint: "Explain your action plan - how will you make this happen?"
    },
    relevant: {
        minWords: 4,
        hint: "Describe why this goal matters to you personally"
    }
};

// Helper function to count words
export const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Helper function to check if field meets validation requirements
export const getFieldValidation = (fieldName, value) => {
    const rule = VALIDATION_RULES[fieldName];
    if (!rule) return { isValid: true, wordCount: 0 };
    
    const wordCount = countWords(value);
    const isValid = wordCount >= rule.minWords || value.trim() === '';
    
    return { 
        isValid, 
        wordCount, 
        minWords: rule.minWords,
        hint: rule.hint,
        showHint: !isValid && value.trim() !== ''
    };
};

// Get validation status for all validated fields
export const getAllFieldValidations = (goalData) => {
    const validations = {};
    Object.keys(VALIDATION_RULES).forEach(fieldName => {
        validations[fieldName] = getFieldValidation(fieldName, goalData[fieldName] || '');
    });
    return validations;
};

// Check if all required validations pass
export const isFormValid = (goalData) => {
    const validations = getAllFieldValidations(goalData);
    return Object.values(validations).every(validation => validation.isValid);
};
