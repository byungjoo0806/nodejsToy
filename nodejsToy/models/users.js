// import mysql from config.js
const mysql = require("./config");

// signup and login logic
const users = {
    // signup logic
    insertSignup : async (firstname,lastname,username,password)=>{
        try {
            await mysql.query("INSERT INTO users (firstname,lastname,username,password) VALUES (?,?,?,?)",[firstname,lastname,username,password]);
            console.log("new user registered");
        } catch (error) {
            console.log(error);
        }
    },

    // login logic
    userLogin : async (username,password)=>{
        try {
            await mysql.query("TRUNCATE TABLE currentuser");
            await mysql.query("INSERT INTO currentuser (username,password) VALUES (?,?)",[username,password]);
        } catch (error) {
            console.log(error);
        }
    },

    // logout logic
    userLogout : async ()=>{
        try {
            await mysql.query("TRUNCATE TABLE currentuser");
        } catch (error) {
            console.log(error);
        }
    }
};
module.exports = users;

