import { Essay } from './types';

export const validateForm = (
  authorName: string,
  essays: Essay[],
  submitCount: number,
  lastSubmitTime: number
): { isValid: boolean; message?: string } => {
  const now = Date.now();
  if (submitCount >= 3 && now - lastSubmitTime < 300000) {
    return {
      isValid: false,
      message: 'Please wait a few minutes before submitting again.'
    };
  }

  if (authorName.length < 2 || authorName.length > 100) {
    return {
      isValid: false,
      message: 'Please enter a valid author name'
    };
  }

  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  for (const essay of essays) {
    if (!urlRegex.test(essay.url)) {
      return {
        isValid: false,
        message: 'Please enter valid URLs for all essays'
      };
    }
    if (essay.title.length < 3 || essay.title.length > 200) {
      return {
        isValid: false,
        message: 'Essay titles must be between 3 and 200 characters'
      };
    }
  }

  return { isValid: true };
}