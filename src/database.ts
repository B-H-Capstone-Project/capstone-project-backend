import mysql from "mysql";
import { createPool, Pool } from "mysql";
import * as dotenv from "dotenv";
dotenv.config();

let pool: Pool;
/*
 export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
 
/* export const connection = db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL server");
}); */

export const db:any = () => {
  try {
    pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
    });

    console.debug("MySql Adapter Pool generated successfully");
  } catch (error) {
    console.error("[mysql.connector][init][Error]: ", error);
    throw new Error("failed to initialized pool");
  }
};

export const execute = <T>(
  query: string,
  params: string[] | Object
): Promise<T> => {
  try {
    if (!pool) throw new Error("Pool was not created.");
    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.error("[mysql.connector][execute][Error]: ", error);
    throw new Error("failed to execute MySQL query");
  }
};

export default { db, execute };
