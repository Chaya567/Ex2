
import mysql from "mysql2/promise.js";

async function openConnect() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "987654321",
        database: "DB_HMO"
    })

    // חיבור לDB
    connection.connect(function (err) {
        if (err) {
            console.log("Error in the connection")
            console.log(err)
        }
        else {
            console.log(`Database Connected`)
        }
    })
    return connection
}

async function query(sql,values=[]){
  let connection = await openConnect();
 let res = await connection.query(sql,[values])
 return res;
}

export default {query}