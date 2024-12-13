//função para dar permissão as pagina se o usuario estiver logado
function adminAuth(req,res,next){
    if(req.session.user != undefined){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = adminAuth;