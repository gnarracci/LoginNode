const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = require('../models/user');

passport.serializeUser((User, done) => {
    done(null, User.id);
});

passport.deserializeUser(async(id, done) => {
    const User = await user.findById(id);
    done(null, User);
});

// Registro del Usuario
passport.use('local-signup', new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    //Validaciones
    const Us = user.findOne({email: email})
    if (Us) {
        return done(null, false, req.flash('signupMessage', 'El Email ya ha sido tomado!!!'))
    } else {
        const newUser = new user();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }    
}));

// Logueo del Usuario
passport.use('local-signin', new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    //Comprobacion
    const Use = await user.findOne({email: email});
    if (!Use) {
        return done(null, false, req.flash('signinMessage', 'Usuario no Encontrado!!!'));
    }
    if (!Use.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña Incorrecta!!!'));
    }
    done(null, Use);
}));