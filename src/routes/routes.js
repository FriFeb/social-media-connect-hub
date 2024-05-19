import sighUpRouter from './singup.js';
import loginRouter from './login.js';
import feedRouter from './feed.js';
import chatRouter from './chats.js';
import settingsRouter from './settings.js';
import userRouter from './user.js';

const initRoutes = (app) => {
  app.use('/signup', sighUpRouter);
  app.use('/login', loginRouter);
  app.use('/feed', feedRouter);
  app.use('/chats', chatRouter);
  app.use('/settings', settingsRouter);
  app.use('/user', userRouter);
  app.get('/', (req, res) => {
    res.redirect('/feed');
  });
};

export { initRoutes };
