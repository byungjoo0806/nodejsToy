const mysql2 = require("mysql2/promise");

// createPool 메소드로 mysql 연결관리
const mysql = mysql2.createPool({
    user : "root", // mysql 사용자
    password : "DIGI0408as^^", // mysql 패스워드
    multipleStatements : true, // 여러 쿼리문 적용 가능
    database : "personalToy" // mysql 데이터베이스 이름
});

// createPool 메소드로 로그인 mysql 연결관리
const mysqlLogin = mysql2.createPool({
    user : "root",
    password : "DIGI0408as^^",
    multipleStatements : true,
    database : "login_db"
});

// 연결이 잘 되어있는지 확인하기
mysql.getConnection((err,res)=>{
    console.log(err)
});
// 연결이 잘 안되고 에러가 뜨면, 에러 보여줌

module.exports = mysql; // mysql과의 연결을 넘겨주기
module.exports = mysqlLogin;