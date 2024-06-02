export const authenticateUser = (req, res, next) => {
  const userId = req.cookies.user_id;

  if (!userId) {
    res.render('errors/401');
  }

  res.userId = userId;

  next();
};
