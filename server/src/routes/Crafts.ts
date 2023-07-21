import express, {Request, Response} from 'express';
import { verifyToken } from '../auth/artisans.model.auth';
import { craftGetMethod, craftPostMethod, craftDeleteMethod, craftUpdateMethod, craftGetUpdateMethod, imagePostMethod} from '../controllers/craft.ctrl';
const router = express.Router();







/* GET users listing. */
router.get('/', verifyToken,craftGetMethod)
router.post('/post', verifyToken, craftPostMethod)
router.post('/imagePost', verifyToken, imagePostMethod)
router.delete('/delete/:product', verifyToken,craftDeleteMethod)
router.get('/update/:product', verifyToken, craftGetUpdateMethod)
router.put('/update/:product', verifyToken,craftUpdateMethod)

export default router;
