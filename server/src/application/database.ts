import mysql from "mysql";
import * as dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

const connection = db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL server");
});

export default connection;
