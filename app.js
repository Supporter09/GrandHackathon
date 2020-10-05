const express = require('express');
const router = express.Router();
const port = 3000;
const app = express();
const cons = require('consolidate');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

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


app.post('/upload-question',(req,res) => {
    console.log(req.body);
    res.send('your queries have been recieved');
})

console.log('listen on port http://localhost:3000');
app.listen(port);