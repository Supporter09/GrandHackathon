import { createRequire } from 'module';
const require = createRequire(import.meta.url);
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
app.use("/", express.Router());

//routing

app.get('/',(req,res) => {
    let images_list =["https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80","https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1056&q=80","https://images.unsplash.com/photo-1519419166318-4f5c601b8e6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80","https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80","https://images.unsplash.com/photo-1555323912-3526a765162b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80","https://images.unsplash.com/photo-1515615200917-f9623be1d8b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80","https://images.unsplash.com/photo-1507325670434-aa8da9a9626c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=913&q=80","https://images.unsplash.com/photo-1518548235008-15c2e3a4fdd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1056&q=80","https://images.unsplash.com/photo-1485548125564-21b2276a644a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=80","https://images.unsplash.com/photo-1485359466996-ba9d9b4958b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"]
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
                    data: doc.data(),
                    image: images_list[Math.floor(Math.random() * 9)]
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
    console.log(req.body);
    var infos = {
        comments:[],
        title:input_data.title,
        email: input_data.email,
        name : input_data.name,
        question: input_data.message,
        owned : "NULL",
        subject : input_data.subject,
        timePosted : date,
        likes : 0
    };
    db.collection('Posts').add(infos).then(() => {
        return res.render('redirect', {mess : 'Your post has been submitted successfully', link : "./"});
    })

});

app.get('/post',(req,res) => {
    let postID = req.query.id;
    console.log(postID);
    db.collection('Posts')
        .doc(postID)
        .get()
        .then((dat) => {
            // console.log(dat.data());
            var data = dat.data();
            data.comments = data.comments.sort((a,b) => {
                return !(new Date(b.time) - new Date(a.time));
            })
            console.log(data);
            res.render('single-post-1', {data: data});
        })
        .catch((err) => {
            console.log(err);
            return res.end();
        })
})

app.post('/post',(req,res) => {
    let postID = req.query.id;
    const input_data = req.body;
    var date = new Date(Date.now());
    const new_comment = {
        name: input_data.contact_form_name,
        email: input_data.contact_form_email,
        likes:0,
        content: input_data.contact_form_message,
        time:date.toGMTString()
    }
    const comments_array = db.collection('Posts').doc(`${postID}`).update({
        comments: firebase.firestore.FieldValue.arrayUnion(new_comment)
    }).then( () => {
        return res.render('redirect',{
            mess: "Your comment has been posted succesfully",
            link:  `./post?id=${postID}`
        })
    });
    // const add_new_comment = await comments_array.update()
})
//main program
console.log('listening on port http://localhost:3000');
app.listen(port);
