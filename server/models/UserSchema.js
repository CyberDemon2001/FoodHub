const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    dob: { type: Date, required: true },
    department: { type: String, required: true },
    role: { type: String, default:"student"}
});

module.exports = mongoose.model('User', UserSchema);