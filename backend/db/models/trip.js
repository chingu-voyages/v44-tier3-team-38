"use strict";
module.exports = (sequelize, DataTypes) => {
  console.log(sequelize);
  const Trip = sequelize.define(
    "Trip",
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {}
  );
  Trip.associate = function (models) {
    // associations can be defined here
  };
  return Trip;
};
