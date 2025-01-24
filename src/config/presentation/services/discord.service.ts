import { envs } from '../../envs';

export class DiscordService {
  private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string) {
    const body = {
      content: 'message',
      embeds: [
        {
          image: {
            url: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWVucGZkbzFvdGt3d3Z0c2lsazNlaTltZjF4bTJ3M3lwemp0MHpuNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NytMLKyiaIh6VH9SPm/giphy.gif',
          },
        },
      ],
    };

    const response = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log('Error sending message to discord');
      return false;
    }

    return true;
  }
}
