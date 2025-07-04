import sighUpRouter from './singup.js';
import loginRouter from './login.js';
import logoutRouter from './logout.js';
import homeRouter from './home.js';
import chatRouter from './chats.js';
import settingsRouter from './settings.js';
import userRouter from './user.js';
import contactRouter from './contact.js';
import apiRouter from './api.js';

const initRoutes = (app) => {
  app.use('/signup', sighUpRouter);
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/home', homeRouter);
  app.use('/chats', chatRouter);
  app.use('/settings', settingsRouter);
  app.use('/user', userRouter);
  app.use('/contact', contactRouter);
  app.use('/api', apiRouter);
  app.get('/', (req, res) => {
    res.redirect('/home');
  });
  app.use((req, res) => {
    res.status(404).render('errors/404');
  });
};

export { initRoutes };
