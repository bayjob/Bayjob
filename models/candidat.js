'use strict';
module.exports = function(sequelize, DataTypes) {
  var Candidat = sequelize.define('Candidat', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    telFixe: DataTypes.STRING,
    telMobile: DataTypes.STRING,
    adresse: DataTypes.STRING,
    cp: DataTypes.STRING,
    ville: DataTypes.STRING,
    pays: DataTypes.STRING,
    mobilite: DataTypes.STRING,
    dateNaissance: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Candidat.hasMany(models.CV);
        Candidat.belongsTo(models.Departement);
        Candidat.belongsTo(models.Pays);
      }
    }
  });
  return Candidat;
};
