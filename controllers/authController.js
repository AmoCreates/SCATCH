const userModel = require('../models/user.model');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    const schema = Joi.object({
        fullname: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        req.flash("error", "No field can be empty");
        return res.redirect('/');
    }

    try {
        let {email, fullname, password} = req.body;

        let userExists = await userModel.findOne({email})
        if(userExists) {
            req.flash("error", "User Already Exists, Please Login");
            return res.redirect('/');
        }

        bcrypt.genSalt(12, async function(err, salt) {
            await bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.send(err.message);
                let user = await userModel.create({
                    fullname, email, password: hash
                })
                
                let token = generateToken(user);
                res.cookie("token", token);

                let error = req.flash("error", "User Created Successfully, You can Login Now");
                return res.redirect('/');
            });
        });

        
    } catch (error) {
        res.send(error.message);
    }
    
}

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) {
        let error = req.flash("error", "Incorrect password or email");
        return res.redirect('/');
    }
    
    bcrypt.compare(password, user.password, function(err, result) {
        if(result) {
            let token = generateToken(user);
            res.cookie("token", token);
            
            res.redirect('/shop')
        }
        else {
            let error = req.flash("error", "Incorrect password or email");
            return res.redirect('/');
        }
    });
}