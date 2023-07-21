import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { sql } from "../auth/artisans.model.auth";
import { deleteFromCraftByProduct, findOneCraftByUserId, GetCraftByProduct, insertNewArtisan, insertNewCraft, insertNewImage, updateCraft } from "../auth/queries";
import { craft } from "../auth/craft.model.auth";
import { v4 } from "uuid";

import cloudinaryStorage from 'multer-storage-cloudinary';
import { v4 as uuid } from 'uuid';

const cloudinary = require('cloudinary').v2



export const craftGetMethod = (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    const cookie = req.cookies['thisIsMyToken']
    console.log('here')
    if(!cookie){
        res.send('You need to login as a user')
    }else{
        verify(cookie, 'thisIsACommonSecret', (err: any, data: any) => {
            if(err) {
                res.status(304).send(`${err || err.message}`)
            }else{
                const email = data.username
                const id = data.id
                
                sql.query(findOneCraftByUserId, [id], (err, data)=> {
                    if(err) {
                        console.log('too')
                        res.status(401).send(`${err|| 'THis is an error'}`)
                    }else {
                        console.log(data.rows)
                        if(data.rows.length > 0){
                            const database = data.rows
                            res.status(201).send(database)
                        }else{
                            res.status(404).send('Craft doenst exist')
                        }
                    }
                })
            }
        })
    }
};
export const imagePostMethod = async(req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    try{
        const fileData = req.body.image
        const product = req.body.product
        const fileBuffer = fileData
        console.log(fileBuffer)

        cloudinary.config({
            cloud_name: "dz69xurxl",
            api_key: "183622593429274",
            api_secret: "sv_QnSfyikav4Rq34Lj_t5HvzaQ"
        })
        
        const result = await cloudinary.uploader.upload(fileBuffer, {
            folder: 'upload',
            format: ['jpg', 'png', 'gif', 'jpeg'],
            public_id: 'public_id',
          });
        console.log(result)
        const cookie = req.cookies['thisIsMyToken']
        if(!cookie) {
            res.status(401).send('User needs to be logged in')
        }else{
            verify(cookie, 'thisIsACommonSecret', (err: any, data: any) => {
                if(err) {
                    res.status(500).send(err.message)
                }else{
                    const userEmail = data.username
                    const userID = data.id
                    const userid = userID.toString()
                    const imageId = v4()
                    const imageUrl =fileBuffer
                    if(userEmail !== 'undefined' || userID !== undefined){
                        sql.query(insertNewImage, [imageId, userid,  product, imageUrl], (err, result) => {
                            if(err) {
                                res.send(err)
                            }else{
                                res.send('image updated successfully')
                                console.log('image updated successfully')
                            }
                        })
                    }
                }
            })

        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
}
export const craftPostMethod = async(req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    try{
        const {
            description, 
            price_rate, 
            charge_per_hour, 
            years_of_experience,
            product
        } = req.body
        const cookie = req.cookies['thisIsMyToken']
        if(!cookie) {
            res.status(401).send('User needs to be logged in')
        }else{
            verify(cookie, 'thisIsACommonSecret', (err: any, data: any) => {
                if(err) {
                    res.status(500).send(err.message)
                }else{
                    const userEmail = data.username
                    const userID = data.id
                    const userid = userID.toString()
                    const craftid = v4()
                    craft.craftId = craftid
                    craft.userId = userid
                    craft.description = description
                    craft.price_rate = price_rate
                    craft.charge_per_hour = charge_per_hour
                    craft.product = product
                    if(userEmail !== 'undefined' || userID !== undefined){
                        sql.query(GetCraftByProduct, [craft.userId, craft.product], (err, result) => {
                            const rest = result.rows
                            if(rest.length > 0){
                                console.log('not saved')
                                res.status(200).send('product and craft already exists');
                            }else{
                                sql.query(GetCraftByProduct, [craft.product, craft.userId], (err, result) => {
                                    if(err){
                                        res.send(err);
                                    }else{
                                        if(result) {
                                            const count = result.rows.length
                                            if(count < 3) {
                                                sql.query(insertNewCraft, [
                                                    craftid,
                                                    userid,
                                                    description,
                                                    price_rate,
                                                    charge_per_hour,
                                                    years_of_experience,
                                                    product
                                                ], (err, result) => {
                                                    if(err) {
                                                        res.status(403).send(err.message)
                                                    }else{
                                                        console.log('saved')
                                                        
                                                    }
                                                })

                                            }else{
                                                res.status(200).send('Maximum number of craft reached')
                                            }
                                        }
                                    }
                                });
                                
                            }
                        })
                    }
                }
            })

        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
}
export const craftDeleteMethod = (req: Request, res: Response) => {
    const token = req.cookies['thisIsMyToken']
    if(!token) {
        res.send('User not logged in')
    }else{
        verify(token,  'thisIsACommonSecret', (err: any, data: any) => {
            const userID = data.id;
            const product = req.params.product;
            
            sql.query(deleteFromCraftByProduct, [product, userID], (err, result) => {
                if(err) {
                    res.status(401).send(err.message)
                }else{
                    res.send('Product deleted successfully')
                }
            })
    

        })
    }
    
};
export const craftGetUpdateMethod = (req: Request, res: Response) => {
    const token = req.cookies['thisIsMyToken']
    if(!token) {
        res.send('User not logged in')
    }else{
        verify(token,  'thisIsACommonSecret', (err: any, data: any) => {
            const userID = data.id;
            const product = req.params.product;
            
            sql.query(GetCraftByProduct, [product, userID], (err, result) => {
                if(err) {
                    res.status(401).send(err.message)
                }else{
                    const resp = result.rows
                    if(resp.length > 0){
                        res.status(200).send(resp)  
                    }
                }
            })
    

        })
    }
}
export const craftUpdateMethod = (req: Request, res: Response) => {
    const {
        description,
        images, 
        price_rate,
        charge_per_hour,
        product
    } = req.body
    const token = req.cookies['thisIsMyToken']
    if(!token) {
        res.send('User not logged in')
    }else{
        verify(token,  'thisIsACommonSecret', (err: any, data: any) => {
            const userID = data.id;
            sql.query(updateCraft, [description, images, price_rate, charge_per_hour, product, userID], (err, result) => {
                if(err) {
                    res.status(401).send(err.message)
                }else{
                    res.send('Product updated successfully')
                }
            })
    

        })
    }
    
};