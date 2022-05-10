exports.headers = (req, res) => {
  res.type('text/html')
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key} : ${value}`)
  res.render('headers', { headers })
}

exports.newsLetter = (req, res) =>
  res.render('newsletter', { csrf: 'Токен' })

exports.newsletterSignupProcess = (req, res) => {
  console.log('CSRF token (from hidden form field): ' + req.body._csrf)
  console.log('Name (from visible form field): ' + req.body.name)
  console.log('Email (from visible form field): ' + req.body.email)
  res.redirect(303, '/newsletter-signup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) =>
  res.render('newsletter-signup-thank-you')

exports.api = {
  newsletterSignup: (req, res) => {
    console.log(req.body)
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.send({ result: 'success' })
  },
  vocationPhotoContestProccess: (req, res, fields, files) => {
    console.log(`Данные поля: ${fields}`)
    console.log(`Данные поля: ${files}`)
    const objectFiles = Object.entries(files)
    const objectFields = Object.entries(fields)
    res.send(objectFields);
  }
}

exports.vocationPhotoContest = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo', { year : now.getFullYear(), month: now.getMonth()+1 });
}

exports.notFound = (req, res) => {
  res.status(404)
  res.render('404')
}

exports.serverError = (err, req, res, next) => {
  console.log(err.message)
  res.status(500)
  res.render('500')
}
