import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  // render the page
  // if user is logged in
  //  show all the stuff
  // else
  //  show only feed in sidebar
  //  and a proposal to signup or login
  res.render('sidebar');
});

export default router;
