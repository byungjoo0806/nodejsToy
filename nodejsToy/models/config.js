const mysql2 = require("mysql2/promise");

// connect mysql database
const mysql = mysql2.createPool({
    user : "root",
    password : "DIGI0408as^^",
    multipleStatements : true,
    database : "toy_project"
});

// confirm connection status
mysql.getConnection((err,res)=>{
    console.log(err)
})
// if connection unstable, error will be shown

// export mysql
module.exports = mysql;