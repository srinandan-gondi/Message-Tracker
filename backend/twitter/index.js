const util = require('util');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { Strategy } = require('@superfaceai/passport-twitter-oauth2');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const EXIT_ON_SUCCESS = true;

function onAuthSuccess({ accessToken, refreshToken }) {
    if (process.stdout.isTTY) {
        console.error(`\nPaste this into "tokens.json" file:`);
    }

    console.log(JSON.stringify({ accessToken, refreshToken }));

    if (EXIT_ON_SUCCESS) {
        setTimeout(() => {
            process.exit();
        }, 1000);
    }
}


// <1> Serialization and deserialization
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Use the Twitter OAuth2 strategy within Passport
passport.use(
    // <2> Strategy initialization
    new Strategy(
        {
            clientID: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
            clientType: 'confidential',
            callbackURL: `${process.env.BASE_URL}/auth/twitter/callback`,
        },
        // <3> Verify callback
        (accessToken, refreshToken, user, done) => {

            onAuthSuccess({ accessToken, refreshToken });

            // console.log('Success!', { accessToken, refreshToken });
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            // console.log(user);
            return done(null, user);
        }
    )
);

const app = express();
app.use(cors());
app.use(cookieParser());
app.set('view engine', 'ejs')
// <4> Passport and session middleware initialization
app.use(
    session({ secret: 'keyboard cat', resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());


// app.get("/", (req, res) => {
//   res.render("./index.ejs");
// })

// <5> Start authentication flow
app.get(
    '/auth/twitter',
    passport.authenticate('twitter', {
        // <6> Scopes
        scope: ['tweet.read', 'users.read', 'offline.access'],
    })
);

// <7> Callback handler
app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', {
        scope: ['tweet.read', 'users.read', 'offline.access'],
        failureRedirect: '/auth/twitter/failure'
    }),
    function (req, res) {
        if (req.user) {
            const userData = JSON.stringify(req.user, undefined, 2);
            const accessToken = req.user.accessToken;
            const refreshToken = req.user.refreshToken;

            res.cookie('twitter-access-token', accessToken, {httpOnly: true});
            res.cookie('twitter-refresh-token', refreshToken, {httpOnly: true});
            res.send(
                `<h1>Authentication succeeded</h1> User data: <pre>${userData} \n access token: ${accessToken} \n refresh token: ${refreshToken} </pre>`
            );
        } else {
            res.send('<h1>Authentication failed</h1>');
        }




        // res.redirect('/auth/twitter');

    }
);

app.get('/auth/twitter/failure', (req, res) => {
    res.send(`
    <script>
      alert('Authentication denied. You can close this window now.');
      window.close();  // This will close the OAuth window.
    </script>
  `);
});

// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.end(
//     `<h1>Error</h1><pre>${util.format(err)}</pre><a href='/'>Try again?</a>`
//   );
// });


app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});











// // self.importScripts('config.js', 'auth.js');
// import config from "./config.js"
// import { getAuthUrl, getAccessToken } from "./auth.js";
// // import auth from "./auth.js"




// const express = require("express");
// const app = express();

// const passport = require("passport-oauth2");

// const PORT = 3000;

// const TWITTER_API_BASE = 'https://api.twitter.com/2';
// const MAX_RESULTS = 50;

// app.get("/", (req, res) => {
//     res.render("./index.ejs")
// })

// app.get("/login", passport.authenticate("twitter"));






// app.listen(PORT);