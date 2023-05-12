// bring logic from models folder

const {users} = require("../models");
// const {posts} = require("../models");

exports.signup = async (req,res)=>{
    const {firstname,lastname,username,password} = req.body;
    try {
        await users.insertSignup(firstname,lastname,username,password);
    } catch (error) {
        console.log("error found in controller signup");
    }
};

exports.login = async (req,res)=>{
    const {username,password} = req.body;
    try {
        await users.userLogin(username,password);
        console.log("controller log in successful");
    } catch (error) {
        console.log("error found in controller login");
    }
};

exports.logout = async (req,res)=>{
    try {
        await users.userLogout();
        console.log("controller log out successful");
    } catch (error) {
        console.log("error found in controller log out");
    }
};
