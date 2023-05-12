// -----------------------------------------------------
// npm i express ejs mysql2
// -----------------------------------------------------
// npm i dotenv
// -----------------------------------------------------
// npm i nodemon // restart server automatically when files are saved
// -----------------------------------------------------
// npm i hbs // show html on server
// -----------------------------------------------------
// npm i Bcryptjs // hash passwords

const PORT = 3000;
const postRoute = require("./routes/posts");
const path = require("path");
const express = require("express");
const app = express();
const mysql = require("./models/config");
const mysqlLogin = require("./models/config");
const mysql2 = require("mysql2/promise");
const dotenv = require("dotenv"); // 환경변수를 .env 파일에 보관하기

// view engine === ejs
app.set("view engine","ejs");

// view -> page
app.set("view",path.join(__dirname,"page"));

// 미들웨어 추가 - 깊은 객체 사용 안함
app.use(express.urlencoded({extended : false}));

// 페이지 css 추가
app.use(express.static(path.join(__dirname,"public")));

// -----------------------------------------------------
// login 기능
const login = {
    createUsers : async function(){
        try {
            const usersTable = await mysqlLogin.query("SELECT * FROM users");
            console.log(usersTable);
        } catch (error) {
            // console.log(error);
            await mysqlLogin.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), password VARCHAR(20))");
        }
    }
}
login.createUsers();

// 설정한 환경변수 연결하기
dotenv.config({path : "./.env"});

// .env 파일에서 변수 가져오기
const db = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

// 데이터베이스 연결하기
db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("database connected");
    }
})


// server on
app.listen(PORT,()=>{
    console.log("server open");
})