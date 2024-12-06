// the vegetable schema
const mongoose = require('mongoose');

const vegetableSchema = new mongoose.Schema({
    name:{type: String, required: true},
    color: {type: String, required: true},
    price: {type: Number, required: true},
    organic: {type: Boolean, required: false},
},{
    timestamps: true
});

const Vegetable = mongoose.model('Vegetable',vegetableSchema);

module.exports = Vegetable;
