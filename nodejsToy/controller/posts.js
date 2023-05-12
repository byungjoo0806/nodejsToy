// import logic from models
const {posts} = require("../models");

exports.table = async (req,res)=>{
    try {
        const data = await posts.showTable(req,res);
        return data;
    } catch (error) {
        console.log("error found in controller showing the table");
    }
};

exports.showOne = async (req,res)=>{
    // console.log(req.url);
    // console.log("------------------------------------------------------------------")
    const {id} = req.params;
    try {
        const data = await posts.showOneItem(id);
        return data;
    } catch (error) {
        console.log("error found in controller showing selected item");
    }
};

exports.editOne = async (req,res)=>{
    const {id} = req.params;
    const {title,content} = req.body;
    try {
        await posts.editItem(id,title,content);
    } catch (error) {
        console.log("error found in controller editing item");
    }
};

exports.deleteOne = async (req,res)=>{
    const {id} = req.params;
    try {
        await posts.deleteItem(id);
    } catch (error) {
        console.log("error found in controller deleting item");
    }
};

exports.addOne = async (req,res)=>{
    const {title,content} = req.body;
    try {
        await posts.addItem(title,content);
    } catch (error) {
        console.log("error found in controller adding item");
    }
};

exports.commentAdd = async (req,res)=>{
    const {id} = req.params;
    const {comment} = req.body;
    try {
        await posts.addComment(id,comment);
    } catch (error) {
        console.log("error found in controller adding comment");
    }
};

exports.comment = async (req,res)=>{
    try {
        await posts.showComment();
    } catch (error) {
        console.log("error found in controller showing comment");
    }
}

exports.like = async (req,res)=>{
    const{id} = req.params;
    try {
        await posts.likePost(id);
    } catch (error) {
        console.log("error found in controller like post");
    }
}