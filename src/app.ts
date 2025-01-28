import express from 'express';
import { envs } from './config';
import { GithubController } from './config/presentation/github';
import { GithubSha256Middleware } from './config/presentation/middlewares/github-sha256.middleware';

(() => {
  main();
})();

function main() {
  const app = express();

  app.use(express.json());

  app.use(GithubSha256Middleware.verifyGithubSignature);

  const githubController = new GithubController();

  app.get('/', (req, res) => {
    res.json({
      ok: true,
      message: 'Server is running',
    });
  });

  app.post('/api/github', githubController.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });
}
