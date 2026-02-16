const express = require('express');
const ownerModel = require('../models/owner.model');
const router = express.Router();

if(process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        let owner = await ownerModel.find();
        if(owner.length > 0) {
            return res.status(503)
                .send("You are not allowed to create more than one owner")
        } 

        if (!req.body) {
        return res.status(400).send("Request body is missing");
        }

        let {fullname, email, password, contact, gstin} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
            contact,
            gstin,
        })
        res.status(201).send(createdOwner)
    })
}

router.get('/', (req, res) => {
    res.send("Fetching data from database");
})

router.get('/admin', (req, res) => {
    let error = req.flash("error");
    res.render('admin', {error});
})


module.exports = router;