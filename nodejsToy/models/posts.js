// all the logic that will be used on the webpage

// import mysql from config.js
// const mysql = require("./config");

const mysql = require("./config");

const posts = {
    // show table
    showTable : async (req,res)=>{
        try {
            const [result] = await mysql.query("SELECT * FROM lists");
            // console.log(result);
            return result;
        } catch (error) {
            console.log("failed to load the table");
            // await mysql.query("CREATE TABLE ")
        }
    },

    // show one selected item
    showOneItem : async (id)=>{
        // console.log("ggggggggggggg")
        try {
            const [result] = await mysql.query("SELECT * FROM lists WHERE id = ?",[id]);
            console.log(result);
            console.log(result[0]);
            console.log(result[0].id);
            return result[0];
        } catch (error) {
            console.log("unable to read the selected item");
            // console.log(error);
        }
    },

    // edit selected item
    editItem : async (id,title,content)=>{
        try {
            await mysql.query("UPDATE lists SET title = ?, content = ? WHERE id = ?",[title,content,id]);
            console.log("successfully edited the selected item");
        } catch (error) {
            console.log("failed to edit the selected item");
        }
    },

    // delete selected item
    deleteItem : async (id)=>{
        try {
            await mysql.query("DELETE FROM lists WHERE id = ?; SET @CNT = 0; UPDATE lists SET lists.id = @CNT:=@CNT+1; ALTER TABLE lists AUTO_INCREMENT = 0",[id]);
            console.log("successfully deleted the selected item");
        } catch (error) {
            console.log("failed to delete the selected item");
        }
    },

    // add new item
    addItem : async (title,content)=>{
        try {
            const [user] = await mysql.query("SELECT username FROM currentuser")
            console.log("current username is",user[0].username);
            console.log(typeof user[0].username);
            await mysql.query("INSERT INTO lists (title,username,content,likes) VALUES (?,?,?,?)",[title,user[0].username,content,0]);
        } catch (error) {
            console.log("failed to add the item");
        }
    },

    // add comment
    addComment : async (id,comment)=>{
        try {
            const [item] = await mysql.query("SELECT * FROM lists WHERE id = ?",[id])
            await mysql.query("INSERT INTO comments (id,comment) VALUES (?,?)",[item[0].id,comment]);
            console.log("successfully added a comment");
        } catch (error) {
            console.log("failed to add comment");
            console.log(error);
        }
    },

    // show comment
    showComment : async ()=>{
        try {
            const [item] = await mysql.query("SELECT comment FROM comments");
            return item[0];
        } catch (error) {
            console.log("failed to select comment");
        }
    },

    // like post
    likePost : async (id)=>{
        try {
            await mysql.query("UPDATE lists SET likes = likes + 1 WHERE id = ?",[id]);
            console.log("successfully liked the post");
        } catch (error) {
            console.log("failed to increase the like number");
        }
    }
}

module.exports = posts;