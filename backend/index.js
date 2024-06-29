import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';

import { User, Community, Posts, Comments } from './models/models.js';

const app = express();
const port = process.env.PORT || 8000;
const saltRounds = 10

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsConfig));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        // Remove the domain attribute for localhost
        httpOnly: true,
        sameSite: 'lax',
        secure: false // Make sure this is false for development without HTTPS
    },
}));

app.use(passport.initialize());
app.use(passport.session());



mongoose.connect("mongodb://127.0.0.1:27017/CommUnityDB");

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Hello World"
    });
});


app.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    try {
        const emailCheck = await User.findOne({ email: email });
        if (emailCheck) {
            return res.status(200).json({ message: "An account with this email address already exists. Please log in or use a different email." });
        }
        const usernameCheck = await User.findOne({ username: username });
        if (usernameCheck) {
            return res.status(200).json({ message: "The username you have chosen is already taken. Please choose a different username." });
        }

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Please try again later." });
            }
            else {
                const newUser = new User({
                    email: email,
                    password: hash,
                    username: username
                });
                newUser.save();
                req.login(newUser, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: "Please try again later." });
                    }
                    else {
                        return res.status(200).json({ message: "success" });
                    }
                });
            }
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Please try again later." });
    }
});

app.post('/login', function (req, res, next) {
    passport.authenticate('local', { failureMessage: true }, function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(200).json({ message: info.message });
        }
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Please try again later." });
            }
            else {
                console.log(req.isAuthenticated());
                return res.status(200).json({ message: "success" });
            }
        })
    })(req, res, next);
});

app.get('/isAuthenticated', (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        const user = {
            id: req.user._id,
            email: req.user.email,
            username: req.user.username,
            avatarURL: req.user.avatarURL,
            followingCommunityIDs: req.user.communityIDs,
            likedPosts: req.user.likedPosts
        };
        return res.status(200).json({ message: true, user: user });
    }
    else {
        return res.status(200).json({ message: false });
    }

});

app.get('/logout', (req, res) => {
    console.log('logout');
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Please try again later." });
        }
        else {
            return res.status(200).json({ message: true });
        }
    });
})

// passport local strategy

passport.use(new Strategy(async function verify(username, password, cb) {
    try {
        const user = await User.findOne({ email: username });
        if (!user) {
            return cb(null, false, { message: "No account found with this email address. Please check the email or register for a new account." });
        }

        bcrypt.compare(password, user.password, (err, success) => {
            if (err) {
                console.log(err);
                return cb(err);
            }
            else {
                if (success) {
                    return cb(null, user);
                }
                else {
                    return cb(null, false, { message: "The password you entered is incorrect. Please try again." });
                }
            }
        });
    }
    catch (err) {
        console.log(err);
        return cb(err);
    }
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});


app.listen(port, () => {
    console.log(`Server running of port ${port}`);
});