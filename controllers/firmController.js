const Firm = require('../models/Firm.model.js');
const Vendor = require('../models/Vendor.model.js');
const multer = require('multer')

// multer file uploade 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uplode/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage})


const addFirm = async(req, res) => {
    try {
        const {firmName, area, category, region, offer} = req.body
    
    // adding the image 
        const image = req.file? req.file.filename: undefined;
    
        const vendor = await Vendor.findById(req.vendorId);

        if (!vendor) {
            res.status(404).json({mesage: "Vendor is not found"})
        }
    
        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id    
        })
    

        const savedFirm = await firm.save();

        
// papulatind firm to vendor in DB `
        vendor.firm.push(savedFirm)

        const savedFRIM = await vendor.save()
        
        return res.status(200).json({ message: "Firm added succesfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json("Internal server error while addind the firm to vendor")
    }
}

// delete firm

const deleteFirmById =async(req, res) => {
    try {
        const firmId = req.params.firmId;
        const deleteFirm = await Firm.findById(firmId);

        if(!deleteFirm){
            console.error(error);
            return res.status(404).json({error: "no Firm found to delete "})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error while deleting the Firm"})
    }
} 

module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById}


