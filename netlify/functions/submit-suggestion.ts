import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const suggestion = JSON.parse(event.body || '');
    
    // Since we're using Netlify Forms, we don't need to store the data here
    // The form submission is automatically handled by Netlify
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Suggestion submitted successfully'
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error submitting suggestion' }),
    };
  }
};