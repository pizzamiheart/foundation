import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const suggestion = JSON.parse(event.body || '');
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('suggestions')
      .insert([
        {
          author_name: suggestion.authorName,
          submitter_twitter: suggestion.submitterTwitter,
          essays: suggestion.essays,
          submitted_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Suggestion submitted successfully', data }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error submitting suggestion' }),
    };
  }
};