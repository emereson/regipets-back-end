import { db } from './src/db/mysql.js';
import { app } from './src/app.js';
import { PORT } from './config.js';
import { initModel } from './src/db/initModels.js';
import logger from './src/utils/logger.js';

db.authenticate()
  .then(() => {
    logger.info(`Database Synced 💪`);
    app.listen(PORT, () => {
      logger.info(`App Running on Port ${PORT}`);
    });
  })
  .then(() => {
    logger.info(`Database Authenticated! 👍`);
    return initModel();
  })
  .then(() => {
    return db.sync();
  })
  .catch((err) => {
    logger.error('Error connecting to the database:', err);
  });
