import 'babel-polyfill';
import express from 'express';

console.log(`Server running in ${process.env.NODE_ENV} mode`);
var app = express();



const bodyParser = require('body-parser');
require('dotenv').config();

const mongoose = require('mongoose');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const {DATABASE_URL, PORT} = require('../config');
const {Thought} = require('./models');
const {JWT_SECRET} = require('../config');
const passport = require('passport');
const {BasicStrategy} = require('passport-http');
const {
    // Assigns the Strategy export to the name JwtStrategy using object
    // destructuring
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_to_new_variable_names
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');
function createAuthToken( user) {
    var token = jwt.sign({user}, JWT_SECRET, {
        subject: user.username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
    return token;
}
const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        // Look for the JWT as a Bearer auth header
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        // Only allow HS256 tokens - the same as the ones we issue
        algorithms: ['HS256']
    },
    (payload, done) => {
        done(null, payload.user);
    }
);
const basicStrategy = new BasicStrategy((username, password, callback) => {
    let user;
    Thought.findOne({username: username})
        .then(_user => {
            user = _user;
            if (!user) {
                // Return a rejected promise so we break out of the chain of .thens.
                // Any errors like this will be handled in the catch block.
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                });
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                });
            }
            return callback(null, user);
        })
        .catch(err => {
            if (err.reason === 'LoginError') {
                return callback(null, false, err);
            }
            return callback(err, false);
        });
});
app.use(express.static(process.env.CLIENT_PATH||"../client"));
app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);
app.use(morgan('common'));

app.use(bodyParser.json());

mongoose.Promise = global.Promise;
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  next();
});
app.post(
    '/login',
    // The user provides a username and password to login
    passport.authenticate('basic', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user);
        res.json({token: authToken,
            data: req.user.thoughts
        });
    }
);
 app.put("/update", passport.authenticate('jwt', {session: false}), (req,res)=>{
    let user;
    Thought.findOne({username: req.body.username})
        .then(_user => {
            user = _user;
            if(!user.thoughts[req.body.index]){user.thoughts[req.body.index]= {};}
            if(req.body.triggers){user.thoughts[req.body.index].triggers = req.body.triggers;}
           if(req.body.thought){user.thoughts[req.body.index].thought = req.body.thought;}
           if(req.body.rethought){user.thoughts[req.body.index].rethought = req.body.rethought;}
           return Thought.findOneAndUpdate({username: user.username}, user, {returnNewDocument: true})
           .then(newUser=>{
        res.json({data: user.thoughts});});
        });
});   

app.post('/sign-up', (req, res) => {
  const requiredFields = ['username', 'password'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(req.body[field])) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send({message: message});
    }
  }
  Thought.findOne({username: req.body.username})
  .then(user=>{
  if (user){
      const message = `This username already exists`;
      console.error(message);
      return res.status(400).send({message: message});
  }
  else{
      return Thought.hashPassword(req.body.password).then(password=>
   Thought.create({
      username: req.body.username,
      password: password,
      thoughts: [{mode: "standard", triggers: req.body.triggers, thought: req.body.thought, rethought:req.body.rethought}]
    })
    )
    .then(user => {
        const authToken = createAuthToken(user);
        res.status(201).json({user: user, token: authToken});
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });
  }});
});
let server;

function runServer(databaseUrl, port=PORT) {
    if(!databaseUrl){
        databaseUrl=DATABASE_URL;
    }
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer, jwtStrategy};





