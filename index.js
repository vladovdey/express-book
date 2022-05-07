const express = require('express');
const expressHandlebars = require('express-handlebars')

const PORT = 8000

const app = express()

const randArr = [
 'Раз',
 'Два',
 'Три'
]

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => { res.render('home') })
app.get('/about', (req, res) => { 
    let random = Math.random();
    console.log(random);
    const randomEl = randArr[Math.floor(random*randArr.length)]
    
    res.render('about', { rnd: randomEl }) 
})

app.use((req, res) => {
    res.status(404)
    res.render('404')
})
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500)
    res.render('500')
})

app.listen(PORT, ()=>{
    console.log(`Express запущен ${PORT} на порту`)
});