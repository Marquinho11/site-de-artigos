const express = require('express');
const app = express();
const connect = require('./database/data');
const BodyParser = require('body-parser');
const Categories = require('./categories/CategoriesController');
const ArticleController = require('./articles/articlesController');
const Article = require("./articles/Article");
const Category = require('./categories/Category');
const UserController = require('./user/UserController');
const User = require("./user/User");
const session = require('express-session');
const adminAuth = require('./middlewares/adminAuth'); //para verificar se usuario esta logado ou não
const port = process.env.PORT || 3000;


//Configuração de url e identificação de arquivo html
app.set('view engine', 'ejs');
//configuração de tempo authenticação
app.use(session({
    secret: 'qualquer coisa', cookie:{maxAge:30000}
}));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static(__dirname + 'public'));
app.use(express.static(__dirname + 'public/tinymce/tinymce.min.js'));

//config da sessão


app.use("/", Categories);
app.use("/", ArticleController);
app.use("/", UserController);
connect.authenticate().then(()=>{});

app.get("/", adminAuth,(req, res)=>{
    res.render("home");
});


app.listen(port,()=>{
    console.log(`Servidor ligado http://localhost:${port}`);
});