'use server';
import { sendContactNotification } from './discord';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function logContactUs(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate input
    if (!data.name || !data.email || !data.message) {
      return { success: false, message: 'All fields are required' };
    }

    // Send notification to Discord
    const sent = await sendContactNotification(data);

    if (sent) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      return { success: false, message: 'Failed to send message. Please try again.' };
    }
  } catch (error) {
    console.error('Error in logContactUs:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}