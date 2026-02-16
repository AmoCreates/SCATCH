const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const productModel = require('../models/product.model');

router.get('/', (req, res) => {
    res.send("Fetching data from database");
})

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
        req.flash("error", "No file uploaded");
        return res.redirect('/owner/admin');
    }

    const fileBuffer = req.file.buffer;

    let {productname, price, discount, bgColor, panelColor, textColor} = req.body;

    let product = await productModel.create({
        image: fileBuffer,
        productname,
        price,
        discount,
        bgColor,
        panelColor,
        textColor
    })

    req.flash("error", "Product Created Successfully");
    return res.redirect('/owner/admin');

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;