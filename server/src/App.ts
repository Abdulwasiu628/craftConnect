import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { createArtisanTable, createArtisanToken} from './auth/artisans.model.auth';
import { createCraftTable, createImageTable } from './auth/craft.model.auth';
import cors from 'cors'
import * as cloudinary from 'cloudinary';



import indexRouter from './routes/Homepage';
import craftsRouter from './routes/Crafts';
import  artisansRouter from './routes/Artisans'
import { Request, Response } from 'express';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './public')));


app.use(cors({
    origin: 'http://localhost:3001', // Replace with your React app's URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [ 'Authorization', 'Content-Type']
}));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/crafts', craftsRouter);
app.use('/artisans', artisansRouter)

//for creating tables
app.get('/createArtisan', createArtisanTable);
app.get('/createCraft', createCraftTable);
app.get('/createToken', createArtisanToken);
app.get('/createImage', createImageTable);

export default app;
