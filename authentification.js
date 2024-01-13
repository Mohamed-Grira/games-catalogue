import bcrypt from 'bcrypt';
import passport from "passport";
import { Strategy } from "passport-local";
import { getUtilisateur } from "./model/utilisateur.js";

const config = {
    usernameField: 'username',
    passwordField: 'password'
};

passport.use(new Strategy(config, async (username, password, done) => {
    try {
        const utilisateur = await getUtilisateur(username);
        if (!utilisateur) {
            return done(null, false, { message: 'wronguser' });
        }

        const valide = await bcrypt.compare(password, utilisateur.password);
        if (!valide) {
            return done(null, false, { message: 'wrongpassword' });
        }

        return done(null, utilisateur);
    }
    catch (error) {
        return done(error);
    }
}));

passport.serializeUser((utilisateur, done) => {
    done(null, utilisateur.username);
});

passport.deserializeUser(async (username, done) => {
    try {
        const user = await getUtilisateur(username);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
})