var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var mongo = require('mongoose');

var app = express();

var db = mongo.connect("mongodb://alphauser:alphauser1@ds239071.mlab.com:39071/pushpak-db", function (err, response) {
    if (err)
        console.log("Error in connecting to pushpak-db : error is : " + err);
    console.log("Successfully connected to " + db + " : response : " + response);
});

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json({limit:'5mb'}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
    name: { type: String },
    address: { type: String }
}, { versionKey: false });

var model = mongo.model("users", UsersSchema, "users");

app.post("/api/SaveUser", function (req, res) {
    var currModel = new model(req.body);
    if (req.body.mode == "Save") {
        currModel.save(function (err, data) {
            if (err)
                console.log("error in api /api/SaveUser : error : ", err);
            res.send("Document inserted successfully!!");
        })
    }
    else{
        model.findByIdAndUpdate(req.body.id, function(err, doc){
            if(err)
            console.log("findByIdAndUpdate error here : err : "+err);
            res.send("Document updated successfully!!!!!");
        })
    }
});

app.post("/api/deleteUser", function(req, res){
    model.remove({_id: req.body.id}, function(err, responseDB){
        if(err)
        console.log("Error in api /api/deleteUser : err : ",err);
        res.send("**********User deleted successfully**************")
    })

});

app.get("/api/Users", function(req, res){
model.find({}, function(err, docs){
    if(err)
    console.log("Error in getting all users ** err : ",err)
    res.send(docs);
})
})


app.listen(8080, function () {
    console.log("App listening on port : 8080");
});

