'use strict';
module.exports = function(sequelize, DataTypes) {
  var Offre = sequelize.define('Offre', {
    titre: DataTypes.STRING,
    xpRequise: DataTypes.STRING,
    tempDeTravail: DataTypes.INTEGER,
    resume: DataTypes.TEXT,
    salaire: DataTypes.FLOAT,
    ville: DataTypes.STRING,
    dateEmission: DataTypes.DATE,
    handicap: DataTypes.BOOLEAN,
    mail: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Offre.belongsTo(models.Recruteur);
        Offre.belongsTo(models.Departement);
        Offre.belongsTo(models.Contrat_type);
        Offre.belongsTo(models.Niveau_etude);
        Offre.hasMany(models.Mission_offre);
        Offre.hasMany(models.Competence_offre);
      }
    }
  });
  return Offre;
};