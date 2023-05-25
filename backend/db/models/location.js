'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    tripId: DataTypes.INTEGER,
    name: DataTypes.STRING, 
    address: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsTo(models.Trip, {
      foreignKey: 'tripId'
    });
  };
  return Location;
};