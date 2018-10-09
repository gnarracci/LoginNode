const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
});

//Encriptacion de la Contraseña
userSchema.methods.encrypPass = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePass = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);