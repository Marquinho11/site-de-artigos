const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const Slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');

router.get("/articles",(req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then((articles) => {
   res.render('admin/articles/index',{articles});
});
});

router.get("/admin/articles",adminAuth,(req, res)=>{
    Category.findAll().then(category => {
        res.render("admin/articles/new", {
            categories: category
        });
    })
    
});

router.post('/articles/save',(req, res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    var arquivo = req.body.arquivo;

    Article.create({
        title: title,
        slug: Slugify(title),
        body: body,
        arquivo: arquivo,
        categoryId: category
    }).then(()=>{
        res.redirect("/articles");

    });
});

router.post('/articles/delete',(req, res) => {
    var id = req.body.id;
    if(id !=undefined){
        if(!isNaN(id)){
            Article.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.redirect('/articles');
            });
        
        }else{
            res.redirect('/articles');
        } 
    }else {
        res.redirect('/articles');
    }
});



module.exports = router;