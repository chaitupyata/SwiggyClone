const Firm = require("../models/Firm.model.js");
const Product = require("../models/Product.model.js");
const multer = require('multer');
const path = require('path')



const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now(), path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});

const addProduct = async(req, res) => {
    try {
        const {productName, price, category, bestSeller, description} = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;

        console.log("firmId", firmId)
        const firm = await Firm.findById(firmId);

        console.log("firm", firm)



        if(!firm){
            return res.status(404).json({error: "No firm Found"})

        }
        const product = new Product({
            productName, 
            price, 
            category, 
            bestSeller, 
            description, 
            image, 
            firm: firm._id
        })


        console.log("product", product)

        

        const savedProduct = await product.save();

        firm.products.push(savedProduct);

        await firm.save();

        res.status(200).json({savedProduct: savedProduct})

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error while adding the product to firm"})
    }
    
}

const getProductByFirm = async(req, res) => {
    try {

        const firmId = req.params.firmId;

        console.log("firmId", firmId);
        

        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error: "No firm found"});
            
        }

        const restaurentName = firm.firmName; 
        
        

        const product = await Product.find({firm: firmId});

        res.status(200).json({ restaurentName ,product});

        

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error while adding the product to firm"})
    }
}

// delete products

const deleteProductsById =async(req, res) => {
    try {
        const productId = req.params.productId;
        const deleteProduct = await Product.findById(productId);

        if(!deleteProduct){
            console.error(error);
            return res.status(404).json({error: "no Product found to delete "})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error while deleting the Product"})
    }
} 


module.exports = {addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductsById};


// next creating a route 







