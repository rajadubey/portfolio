'use server';
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';

export interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number;
  fields?: DiscordEmbedField[];
  timestamp?: string;
  footer?: {
    text: string;
  };
}

export interface DiscordWebhookPayload {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: DiscordEmbed[];
}

export async function sendDiscordWebhook(payload: DiscordWebhookPayload): Promise<boolean> {
  if (!DISCORD_WEBHOOK_URL) {
    console.error('Discord webhook URL is not configured');
    return false;
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Failed to send Discord webhook:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Discord webhook:', error);
    return false;
  }
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const embed: DiscordEmbed = {
    title: '📬 New Contact Form Submission',
    color: 0x5865f2,
    fields: [
      {
        name: 'Name',
        value: data.name,
        inline: true,
      },
      {
        name: 'Email',
        value: data.email,
        inline: true,
      },
      {
        name: 'Message',
        value: data.message,
      },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'Portfolio Contact Form',
    },
  };

  return sendDiscordWebhook({ embeds: [embed] });
}

export async function sendResumeDownloadNotification(data: {
  userAgent?: string;
  ip?: string;
}): Promise<boolean> {
  const embed: DiscordEmbed = {
    title: '📄 Resume Downloaded',
    color: 0x57f287,
    fields: [
      {
        name: 'User Agent',
        value: data.userAgent || 'Unknown',
      },
      {
        name: 'IP Address',
        value: data.ip || 'Unknown',
      },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'Portfolio Resume Download',
    },
  };

  return sendDiscordWebhook({ embeds: [embed] });
}

