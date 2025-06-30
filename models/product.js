const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});
const userSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Blocked:{
        type: Boolean,
        default:false
    }

});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
module.exports = {
    Product,
    User
}
