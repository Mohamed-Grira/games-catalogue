// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json } from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import memorystore from 'memorystore';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import { isIdValid, isIdentifiantValid, isMotPasseValid, isTexteValid } from './validation.js';
import { getJeux } from './model/liste-jeux.js';
import './authentification.js'

// Création du serveur
const app = express();

// Initialisation de l'engin de rendu
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configuration de la base de données de session
const MemoryStore = memorystore(session);

// Ajout de middlewares
const assureAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
      return next();
    }
    response.status(401).send('Pas Authoriser');
  };
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(json());
app.use(session({
    cookie: { maxAge: 3600000 },
    name: process.env.npm_package_name,
    store: new MemoryStore({ checkPeriod: 3600000 }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// Routes.
app.get('/', (request, response) => {
    response.render('connexion', {
        title: 'Connexion',
        scripts: ['/js/connexion.js'],
        isAuthenticated: request.isAuthenticated(),
        isListRoute: true
    });
});

app.get('/inscription', (request, response) => {
    response.render('inscription', {
        title: 'Inscription',
        scripts: ['/js/inscription.js'],
        isAuthenticated: request.isAuthenticated(),
        isListRoute: true
    });
});

app.get('/liste', assureAuthentication, async (request, response) => {
    try {
      const jeux = await getJeux();
      response.render('liste', {
        title: 'Jeux vidéo',
        isAuthenticated: request.isAuthenticated(),
        jeux: jeux
      });
    } catch (error) {
      console.error('erreur de generation des jeux:', error);
      response.status(500).send('server erreur');
    }
  });

app.post('/inscription', async (request, response, next) => {
    if(isIdentifiantValid(request.body.identifiant) && 
       isMotPasseValid(request.body.motPasse)) {
        try {
            await addUtilisateur(
                request.body.identifiant, 
                request.body.motPasse
            );

            response.status(201).end();
        }
        catch(erreur) {
            if(erreur.code === 'SQLITE_CONSTRAINT') {
                response.status(409).end();
            }
            else {
                next(erreur);
            }
        }
    }
    else {
        response.status(200).end();
    }
});
app.post('/connexion', (request, response, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            next(error);
        }
        else if (!user) {
            response.status(401).json(info);
        }
        else {
            request.logIn(user, (error) => {
                if (error) {
                    next(error);
                }

                response.sendStatus(200);
            });
        }
    })(request, response, next);
});

app.post('/deconnexion', (request, response) => {
    request.logOut((error) => {
        if (error) {
            next(error);
        }

        response.redirect('/');
    });
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${ process.env.PORT }`);
