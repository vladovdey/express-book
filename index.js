const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')

const random = require('./lib/random')
const weatherMiddlware = require('./lib/middleware/weather')
const handlers = require('./lib/handlers')

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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => { res.render('home') })
app.get('/about', (req, res) => { res.render('about', { rnd: random.getRandom() }) })
app.get('/test-section', (req, res) => res.render('test-section'))
app.get('/headers', handlers.headers)
app.get('/newsletter', handlers.newsLetter)
app.post('/api/newsletter-signup', (req, res) => {
  console.log(req.body)
  res.send({ result: 'success' })
})
app.post('/api/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return res.status(500).send({ error: err.message });
    handlers.api.vocationPhotoContestProccess(req, res, fields, files)
  })
})
app.get('/contest/vacation-photo', handlers.vocationPhotoContest)
// app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
// app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.use(handlers.notFound)
app.use(handlers.serverError)

app.listen(PORT, () => {
  console.log(`Express запущен на ${PORT}`)
})
