const express = require("express");
const path = require("path");
const mysql = require("../models/config");
const router = express.Router();

const {signup,login,logout} = require("../controller/users");
// const { selectPost } = require("../models/posts");
const {table,showOne,addOne,deleteOne,editOne,commentAdd,like,comment} = require("../controller/posts");

// start page
router.get("/", async (req,res)=>{
    res.render("intro");
});

// login page
router.get("/login", async (req,res)=>{
    res.render("login");
});

// login successful
router.post("/login", async (req,res)=>{
    try {
        await login(req,res);
        const [checkValid] = await mysql.query("SELECT username,password FROM users WHERE EXISTS (SELECT username,password FROM currentuser WHERE users.username = currentuser.username AND users.password = currentuser.password)");
        if(checkValid[0] === undefined){
            res.redirect("/login");
            console.log("check your username and password");
        }else{
            res.redirect("/main");
            console.log("log in successful");
        }
    } catch (error) {
        console.log("unable to router log in");
    }
});

// signup page
router.get("/signup", async (req,res)=>{
    res.render("signup");
});

// signup data received
router.post("/signup", async (req,res)=>{
    try {
        await signup(req,res);
        res.redirect("/login");
    } catch (error) {
        console.log("failed to register (router)");
    }
});

// when logged in
router.post("/main", async (req,res)=>{
    try {
        await login(req,res);
        console.log("route login successful");
        res.redirect("/main");
    } catch (error) {
        console.log("unable to login (router)");
    }
});

// main page
router.get("/main", async (req,res)=>{
    try {
        const data = await table(req,res);
        res.render("main",{data});
    } catch (error) {
        console.log("unable to show the list");
    }
});

// list detail page
router.get("/detail/:id", async (req,res)=>{
    try {
        const data = await showOne(req,res);
        console.log(data);
        const comments = await comment(req,res);
        console.log(comments);
        res.render("detail",{data,comments});
    } catch (error) {
        console.log("unable to load the data");
    }
});

// comments in list detail page
// router.get("/detail/:id", async (req,res)=>{
//     try {
//         const list = await showOne(req,res);
//         res.render("detail",{list});
//     } catch (error) {
//         console.log("unable to show comments");   
//     }
// })

// post like button click
router.post("/detail/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        await like(req,res);
        res.redirect(`/detail/${id}`);
    } catch (error) {
        console.log("unable to like the post");
    }
});

// add comment button click
router.post("/comment", async (req,res)=>{
    try {
        const commentInList = await commentAdd(req,res);
        console.log(commentInList);
        const commentResult = await comment(req,res);
        res.redirect(`/detail/${data.id}`);
    } catch (error) {
        console.log("unable to add comment");
    }
});

// redirect
router.get("/comment", async (req,res)=>{
    res.redirect("/main");
})

// list adding page
router.get("/insert", (req,res)=>{
    res.render("insert");
});

// add button click
router.post("/insert",async (req,res)=>{
    try {
        await addOne(req,res);
        res.redirect("/main");
    } catch (error) {
        console.log("unable to add item to the list");
    }
});

// list editing page
router.get("/edit/:id", async (req,res)=>{
    try {
        const data = await showOne(req,res);
        res.render("edit",{data});
    } catch (error) {
        console.log("unable to show edit page");
    }
});

// complete editing by clicking the button
router.post("/edit/:id", async (req,res)=>{
    // const {id} = req.params;
    try {
        await editOne(req,res);
        // const data = await showOne(req,res);
        res.redirect("/main");
    } catch (error) {
        console.log("unable to edit item");
    }
})

// delete list
router.get("/delete/:id", async (req,res)=>{
    try {
        await deleteOne(req,res);
        res.redirect("/main");
    } catch (error) {
        console.log("unable to delete item");
    }
})

module.exports = router;