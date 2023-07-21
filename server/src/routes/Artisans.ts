import express from 'express';
import { verifyToken } from '../auth/artisans.model.auth';
import { artisansGetMethod, artisansGetPutMethod, artisansLoginGetMethod, artisansLoginPostMethod, artisansPostMethod, artisansPutMethod, artisansDeleteMethod } from '../controllers/artisan.ctrl'

const router = express.Router();

/* GET users listing. */
router.get('/', verifyToken,artisansGetMethod);
router.post('/', artisansPostMethod);
router.get('/login', artisansLoginGetMethod);
router.post('/login', artisansLoginPostMethod);
router.get('/:email', artisansGetPutMethod);
router.put('/update', verifyToken, artisansPutMethod);
router.delete('/:id', verifyToken, artisansDeleteMethod);

export default router;