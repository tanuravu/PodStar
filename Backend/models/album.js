// model/album.js
const mongoose = require('mongoose');
const {Schema} =mongoose;
const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Album title is required'],
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: "user",
    },
    podcasts: [{
        type: Schema.Types.ObjectId,
        ref: "podcasts",
        
    }],
}, { timestamps: true });


module.exports = mongoose.model('album', albumSchema);