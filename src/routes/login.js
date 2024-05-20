import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  // render the page
  res.render('login');
});

router.post('/', (req, res) => {
  // Client will send his login info
  // if user exist
  //  redirect to feed and sign him in
  // else
  //  return the same page with error section and prefilled data
});

export default router;
