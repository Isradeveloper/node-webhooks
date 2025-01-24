import { get } from 'env-var';

process.loadEnvFile();

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DISCORD_WEBHOOK_URL: get('DISCORD_WEBHOOK_URL').required().asString(),
};
