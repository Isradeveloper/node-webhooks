import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { DiscordService } from '../services/discord.service';

export class GithubController {
  constructor(
    private readonly githubService: GithubService = new GithubService(),
    private readonly discordService: DiscordService = new DiscordService(),
  ) {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.headers['x-github-event'] ?? 'unknown';
    const signature = req.headers['x-hub-signature-256'] ?? 'unknown';
    const payload = req.body;
    let message = '';

    switch (githubEvent) {
      case 'star':
        message = this.githubService.onStar(payload);
        break;
      case 'issues':
        message = this.githubService.onIssues(payload);
        break;
      default:
        message = `Unknown event ${githubEvent}`;
    }

    console.log({ message });

    this.discordService
      .notify(message)
      .then(() => res.status(202).send('Accepted'))
      .catch(() => res.status(500).send('Internal server error'));
  };
}
