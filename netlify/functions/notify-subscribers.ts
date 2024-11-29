import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { authorName } = JSON.parse(event.body || '');

    // For now, we'll just return success
    // You can implement email notifications using a service like SendGrid later
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Notification handled successfully'
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing notification' }),
    };
  }
};