const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const multer =  require('multer');
const { auth } = require("../middleware/auth");

//=================================
//             Product
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

var storage = multer.diskStorage({
    destination: ( req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.orginalname}`);
    },
    filefilter : (req, file, cb) => {
        const ext = path.extname(file.orginalname)
        if(ext !=='.jpg' || ext!== '.png'){
            return cb(res.status(400).send('only jpg, png is allowed'), false);
        }
        cb(null, true)
    }
});

var upload = multer({storage : storage}).single("file"); 


router.post("/UploadImage", auth , (req, res) => {

    upload( req, res , err => {
        if(err) return res.json({ success: false, err});
        else {
            res.json({ success:true, image: res.req.file.path, filename: res.req.file.filename});
        }
    });
});

router.post("/uploadProduct", auth , (req, res) => {
        const product = new Product(req.body)
        product.save((err) => {
            if (err) return res.status(400).json({success : false});
            return res.status(200).json({ success : true});
        });
});

router.post("/getProducts", auth , (req, res) => {
    Product.find()
        .exec( (err, products) => {
            if (err) return res.status(400).json({success : false, err});
            res. status(200).json( { success:true,products});
        });
});


module.exports = router;
