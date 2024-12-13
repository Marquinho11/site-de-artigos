const express = require('express');
const router = express.Router();
const Category = require("./Category");
const slugify = require('slugify');


router.get("/admin/categories/new",(req, res)=>{
    res.render("admin/categories/new");
});

router.post("/categories/save",(req, res)=>{
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title:title,
            slug: slugify(title)
        }).then(()=>{
            res.render("sucesso");
        });
    }else{
        res.redirect("/admin/categories/new");
    }
});

router.get("/categories/mostra",(req, res)=>{
    //para pegar os dados do banco e mostra na pagina html
    Category.findAll().then(categories => {
        res.render("index",{
            categories:categories
        })
    });
});

router.post('/categories/delete',(req, res)=>{
    var id = req.body.id;
    //para verificar se o id é nulo
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/categories/mostra");
            });
        }else{
            res.redirect('/categories/mostra');
        }
    }else{
        res.redirect('/categories/mostra');

    }
});

router.get('/categories/edit/:id', (req, res) => {
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect('/categories/mostra');
    }
    Category.findByPk(id).then(categoria =>{
        if(categoria != undefined){
            res.render("admin/categories/edit",{
                categoria:categoria
            })

        }else{
            res.redirect('/categories/mostra');
        }
    }).catch(err =>{
        res.redirect('/categories/mostra');
    });
})

router.post("/categories/update",(req, res)=>{
    var id = req.body.id;
    var title = req.body.title;
   
    Category.update({title: title}, {
        where: { id: id }
    }).then(()=>{
        res.redirect("/categories/mostra");
    });

});

module.exports = router;