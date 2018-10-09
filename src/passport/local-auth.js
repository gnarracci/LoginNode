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
    const User = new user();
    User.email = email;
    User.password = password;
    await User.save();
    done(null, User);
}));