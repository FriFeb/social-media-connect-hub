import sighUpRouter from './singup.js';
import loginRouter from './login.js';
import feedRouter from './feed.js';
import userRouter from './users.js';
import chatRouter from './chats.js';
import settingsRouter from './settings.js';

const initRoutes = (app) => {
  app.use('/signup', sighUpRouter);
  app.use('/login', loginRouter);
  app.use('/feed', feedRouter);
  app.use('/users', userRouter);
  app.use('/chats', chatRouter);
  app.use('/settings', settingsRouter);
};

export { initRoutes };
