// Simple rule-based title generation
export const generateGoalTitle = (goalData) => {
  const { specific, measurable, relevant, timebound } = goalData;
  
  // Priority order for content extraction
  const contentSources = [
    { field: specific, weight: 3 },
    { field: relevant, weight: 2 },
    { field: measurable, weight: 1 }
  ];
  
  // Find the field with the most meaningful content
  let bestContent = '';
  let maxScore = 0;
  
  contentSources.forEach(({ field, weight }) => {
    if (field && field.trim()) {
      const score = field.trim().length * weight;
      if (score > maxScore) {
        maxScore = score;
        bestContent = field.trim();
      }
    }
  });
  
  if (!bestContent) {
    return 'Untitled Goal';
  }
  
  // Extract a meaningful title (first 5-8 words, or up to first sentence)
  const words = bestContent.split(' ');
  let title = '';
  
  if (words.length <= 8) {
    title = bestContent;
  } else {
    // Take first sentence if it exists and is reasonable length
    const firstSentence = bestContent.split('.')[0];
    if (firstSentence.length <= 60) {
      title = firstSentence;
    } else {
      // Take first 6 words
      title = words.slice(0, 6).join(' ') + '...';
    }
  }
  
  // Capitalize first letter
  title = title.charAt(0).toUpperCase() + title.slice(1);
  
  // Add time context if available
  if (timebound) {
    const date = new Date(timebound);
    const now = new Date();
    const diffMonths = (date.getFullYear() - now.getFullYear()) * 12 + (date.getMonth() - now.getMonth());
    
    if (diffMonths <= 3) {
      title += ' (Short-term)';
    } else if (diffMonths <= 12) {
      title += ' (Medium-term)';
    } else {
      title += ' (Long-term)';
    }
  }
  
  return title;
};

// Check if there's enough content to generate a meaningful title
export const hasEnoughContentForGeneration = (goalData) => {
  const { specific, measurable, relevant } = goalData;
  const minLength = 10; // Minimum characters needed
  
  return (
    (specific && specific.trim().length >= minLength) ||
    (relevant && relevant.trim().length >= minLength) ||
    (measurable && measurable.trim().length >= minLength)
  );
};
