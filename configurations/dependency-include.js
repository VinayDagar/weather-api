/*
 * Requirement - include all the global variables and module required by the application
 */

global.Logger = require('../utilities/logger-utility');
global.Joi = require('joi');

global.configHolder = {};

global.Mongoose = require('mongoose');
global.MongooseSchema = Mongoose.Schema;

global.MongooseConnect = require('./datasource.js')();
global.domain = require('../db/models');

global.views = require("../application/views");

configHolder.jwtUtility = require('../utilities/jwt-utility');
configHolder.encryptUtility = require('../utilities/encrypt-utility');

module.exports = configHolder;
