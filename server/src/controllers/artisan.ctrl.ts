import { NextFunction, Request, Response } from "express";
import { signToken, sql } from "../auth/artisans.model.auth";
import { artisans } from "../auth/artisans.model.auth";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import * as nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Transporter } from "nodemailer";
import crypto from 'crypto'
import { compare } from "bcrypt";

dotenv.config()

import {
  findAndGetAll,
  findOneByEmail,
  findOneById,
  insertNewArtisan,
  insertToken,
  updateArtisan,
  deleteByID
} from "../auth/queries";
import { verify } from "jsonwebtoken";

export const artisansGetMethod = (req: Request, res: Response) => {
    const cookie = req.cookies['thisIsMyToken']
    if(!cookie) {
        res.status(501).send('Please sign up as a user')
    }else{
        verify(cookie, "thisIsACommonSecret", (err: any, data: any) => {
            if(err) {
                res.send('Please sign up as a user')

            }else{
                let email = data.username
                sql.query(findOneByEmail,[email],  (err, data) => {
                    if (err) {
                        res.status(404).send(err.message || err);
                    } else {
                        const database = data.rows[0]
                        res.status(200).send(database);
                    }
                })
            }
        })
    }
    
};
export const artisansPostMethod = async (req: Request, res: Response) => {
  const {
    surname,
    firstname,
    dob,
    email,
    password,
    password2,
    phone_number,
    state_of_origin,
    gender,
    craft,
    years_of_experience,
    skills_description,
    home_address,
  } = req.body;
  if (email === "" || password === "" || surname === "" || firstname === "") {
    res.status(401).send({ message: "Input valid details" });
  } else {
    if (password !== password2) {
      res.status(401).send({ message: "passwords do not match" });
    } else {
      const validator = emailValidator.validate(email);
      if (!validator) {
        res.status(401).send({ message: "Please enter a valid email" });
      } else {
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        function validateName(name: string): boolean {
          return nameRegex.test(name);
        }
        const validSurname = validateName(surname);
        const validFirstName = validateName(firstname);
        if (!validFirstName || !validSurname) {
          res.status(400).send({ message: "invalid surname or first name" });
        } else {
          try {
            artisans.id = v4();
            artisans.surname = surname;
            artisans.firstname = firstname;
            artisans.email = email;
            artisans.dob = dob
            artisans.password = password;
            artisans.phone_number = phone_number;
            artisans.state_of_origin = state_of_origin;
            artisans.gender = gender;
            artisans.craft = craft;
            artisans.years_of_experience = years_of_experience;
            artisans.skills_description = skills_description;
            artisans.home_address = home_address;


            //check if user already exists
            sql.query(findOneByEmail, [email], async (err, result) => {
                  if (err) {
                      res.status(403).send({ message: err.message });
                  } else {
                      if (result.rows.length) {
                          res.send("User with the email already exists");
                      } else {
                          const salt = bcrypt.genSaltSync(10);
                          const hashedPassword = bcrypt.hashSync(password, salt);
                          let token = crypto.randomBytes(32).toString('hex');
                          let url = `https://localhost:3005/verifylink/${token}/${email}`
                          let text = "Press the link to verify your account"
                          sql.query(
                              insertNewArtisan,
                              [
                                  artisans.id,
                                  artisans.surname,
                                  artisans.firstname,
                                  artisans.email,
                                  artisans.dob,
                                  hashedPassword,
                                  artisans.phone_number,
                                  artisans.state_of_origin,
                                  artisans.gender,
                                  artisans.craft,
                                  artisans.years_of_experience,
                                  artisans.skills_description,
                                  artisans.home_address,
                              ],
                              (err, result) => {
                                  if (err) {
                                      res.status(401).send({ message: err.message });
                                  } else {
                                      res.status(200).send({ message: result });
                                  }
                              }
                          );
                      }
                  }
              });
          } catch (error) {
            if (error) {
              res.status(500).send({ message: error });
            }
          }
        }
      }
    }
  }
};
export const artisansLoginGetMethod = (req: Request, res: Response) => {
    res.status(200).send({ message:'Login Route created successfully'});
}
export const artisansLoginPostMethod = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    

    const {email, password} = req.body
    console.log(email, password)
    sql.query(findOneByEmail, [email], (err, result) => {
        if(err) {
            res.status(401).send(err.message)
        }else {
            console.log(result.rows[0])
            const pass = result.rows[0].password
            const userId = result.rows[0].userid
            console.log(pass, userId)

            compare(password, pass).then((match) => {
                if(!match) {
                    res.status(401).json({ message: 'User not found, Pls log in'})
                }else{
                    let token = signToken(email, userId)
                    res.cookie('thisIsMyToken', token, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 *30*1000
                    })
                    const cookie = req.cookies['thisIsMyToken']
                    console.log(cookie)
                    if(!cookie) {
                        res.status(401).send({ message: 'token not generated'})
                    }else{
                        sql.query(insertToken, [email, cookie], (err, data) => {
                            if(err) {
                                res.status(500).send({ message: 'Problem inserting the token'})
                            }else {
                                res.status(201).send({ message: "Login successful \n" , result: data})
                            }
                        })
                    }
                }
            })
        }
    })
}
export const artisansGetPutMethod = (req: Request, res: Response) => {
    const email = req.params.email
    sql.query(findOneByEmail, [email], (err, result) => {
        if (err) {
            res.status(403).send(err)
        }else{
            if(result.rows.length > 0) {
                res.status(201).send('Everything is good')
            }else{
                res.status(500).send("Please sign up and register")
            }
        }
    })
}
export const artisansPutMethod = (req: Request, res: Response) => {
    const token = req.cookies['thisIsMyToken']
    if(!token) {
        res.send('User not logged in')
    }else{
        verify(token,  'thisIsACommonSecret', (err: any, data: any) => {
            const userID = data.id
            sql.query(findOneById, [userID], (err, data) => {
                if (err) {
                res.status(404).send(err.message || err);
                } else {
                    if(data.rows.length > 0) {
                        const {
                            surname,
                            firstname,
                            dob,
                            password,
                            email,
                            phone_number,
                            state_of_origin,
                            gender,
                            craft,
                            years_of_experience,
                            skills_description,
                            home_address,
                        } = req.body;
                        const salt = bcrypt.genSaltSync(10)
                        const hashedPassword = bcrypt.hashSync(password, salt)
                        const id = data.rows[0].userId;
                        data.rows[0].surname = surname;
                        data.rows[0].firstname = firstname;
                        data.rows[0].dob = dob;
                        data.rows[0].password = hashedPassword
                        data.rows[0].email = email;
                        data.rows[0].phone_number = phone_number;
                        data.rows[0].state_of_origin = state_of_origin;
                        data.rows[0].gender = gender;
                        data.rows[0].craft = craft;
                        data.rows[0].years_of_experience = years_of_experience;
                        data.rows[0].skills_description = skills_description;
                        data.rows[0].home_address = home_address;

                        sql.query(updateArtisan, [
                            data.rows[0].surname,
                            data.rows[0].firstname,
                            data.rows[0].dob,
                            data.rows[0].password ,
                            data.rows[0].email,
                            data.rows[0].phone_number,
                            data.rows[0].state_of_origin,
                            data.rows[0].gender,
                            data.rows[0].craft,
                            data.rows[0].years_of_experience ,
                            data.rows[0].skills_description,
                            data.rows[0].home_address,
                            userID
                            ], (err, data) => {
                                if(err) {
                                    res.status(403).send(err);
                                }else{
                                    res.status(200).send('User Profile updated successfully')
                                }
                            });
                    }else{
                        res.send('There is no user with this data')
                    }    
                }
            });
        })
    }
};

export const artisansDeleteMethod = (req: Request, res: Response) => {
    const id = req.params.id
    sql.query(findOneById, [id], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.rows.length > 0) {
                sql.query(deleteByID, [id], (err, result) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.status(200).send(`Record with ID ${id} has been deleted successfully`)
                    }
                })
            } else {
                res.status(404).send(`Record with ID ${id} not found`)
            }
        }
    })
}
