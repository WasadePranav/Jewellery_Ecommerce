const {createPool} = require('mysql');

var pool = createPool ({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:  process.env.DB_USER,
    password:process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit:10
}) ;
//  pool.connect ( (err)=>{

//     if (err) {
//      console.error('Error connecting to MySQL: '+ JSON.stringify(err ,undefined ,2 ));
//         return;
//       }
//       else { 
//       console.log('Connected to MySQL database' );
//     }
//     })

    module.exports = pool;
    
