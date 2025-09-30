import winston from "winston";
import SlackHook from "winston-slack-webhook-transport";

const makeSlackTransport = (url: string, prefix: string, level: string) =>
  new SlackHook({
    webhookUrl: url,
    level,
    emitAxiosErrors: true,
    formatter: (info) => ({
      text: `${prefix} ${info.message}`,
    }),
  });

export const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console(),
    makeSlackTransport(process.env.SLACK_ERRORS_WEBHOOK!, "", "error"),
    makeSlackTransport(process.env.SLACK_UPDATES_WEBHOOK!, "", "info")
  ],
});
