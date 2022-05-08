exports.headers = (req, res) => {
  res.type('text/html')
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key} : ${value}`)
  res.render('headers', { headers })
}

exports.newsletterSignup = (req, res) =>
  res.render('newsletter-signup', { csrf: 'Токен' })

exports.newsletterSignupProcess = (req, res) => {
  console.log('CSRF token (from hidden form field): ' + req.body._csrf)
  console.log('Name (from visible form field): ' + req.body.name)
  console.log('Email (from visible form field): ' + req.body.email)
  res.redirect(303, '/newsletter-signup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) =>
  res.render('newsletter-signup-thank-you')

exports.notFound = (req, res) => {
  res.status(404)
  res.render('404')
}

exports.serverError = (err, req, res, next) => {
  console.log(err.message)
  res.status(500)
  res.render('500')
}