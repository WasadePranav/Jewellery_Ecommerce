
const {genSaltSync , hashSync , compareSync} = require("bcrypt");
const { pool } = require('../../config/database');
const userService  = require("./user.service")
const{sign} = require("jsonwebtoken")
const {create, getUsersByUserId,getUser,updateUser ,deleteUser,getUsersByUserEmail,  } = require ("./user.service")

module.exports = {
    
    createUser:(req, res) => {
        const body = req.body;
        console.log(body);
    
        const salt = genSaltSync(10);
        body.Password = hashSync(body.Password, salt);
    
        console.log(body);
    
        create(body, (err, results) => {
            if (err) {
                console.error("Error creating user:", err);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to create user"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },


    getUsersByUserId:(req, res)=>{
        const id = req.params.id;
        getUsersByUserId(id, (err,results)=>{
if(err){
    console.log(err)
    return;
}
if(!results){
    return res.json({
        success:0,
        message:'record not found '
    });

}
return res.json({
    success:1,
    data:results
})
        })
    },

    getUser: (req, res) => {
        getUser((err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            return res.json({
                success: 1,
                message: results

            });
        });
    },

    updateUser:(req, res) => {
        const body = req.body;
        // Ensure that Password is not null or undefined before hashing
        if (body.Password) {
            const salt = genSaltSync(10);
            body.Password = hashSync(body.Password, salt);
        }
        userService.updateUser(body, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: 0, message: "Database error" });
            }
            return res.json({ success: 1, message: "Updated successfully" });
        });
    },

    deleteUser: (req, res) => {
        const id = req.params.id; // Corrected to use req.params.id
        userService.deleteUser(id, (err, deleted) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: 0, message: 'Database error' });
            }
            if (!deleted) {
                return res.json({ success: 0, message: 'User not found' });
            }
            return res.json({ success: 1, message: 'User deleted successfully' });
        });
    },




    login:(req, res)=>{
         const body = req.body;
         getUsersByUserEmail(body.Email,(err, results)=>{
            if(err){
                console.log(err)
            }
            if(!results){
                console.log(results)
                return res.json({
                    success:0,
                    data:"Invalid Email or Password"
                })

            }
 
            const result = compareSync(body.Password , results.Password);
            if (result){
                results.Password = undefined;
                const jsontoken =sign({result:results},"qwe1234" ,{
                    expiresIn:"1h"
                });
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsontoken
                });
                
            }
            
            else res.json({
                success:0,
                
                data: "Invalid Email or Password"
            })
         })
    }
}