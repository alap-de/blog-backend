const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
}, {
    toJSON: {transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }}
});

userSchema.methods.generateToken = function() {
    return jwt.sign({
        id: this._id,
        name: this.name,
        email: this.email
    },
    process.env.private_key,
    { expiresIn: "1h"}
    );
}

const User = mongoose.model('User', userSchema);

module.exports = User;