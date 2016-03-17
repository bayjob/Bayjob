'use strict';
module.exports = function(sequelize, DataTypes) {
  var Niveau_etude = sequelize.define('Niveau_etude', {
    intitule: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Niveau_etude.hasMany(models.Offre);
        Niveau_etude.hasMany(models.CV);
      }
    }
  });
  return Niveau_etude;
};