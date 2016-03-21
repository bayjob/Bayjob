/**
 * Created by Antoine Lecoustre on 08/02/2016.
 */
var models = require('../models');
var express = require('express');
var session = require('express-session');
var crypto = require('crypto');
var router = express.Router();

var sess;
/* GET users listing. */
router.get('/', function (req, res, next) {
    /* Si un utilisateur est connecte on le renvoie vers son espace*/
    if (req.session && req.session.user) {
        if (req.session.type === 'C') {
            res.redirect('/espaceCandidat');
        } else {
            res.redirect('/espaceRecruteur');
        }
    /* sinon */
    } else {
        res.render('login', {title: 'Connexion', email: null, mdp: null, message: null, session: null});
    }

});

/* Action executee lorsque l'utilisateur se connecte */
router.post('/', function (req, res) {
    models.Utilisateur.findOne({
        where: {mail: req.body.email}
    }).then(function (utilisateur) {
        /* Si l utilisateur a saisi le bon mdp et le bon mail*/
        if (utilisateur && req.body.email === utilisateur.mail && crypto.createHash('md5').update(req.body.mdp).digest("hex") === utilisateur.mdp) {
            req.session.user = utilisateur.id;
            req.session.mail = utilisateur.mail;
            req.session.type = utilisateur.type;
            /* Si c est un candidat on le redirige vers son espace*/
            if (req.session.type === "C") {
                res.redirect("/espaceCandidat");
            /* Sinon celui du recruteur*/
            } else {
                res.redirect("/espaceRecruteur");
            }
        /*Sinon on affich l'erreur*/
        } else {
            var message = 'Login et/ou mot de passe incorrecte. Veuillez re-saisir vos identifiants'
            res.render('login', {title: 'Connexion', email: null, mdp: null, message: message, session: null});
        }
    });
});
module.exports = router;