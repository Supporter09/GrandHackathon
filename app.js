// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const firebase = require('firebase-admin');
// import * from 'firebase';
// const firebase = require('firebase/app');
// require('firebase/database');
// require('firebase/analytics');
var firebaseConfig = {
    apiKey: "AIzaSyCZ67Ve4ozcjpLZYsE_zxDSL1JkCZrq2aY",
    authDomain: "grandhackathon.firebaseapp.com",
    databaseURL: "https://grandhackathon.firebaseio.com",
    projectId: "grandhackathon",
    storageBucket: "grandhackathon.appspot.com",
    messagingSenderId: "887814491453",
    appId: "1:887814491453:web:1fa02eaaa1757e0d1d8954",
    measurementId: "G-27KZCG9X9T"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true});
  
//   var storageRef = firebase.storage().ref();
//firebase thing-yy;



//declare vars
const express = require('express');
const router = express.Router();
const port = 3000;
const app = express();
const cons = require('consolidate');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
// const firebase_timestamp = new firebase.firestore.Timestamp;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.set('views','./views');
app.use(express.static('public'));
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

//routing

app.get('/',(req,res) => {
    let data = [];
    // res.render('index',{post : data});
    db.collection('Posts')
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                var query = {
                    id: doc.id,
                    data: doc.data()
                };
                data.push(query);
            });
        })
        .then(()=>{res.render('index',{post: data})})
        .catch(function(error){
            console.log(error);
        })
})


app.get('/upload-question',(req,res) => {
    res.render('ques-upload');
});


app.get('/sign_in',(req,res) => {
    res.render('sign_in');
})

app.get('/sign_up', (req,res) => {
    res.render('sign_up');
})

app.get('/blank-static', (req,res) => {
    res.render('blank-static');
})

app.post('/upload-question',(req,res) => {
    console.log(req.body);
    const input_data = req.body;
    var date = new Date(Date.now());
    console.log(date);
    var infos = {
        Comments:[{Content:"null",Email:"null",Likes:0,Name:"Duc Bui",Time:"some thing here"}],
        title:input_data.title,
        Email: input_data.email,
        Name : input_data.name,
        Question: input_data.message,
        owned : "NULL",
        timePosted : date
    };
    db.collection('Posts').add(infos).then(()=>{
        res.send('your queries have been recieved');
    }).then(
        res.redirect('./')
    );
    
});

app.get('/post/:postID',(req,res) => {
    let postID = req.params.postID;
    db.collection('Posts')
        .doc(postID)
        .get()
        .then((dat) => {
            console.log(dat.data());
            res.render('single-post-1', {data: dat.data()});
        })
        .catch((err) => {
            console.log(err);
            return res.end();
        })
})

//main program
console.log('listening on port http://localhost:3000');
app.listen(port);