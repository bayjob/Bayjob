'use strict';
module.exports = function(sequelize, DataTypes) {
    var Departement = sequelize.define('Departement', {
        id: { type: DataTypes.STRING, primaryKey: true, },
        intitule: DataTypes.STRING
    } ,{
        classMethods: {
            associate: function(models) {
                Departement.belongsTo(models.Region);
                Departement.hasMany(models.Candidat);
                Departement.hasMany(models.Recruteur);
            }
        }
    });
    return Departement;
};