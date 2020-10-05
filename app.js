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

//app settings
app.engine('html', cons.swig)
app.set('views','./views');
app.set('view engine', 'html');
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
    res.render('index');
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
        Email: input_data.email,
        Name : input_data.name,
        Question: input_data.message,
        owned : "NULL",
        timePosted : date
    };
    db.collection('Posts').add(infos).then(()=>{
        res.send('your queries have been recieved');
    });
    ;
})


app.get('/post',(req,res) => {
    res.render('single-post-1');
})

//main program
console.log('listen on port http://localhost:3000');
app.listen(port);