const router = require('express').Router();
const { UniqueConstraintErr } = require('sequelize/lib/errors');
const { UserModel } = require("../models");
const becrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

router.post('/register', async (req,res)=>{
    let { username, email, password } = req.body.user;
    try{
        const User = await UserModel.create({
            username,
            email,
            password: becrypt.hashSync(password, 13)
        })
        let token = jwt.sign({id: User.id}, process.env.JWT_NEED, {expiresIn: "2d"})

        res.status(201).json({
            message: "User successfully registered",
            user: username,
            sessionToken: token
        })
    } catch(err) {
        if (err instanceof UniqueConstraintErr){
            res.status(409).json({
                message: "Email or Username already in use",
            })
        }else{
        res.status(500).json({
            message: "Failed to register user",
        })
    }
    }
})


//allows an existing user to log in 

router.post("/login", async (req,res) => {
    let { username, email, password } = req.body.user
    try{
        let loginUser = await UserModel.findOne({
            where: {
                username,
            },
        });
        if(loginUser){
            let passwordComparison = await becrypt.compare(password, loginUser.password);
            if (passwordComparison){
            
                
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_NEED, {expiresIn: 60 * 60 * 24})
                
                res.status(200).json({
                   
                    message: "User logged in!",
                    sessionToken: token,
                });
            } else{
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch (error){
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
    
})


module.exports = router;