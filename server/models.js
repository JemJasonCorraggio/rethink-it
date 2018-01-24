const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const thoughtSchema = mongoose.Schema({
    username: String,
    password: String,
    thoughts:[ {
        mode: String,
        triggers:String,
        thought: String,
        rethought: String
    }]
});
thoughtSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

thoughtSchema.statics.hashPassword= function(password) {
  return bcrypt.hash(password, 10);
};

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = {Thought};