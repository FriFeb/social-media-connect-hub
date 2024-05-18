import sighUpRouter from './singup.js';
import loginRouter from './login.js';
import feedRouter from './feed.js';
import chatRouter from './chats.js';
import settingsRouter from './settings.js';
import apiRouter from './api.js';

const initRoutes = (app) => {
  app.use('/signup', sighUpRouter);
  app.use('/login', loginRouter);
  app.use('/feed', feedRouter);
  app.use('/chats', chatRouter);
  app.use('/settings', settingsRouter);
  app.use('/api', apiRouter);
};

export { initRoutes };
