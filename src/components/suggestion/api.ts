import { FormData } from './types';

export const submitSuggestion = async (formData: FormData): Promise<Response> => {
  const response = await fetch('/.netlify/functions/submit-suggestion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    throw new Error('Submission failed');
  }

  return response;
}