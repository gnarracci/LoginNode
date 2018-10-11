const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require ('../models/user');

// Guardado de Datos de Sesion
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

//Registro de Usuario

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    //Validando Registro
    const user = await User.findOne({email: email});
    if (user) {
        return done(null, false, req.flash('signupMessage', 'El Email ya se encuentra registrado en el Sistema'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }

}));

//Login de Usuario

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 
}, async (req, email, password, done) => {

    const user = await User.findOne({email: email});
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'Cuenta de Correo no registrada en el Sistema'));
    }
    if (!user.validatePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña Incorrecta!!!'));
    }
    done(null, user);
}));