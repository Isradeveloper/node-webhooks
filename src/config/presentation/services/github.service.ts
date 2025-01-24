import { GithubStarPayload, GithubIssuesPayload } from '../../../interfaces';

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload): string {
    let message = '';

    const { action, sender, repository } = payload;

    message = `User ${sender.login} - ${action} star on ${repository.full_name}`;

    return message;
  }

  onIssues(payload: GithubIssuesPayload): string {
    const { action, issue, repository, sender } = payload;

    if (action === 'opened') {
      return `[Issue Created] ${sender.login} created issue "${issue.title}" in ${repository.full_name}`;
    }

    if (action === 'closed') {
      return `[Issue Closed] ${sender.login} closed issue "${issue.title}" in ${repository.full_name}`;
    }

    if (action === 'reopened') {
      return `[Issue Reopened] ${sender.login} reopened issue "${issue.title}" in ${repository.full_name}`;
    }

    return `Unhandled action for the issue event ${action}`;
  }
}
