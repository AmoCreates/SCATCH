const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');

router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render("index", {error});
})

router.get('/shop', isLoggedIn, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render('shop', {products, success})
})

router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    .populate('cart');

    res.render('cart', {user})
})

router.get('/remove/:id', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.splice(user.cart.indexOf(req.params.id), 1)
    await user.save();
    res.redirect('/cart');
})

router.get('/addtocart/:productid', isLoggedIn, async (req, res) => {
    let user = req.user;

    user.cart.push(req.params.productid);
    await user.save();
    
    req.flash("success", "Added to cart")
    res.redirect('/shop')
})

module.exports = router;