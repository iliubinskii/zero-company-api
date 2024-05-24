import { PORT, createApp, lang, logger } from "../src";

const app = createApp();

app.listen(PORT, () => {
  logger.info(`${lang.ServerStartedOnPort} ${PORT}`);
});
