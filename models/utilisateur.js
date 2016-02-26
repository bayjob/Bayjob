'use strict';
module.exports = function(sequelize, DataTypes) {
  var Utilisateur = sequelize.define('Utilisateur', {
    mail: DataTypes.STRING,
    mdp: DataTypes.STRING,
    type: DataTypes.CHAR(1)
  }, {
    classMethods: {
      associate: function(models) {
        Utilisateur.hasOne(models.Candidat);
        Utilisateur.hasOne(models.Recruteur);
      }
    }
  });
  return Utilisateur;
};