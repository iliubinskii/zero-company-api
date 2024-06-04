import { DOCKER_PORT, createApp, lang, logServerInfo, logger } from "../src";

// eslint-disable-next-line github/no-then -- Ok
startServer().catch((err: unknown) => {
  logger.error(lang.FailedToStartServer, err);
});

/**
 * Start the server
 */
async function startServer(): Promise<void> {
  logServerInfo();

  const app = await createApp();

  app.listen(DOCKER_PORT, () => {
    logger.info(`${lang.ServerStartedOnPort} ${DOCKER_PORT}`);
  });
}
