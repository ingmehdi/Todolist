const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//cnx to database

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('TodoDb');
        closure(db);
    });
};
//get data by id users 
app.get('/:id/todos',(req,res)=>{
    
    let query = {_id:ObjectID(req.params.id)};
    connection(db=>{
        db.collection('users').findOne(query,(err,result)=>{
            if(err) res.send(err);
            res.send(result.todos);
        })
    })
})
//insert data in db
app.post('/',(req,res)=>{
    connection(db=>{
        //(req.body) format JSON to insert data
        db.collection('users').insert(req.body,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    })
})
//get a require list by number
app.listen(port,(err)=>{
    if(err)throw err;
    console.log(' Done'+port);
})




