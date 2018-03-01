var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var dbFile = './ICD10.db';

// Setup database:




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getAllTblCategory', function(req,res,next){

// Initialize the database:
    var db = new sqlite3.Database(dbFile);

    var data =  db.all("select * from tblCategory",function (err,rows) {
        if(err){
            console.log(err);
            res.send(err);

        }else{
            res.send({"rows": rows });
        }
        db.close()
    });

});


router.get('/getTblSubCategory', function(req,res,next){

// Initialize the database:
    var db = new sqlite3.Database(dbFile);
    var categoryID = req.query["categoryID"];

    var data =  db.all("select * from tblSubCategory where CategoryID=?",[categoryID],function (err,rows) {
        if(err){
            console.log(err);
            res.send(err);

        }else{
            res.send({"rows": rows });
        }
        db.close()
    });

});

router.get('/getTblDiseaseList', function(req,res,next){

// Initialize the database:
    var db = new sqlite3.Database(dbFile);
    var categoryID = req.query["categoryID"]
    var subCatID = req.query["subCatID"];

    var data =  db.all("select * from tblDisease where cat=? and SubCatID=?",[categoryID,subCatID],function (err,rows) {
        if(err){
            console.log(err);
            res.send(err);

        }else{
            res.send({"rows": rows });
        }
        db.close()
    });

});


router.get('/getTableDescription', function(req,res,next){
// Initialize the database:
    var db = new sqlite3.Database(dbFile);
    var DescID = req.query["DescID"]
    var data =  db.all("select * from tableDescription where DescID=? order by code asc",[DescID],function (err,rows) {
        if(err){
            console.log(err);
            res.send(err);

        }else{
            res.send({"rows": rows });
        }
        db.close()
    });

});

router.get('/getTableDescriptionWithCode', function(req,res,next){
// Initialize the database:
    var db = new sqlite3.Database(dbFile);
    var code = req.query["code"]

    var data =  db.all("select * from tableDescription where code=?",[code],function (err,rows) {
        if(err){
            console.log(err);
            res.send(err);

        }else{
            res.send({"rows": rows });
        }
        db.close()
    });
});





module.exports = router;
