'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    utilisateurSession: DataTypes.STRING,
    choix:DataTypes.BOOLEAN,
    reponse:DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Notification.belongsTo(models.CV);
        Notification.belongsTo(models.Offre);
      }
    }
  });
  return Notification;
};