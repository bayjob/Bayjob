'use strict';
module.exports = function(sequelize, DataTypes) {
  var Experience_pro = sequelize.define('Experience_pro', {
    entreprise: DataTypes.STRING,
    poste: DataTypes.STRING,
    duree: DataTypes.STRING,
    datedebut:DataTypes.DATE,
    datefin:DataTypes.DATE,
    ville: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Experience_pro.belongsTo(models.CV);
        Experience_pro.belongsTo(models.Contrat_type);
        Experience_pro.hasMany(models.Mission_CV);
        Experience_pro.belongsTo(models.Pays);

      }
    }
  });
  return Experience_pro;
};