'use strict';
module.exports = function(sequelize, DataTypes) {
    var Pays = sequelize.define('Pays', {
        intitule: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Pays.hasMany(models.Recruteur);
                Pays.hasMany(models.Candidat);
                Pays.hasMany(models.Experience_pro);
            }
        }
    });
    return Pays;
};