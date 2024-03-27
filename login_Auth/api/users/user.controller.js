const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const { create, getByUserId, getUser, updateUser, deleteUser, getUserByUserEmail } = require("./user.service");
const bodyParser = require("body-parser");
const { sing,  } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.Password = hashSync(body.Password, salt)

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },

    getByUserId: (req, res) => {
        const id = req.param.id;
        getByUserId(id, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success: 1,
                message: results
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

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10)
        body.Password = hashSync(body.Password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            return res.json({
                success: 1,
                message: "Updated Successfully"

            });
        })
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"

                });
            }

            return res.json({
                success: 1,
                message: "User Deleted Successfully"

            });
        })
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err)
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: ("Invalid Email or Password")
                })

            }
            const result = compareSync(body.Password, results.Password);
            if (result) {
                results.Password = undefined;
                const jsonwebtoken = sing({ result: results }, "qwe123", {
                    expiresIn: "1h"
                });

                return res.json({
                    success: 1,
                    message: "Login Succesfully",
                    token: jsonwebtoken
                })


            }

            else res.json({
                success: 0,
                message: "invalid id or pass"
            })

        })
    }

}