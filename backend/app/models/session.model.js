const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
        email: String,
        status: {
            type: Boolean,
            default: true
         },  
    },{
        timestamps: true
    }
)

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;