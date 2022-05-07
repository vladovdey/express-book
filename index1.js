const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.get('/form', (req, res)=>{
    res.type('html');
    res.sendFile('/Users/vladovdey/my-projects/express-learning/public/form.html');
});

app.get('/formt', (req, res)=>{
    res.send('testing');
});

app.get('/promise', (req, res)=>{
    res.type('html');
    res.sendFile('/Users/vladovdey/my-projects/express-learning/public/promise.html');
});

app.post('/form-processing', (req, res)=>{
    console.log(req.query);
    if(req.body){
        console.log(req.body);
        res.redirect(301, '/form');
    }
});

app.post('/promise-processing', (req, res)=>{
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Server started on port ` + PORT);
});