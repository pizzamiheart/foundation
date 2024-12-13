import { User, sendEmailVerification } from 'firebase/auth';

export const sendVerificationEmail = async (user: User): Promise<void> => {
  try {
    await sendEmailVerification(user);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

export const checkEmailVerification = async (user: User): Promise<boolean> => {
  try {
    await user.reload(); // Refresh the user to get the latest emailVerified status
    return user.emailVerified;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
};