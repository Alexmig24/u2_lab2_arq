const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Elenco = sequelize.define('Elenco', {});

module.exports = Elenco;