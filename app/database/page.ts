import mysql from "mysql2/promise";

const savedalarms = mysql.createPool(
    {
        host: "localhost",
        port: 3307,
        user: "root",
        password: "deepesh",
        database: "deepesh"
    }
);

export default savedalarms;