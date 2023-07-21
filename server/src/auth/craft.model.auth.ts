import { sql } from "./artisans.model.auth";
import { Request, Response } from "express";
import * as path from 'path'
import multer from "multer";

export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        (req: Request, res: Response)=>{
            res.send(`${ext} type of picture is not supported`)
        }
    }
    cb(null, true);
  },
});
export const uploadFiles = upload.array("images", 500);

 
interface craft {
    craftId: string;
    userId: string;
    description: string;
    images: string[];
    price_rate: number;
    charge_per_hour: number;
    product: string;
  }
  export const craft: craft = {
    craftId: "",
    userId: "",
    description: "",
    images: [],
    price_rate: 0,
    charge_per_hour: 0,
    product: "",
};

export const createCraftTable = async(req: Request,  res: Response) => {
    const client = await sql.connect()
    try {
        client.query(`CREATE TABLE IF NOT EXISTS Craft (
            id SERIAL ,
            craftID UUID PRIMARY KEY, 
            userId UUID REFERENCES Artisan(UserId),
            description TEXT NOT NULL,
            price_rate INT NOT NULL,
            charge_per_hour INT NOT NULL,
            years_of_experience INT NOT NULL,
            product VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`)
        res.send('Table has been created')
    } catch (error) {
        if (error) console.error(error)
    }
}
export const createImageTable = async(req: Request, res: Response) =>{
    const image = await sql.connect()
    try{
        image.query(`CREATE TABLE IF NOT EXISTS image_table (
            imageId UUID PRIMARY KEY,
            image_url TEXT NOT NULL,
            product VARCHAR(255) NOT NULL,
            userId UUID,
            crated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) `)
        res.send('Image Table created successfully')
    }catch(err){
        res.send(err)
    }
}

