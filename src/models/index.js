const sequelize = require('../config/database');
const User = require('./User');
const Conversation = require('./Conversation');
const Message = require('./Message');

// Associations
User.hasMany(Conversation);
Conversation.belongsTo(User);
Conversation.hasMany(Message);
Message.belongsTo(Conversation);

module.exports = {
  sequelize,
  User,
  Conversation,
  Message
};