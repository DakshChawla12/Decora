const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Region_Country = sequelize.define('Region_Country', {
            reggionid: {
        type: DataTypes.INTEGER,
        allowNull:false
        
        
    },
    countryid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Region_Country;



