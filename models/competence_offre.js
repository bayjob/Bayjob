'use strict';
module.exports = function(sequelize, DataTypes) {
  var Competence_offre = sequelize.define('Competence_offre', {
    intitule: DataTypes.STRING,
    niveau: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Competence_offre.belongsTo(models.Offre);
      }
    }
  });
  return Competence_offre;
};

