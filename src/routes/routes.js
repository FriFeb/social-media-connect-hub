// import './model/database-connection.js';
import userRouter from './users.js';

const initRoutes = (app) => {
  // app.use('/messages', messageRouter);

  app.use('/users', userRouter);
};

export { initRoutes };
