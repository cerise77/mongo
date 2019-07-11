const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

let dbClient;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("test").collection("humans");
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.get("/api/humans", function(req, res){

    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, users){

        if(err) return console.log(err);
        res.send(users)
    });

});
