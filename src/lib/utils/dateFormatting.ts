export const formatDateEST = (date: Date = new Date()): string => {
    // Create date in UTC
    const utcDate = new Date(date.toUTCString());
    
    // Convert to EST (UTC-5)
    utcDate.setHours(utcDate.getHours() - 5);
    
    return utcDate.toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };