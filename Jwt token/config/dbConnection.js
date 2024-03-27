const{ DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME} = process.env

const mysql = require('mysql2');

var Conn= mysql.createConnection ({
    host: "localhost",
    user: "root",
    password:"" ,
    database: "jewellery"
})
 Conn.connect ( (err)=>{

    if (err) {
     console.error('Error connecting to MySQL: '+ JSON.stringify(err ,undefined ,2 ));
        return;
      }
      else { 
      console.log('Connected to MySQL database' );
    }
    })

