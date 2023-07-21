import { sql } from "./artisans.model.auth";
import { artisans } from "./artisans.model.auth";

//find part and select
export const checkEmail = "SELECT s FROM Artisan WHERE s.email = $1";
export const findOneById = "SELECT * FROM Artisan WHERE userId = $1";
export const findOneByEmail = "SELECT * FROM Artisan WHERE email = $1";
export const findAndGetAll = "SELECT * FROM Artisan";
export const findAllToken = "SELECT * FROM artisan_token";
export const findOneToken = "SELECT s FROM artisans_token WHERE s.email = $1 AND s.token = $2";
export const findOneCraftByUserId = `SELECT * from Craft WHERE userId = $1`;
export const GetCraftByProduct = `SELECT * FROM Craft WHERE product = $1 AND userId = $2`;



export const deleteByID = "DELETE * FROM Artisan WHERE userId = $1"

//Insert all methods
export const insertNewArtisan = `INSERT INTO Artisan
        (userId, surname, firstname ,
          email, dob, password, phone_number, 
          state_of_origin, gender, craft,
           years_of_experience, skills_description,
             home_address
         ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13)`;
export const insertToken = `INSERT INTO artisan_token (email, token) VALUES ($1, $2)`;
export const insertNewCraft = `INSERT INTO Craft (craftId, userId, 
                    description,image_url, price_rate, 
                    charge_per_hour, years_of_experience, product) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
export const insertNewImage = `INSERT INTO image_table (imageId, image_url, product, userId) VALUES ($1, $2, $3, $4)`;
//Put methods
export const updateArtisan = `UPDATE Artisan SET 
  surname = $1,
   firstname = $2,
   dob = $3,
   password = $4,
   email = $5,
  phone_number = $6,
  state_of_origin = $7,
   gender = $8,
    craft = $9,
   years_of_experience = $10,
   skills_description = $11,
  home_address = $12  WHERE userId = $13`;
export const updateCraft = `UPDATE Craft SET 
        description =$1,
        images = $2,
        price_rate = $3,
        charge_per_hour = $4,
        product = $5 WHERE userId = $6`



//delete method doesn't exist for the user/artisan but the functionality will be created for admin

export const deleteFromCraftByProduct = `DELETE FROM Craft WHERE 
product = $1 AND userId = $2`;

