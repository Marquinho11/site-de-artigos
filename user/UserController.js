const express = require('express');
const router = express.Router();
const User =  require('./User');
const bcryptjs = require('bcryptjs');//para dificultar a visualização de senha do usuario


router.get('/admin/users', (req, res) => {
    res.render('admin/users/UsuarioCadastrado');
});

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/formulariodecadastro');
  
});
//função para criar usuario
router.post("/users/create", (req, res) => {
    var email = req.body.username;
    var password = req.body.password;
    //para verificar se o usuario ja tem cadastro
    User.findOne({where: {email: email}}).then(user=>{
        if(user == undefined){
            var salt = bcryptjs.genSaltSync(10);// GERA UMA DIFICULDADE
            var hash = bcryptjs.hashSync(password, salt); //PARA GERAR A SENHA
            User.create({
                email: email,
                senha: hash
            }).then(()=>{
                res.redirect('/admin/users');
            });
        
        }else{
            res.redirect('/admin/users/create');
        }
    });});

router.get('/login', (req, res) => {
    res.render("admin/users/login");
});
 //essa função verifica se o usuario já esta logado
router.post('/authenticate', (req, res) => {
    //essa funçao esta authenticando o usuario em uma sessão
    var email = req.body.username;
    var password = req.body.password;
    User.findOne({where: {email: email}}).then(user => {
        if(user != undefined){
            var correct = bcryptjs.compareSync(password, user.senha);//para compara se a senha do usuario está certa
            if(correct){
                req.session.user = user;
            }
            res.redirect('/')
        }else{
            res.redirect('/admin/users/login');
        }
    });

});

//função para deslogar
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');

});
module.exports = router;