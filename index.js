const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')

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

app.get('/', (req, res) => { res.render('home') })
app.get('/about', (req, res) => { res.render('about', { rnd: random.getRandom() }) })
app.get('/test-section', (req, res) => res.render('test-section'))
app.get('/headers', handlers.headers)
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.use(handlers.notFound)
app.use(handlers.serverError)

app.listen(PORT, () => {
  console.log(`Express запущен ${PORT} на порту`)
})
