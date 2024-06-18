const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title : {type:String, required:true},
    desc : {type:String, required:true},
    url : {type:String, required:true},
    cate : {type:String, required:true},
});

const ImageModel = mongoose.model('Image',imageSchema);

module.exports = ImageModel;