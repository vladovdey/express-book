const express = require('express')
const expressHandlebars = require('express-handlebars')

const random = require('./lib/random')
const weatherMiddlware = require('./lib/middleware/weather')

const PORT = 8000

const app = express()

app.disable('x-powered-by')
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    section: function (name, options) {
      if (!this.sections) this.sections = {}
      this.sections[name] = options.fn(this)
      return null
    }
  }
}))
app.set('view engine', 'handlebars')

/* eslint-disable n/no-path-concat */
app.use(express.static(__dirname + '/public'))
/* eslint-enable n/no-path-concat */
app.use(weatherMiddlware)

app.get('/', (req, res) => { res.render('home') })
app.get('/about', (req, res) => { res.render('about', { rnd: random.getRandom() }) })
app.get('/test-section', (req, res) => res.render('test-section'))
app.get('/headers', (req, res) => {
  res.type('text/html')
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key} : ${value} \n`)
  res.send(headers.join(''))
})

app.use((req, res) => {
  res.status(404)
  res.render('404')
})
app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(500)
  res.render('500')
})

app.listen(PORT, () => {
  console.log(`Express запущен ${PORT} на порту`)
})
