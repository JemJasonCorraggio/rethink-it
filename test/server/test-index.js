
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {jwtStrategy}= require("../../server/index.js");
passport.use(jwtStrategy);
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config');

// this makes the should syntax available throughout
// this module
const should = chai.should();

const {Thought} = require('../../server/models');
const {app, runServer, closeServer} = require('../../server/index');
const {TEST_DATABASE_URL} = require('../../config');


chai.use(chaiHttp);
function seedThoughtData() {
var promiseArray = [];
  for (let i=1; i<=10; i++) {
 promiseArray.push(createThoughtData());
  }
  // this will return a promise
  return Promise.all(promiseArray);
}

function createThoughtData(){
         var newThought =generateThoughtData(Math.floor(Math.random()*5)+1);
      var username=newThought.username;
      var thoughts = newThought.thoughts;
      return Thought.hashPassword(newThought.password).then(password=>
      Thought.create({
          username,
          password,
          thoughts
      })
      );
    
}

// can be used to generate seed data for db
// or request.body data
function generateThoughtData(int) {
    var thoughts = [];
    for(var i = 0; i<int; i++){
        thoughts.push({
            triggers: faker.lorem.words(),
            thought: faker.lorem.words(),
            rethought: faker.lorem.words()
        });
    }
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    thoughts
  };
}


// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
// around for next one
function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Sever', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
 beforeEach(function() {
    return seedThoughtData();
  });

  afterEach(function() {
    return tearDownDb();
  });
    after(function() {
        return closeServer();
    });

    it('should add a new user', function() {

      const newUser = generateThoughtData(1);

      return chai.request(app)
        .post('/sign-up')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys('user', 'token');
          res.body.user.username.should.equal(newUser.username);
          // cause Mongo should have created id on insertion
          res.body.user._id.should.not.be.null;
          res.body.user.thoughts.should.be.an("array");
          return bcrypt.compare(newUser.password, res.body.user.password)
          .then((res)=>{
          res.should.be.true;
          });
        });
    });
    it('Should return a valid auth token when correct credentials are given to /login', function() {
        let user = generateThoughtData(Math.floor(Math.random()*5)+1);
        return Thought.hashPassword(user.password)
        .then(password=>
        Thought.create({
            username: user.username,
            password: password,
            thoughts: user.thoughts
        })
            .then(function(){
            return chai
                .request(app)
                .post('/login')
                .auth(user.username, user.password)
                .then(res => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    const token = res.body.token;
                    token.should.be.a('string');
                    const payload = jwt.verify(token, JWT_SECRET, {
                        algorithm: ['HS256']
                    });
                    payload.user.should.contain({
                        username: user.username,
                        password: password
                    });
                });
        }));
        });
        it('Should update protected data at /update', function() {
         
            let user = generateThoughtData(Math.floor(Math.random()*5)+1);
            let update = {index: 0, triggers: faker.lorem.words(), thought: faker.lorem.words(), rethought: faker.lorem.words()};
        return Thought.hashPassword(user.password)
        .then(password=>{
        return Thought.create({
            username: user.username,
            password: password,
            thoughts: user.thoughts
        })
            .then(function(){
                update.username=user.username;
                const token = jwt.sign({user}, JWT_SECRET, {
                        subject: user.username,
                        expiresIn: '7d',
                        algorithm: 'HS256'
                    });
                return chai
                .request(app)
                .put('/update')
                .set('authorization', `Bearer ${token}`)
                .send(update)
                .then(res => {
                    res.should.have.status(200);
                    res.body.data.thoughts[0].triggers.should.equal(update.triggers);
                    res.body.data.thoughts[0].thought.should.equal(update.thought);
                    res.body.data.thoughts[0].rethought.should.equal(update.rethought);
                })
                .catch(e => console.log(e, '!!!'));
            })
            .catch(e => console.log(e, '!!!'));
        })
        .catch(e => console.log(e, '!!!'));
         });
})