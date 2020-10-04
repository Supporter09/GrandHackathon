const express = require('express');
const router = express.Router();
const port = 3000;
const app = express();
const cons = require('consolidate');

app.engine('html', cons.swig)
app.set('views','./views');
app.set('view engine', 'html');
app.use(express.static('public'));
app.get('/',(req,res) => {
    res.render('index');
})
console.log('listen on port localhost:3000');
app.listen(port);