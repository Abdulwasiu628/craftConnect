import pool from "pg";
const Pool = pool.Pool;
import { Request, Response } from "express";

import { sign, verify } from "jsonwebtoken"

export const signToken = (username: string, id: string) => {
  const token = sign({
    username: username,
    id: id
  }, 'thisIsACommonSecret')
  return token
}
export const verifyToken = (req: any, res: any, next: any) => {
  try{
    let token = req.cookies['thisIsMyToken']
    if(!token) {
        req.authenticated = true
        res.status(403)
        res.send('Successful')
    }else{
        let validator = verify(token, "thisIsACommonSecret")
        if(validator) {
            return next()
        }else{
            console.log('not successful')
        }
    }

}catch(err){
    if(err){
        console.log(err)
    }
}
}




interface artisans {
  id: string;
  surname: string;
  firstname: string;
  email: string;
  dob: string,
  password: string;
  phone_number: string;
  state_of_origin: string;
  gender: string;
  craft: string;
  years_of_experience: number;
  skills_description: string;
  home_address: string;
 
}
export const artisans: artisans = {
  id: "",
  surname: "",
  firstname: "",
  email: "",
  dob: '',
  password: "",
  phone_number: "",
  state_of_origin: "",
  gender: "",
  craft: "",
  years_of_experience: 0,
  skills_description: "",
  home_address: "",
 
};

export const sql = new Pool({
  user:'decagon',
  host: 'localhost',
  database: 'craft_connect',
  password: '@nightcrawler628Dapp',
  port: 5432,
});

export const createArtisanToken = async (req: Request, res: Response) => {
  const client = await sql.connect()
  try {
    client.query(`CREATE TABLE IF NOT EXISTS artisan_token (
      id SERIAL,
      email VARCHAR(255) NOT NULL,
      token VARCHAR(255) NOT NULL
    )`)
    res.send('Artisan token table created successfully')
  }catch(err) {
    if(err) {
      res.status(500).send(err)
    }
  }
}



export const createArtisanTable = async(req: Request,  res: Response) => {
  const client = await sql.connect()
  try {
    client.query(`CREATE TABLE IF NOT EXISTS Artisan (
      id SERIAL,  
      UserId UUID PRIMARY KEY,
      surname VARCHAR(255) NOT NULL, 
      firstname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL, 
      dob DATE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone_number VARCHAR(255) NOT NULL, 
      state_of_origin VARCHAR(255) NOT NULL, 
      gender VARCHAR(255) NOT NULL,
      craft VARCHAR(255) NOT NULL,
      years_of_experience VARCHAR(255) NOT NULL, 
      skills_description VARCHAR(500) NOT NULL,
      home_address VARCHAR(400) NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      
    )`);
    res.send('Table has been created')
  } catch (error) {
    if(error) console.log(error);
    
  }
  

}


//creating new table that of artisans





