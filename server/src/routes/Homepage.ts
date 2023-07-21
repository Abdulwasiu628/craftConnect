import express, {Request, Response} from 'express';
const router = express.Router();

/* GET home page. */
router.get('/homepage', (req: Request, res: Response, next) => {
  res.send('Home');
});

export default router;
