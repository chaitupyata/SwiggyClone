const mongoose = require("mongoose");


const firmSchema = new mongoose.Schema({
    firmName:{
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true
    },
    category: {
        type: [
            {
                type: String,
                enum: ['veg', 'non-veg']
            }
        ],
        required: true
    },
    region: {
        type: [
            {
                type: String,
                enum: ['south-indian', 'north-indian', 'chinese', 'bakery']
            }
        ],
        required: true
    },
    offer: {
        type: String
    },
    image: {
        type: String
    },
    vendor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Vendor'
            }
        ],
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, {timestamps: true})

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm

