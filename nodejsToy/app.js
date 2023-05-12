
const express = require("express");
const PORT = 4000;
const app = express();
const mysql = require("./models/config");
const path = require("path");
const postRoute = require("./routes/posts");
// const _mysql = require("mysql");

// 회원가입 정보가 담길 표
const userList = {
    createUser : async ()=>{
        try {
            const result = await mysql.query("SELECT * FROM users");
            // console.log(result);
        } catch (error) {
            await mysql.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL)");
        }
    }
};
userList.createUser();

// 게시판 글이 담길 표
const tableList = {
    createList : async ()=>{
        try {
            const result = await mysql.query("SELECT * FROM lists");
        } catch (error) {
            await mysql.query("CREATE TABLE lists (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(50), username VARCHAR(50), content VARCHAR(250), likes INT, comment VARCHAR(250))");
        }
    }
};
tableList.createList();

// current user list
const currentUserList = {
    createUserList : async ()=>{
        try {
            const result = await mysql.query("SELECT * FROM currentuser");
        } catch (error) {
            await mysql.query("CREATE TABLE currentuser (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50), password VARCHAR(50))");
        }
    }
}
currentUserList.createUserList();

// comment list
const commentList = {
    createCommentList : async ()=>{
        try {
            await mysql.query("SELECT * FROM comments")
        } catch (error) {
            await mysql.query("CREATE TABLE comments (id INT, comment VARCHAR (250))");
        }
    }
}
commentList.createCommentList();

// // delete column from a table
// const deleteList = {
//     listDelete : async ()=>{
//         await mysql.query("ALTER TABLE lists DROP COLUMN content");
//     }
// };

// files to show through view
app.set("views", path.join(__dirname,"page"));

// use ejs for view engine
app.set("view engine", "ejs");

// dont use deeper object
app.use(express.urlencoded({extended : false}));

// apply css to the webpage
app.use(express.static(path.join(__dirname,"public")));

// bring from routes
app.use("/",postRoute);

// start login page
// app.get("/login",(req,res)=>{
//     const body = path.join(__dirname,"page","login.html");
//     res.sendFile(body);
// })

// check if an item exists in a table
const checkItem = {
    check : async ()=>{
        try {
            // const [test] = await mysql.query("SELECT username FROM lists HAVING username = 'money'");
            // console.log(test[0]);
            const [test2] = await mysql.query("SELECT username, password FROM users");
            console.log(test2);
        } catch (error) {
            console.log("check your syntax");
        }
    }
}
// checkItem.check();

// check exists
const exist = {
    checkExist : async ()=>{
        try {
            const [result] = await mysql.query("SELECT * FROM currentuser;");
            console.log(result[0]);
            const [currentUser] = await mysql.query("SELECT username,password FROM users WHERE EXISTS (SELECT username,password FROM currentuser WHERE users.username = currentuser.username AND users.password = currentuser.password)");
            console.log(currentUser);
        } catch (error) {
            console.log("check syntax");
        }
    }
}
// exist.checkExist();

// empty list
const emptyList = {
    empty : async ()=>{
        try {
            await mysql.query("TRUNCATE TABLE lists");
        } catch (error) {
            console.log("failed to empty list");
        }
    }
}
// emptyList.empty();

// get username from currentuser
const getUsername = {
    name : async ()=>{
        try {
            const [user] = await mysql.query("SELECT username FROM currentuser");
            console.log(user[0].username);
        } catch (error) {
            console.log("failed to print username");
        }
    }
}
// getUsername.name();

// insert item test
const insertItem = {
    insert : async ()=>{
        try {
            await mysql.query("INSERT INTO lists (comment) VALUES ('hello')");
            const [table] = await mysql.query("SELECT * FROM lists");
            console.log(table);
        } catch (error) {
            console.log("failed to insert content into list");
        }
    }
}
// insertItem.insert();

// select title of given id
const selectTitle = {
    find : async ()=>{
        try {
            const [bridge] = await mysql.query("SELECT title FROM lists WHERE id = 1");
            console.log(bridge[0].title);
        } catch (error) {
            console.log(error);
        }
    }
}
// selectTitle.find();

// update null value into a new object
const updateTest = {
    fill : async ()=>{
        try {
            await mysql.query("UPDATE lists SET comment = 'hi'");
        } catch (error) {
            console.log("unable to update");
        }
    }
}
// updateTest.fill();

// add comment to comments table
const insertcomment = {
    add : async ()=>{
        try {
            await mysql.query("TRUNCATE TABLE comments");
            await mysql.query("INSERT INTO comments (id,comment) VALUES (1,'hello')");
        } catch (error) {
            console.log("failed to add items to the comments list");
        }
    }
}
insertcomment.add();

// 서버 대기 상태
app.listen(PORT,()=>{
    console.log("server running on port 4000");
});

