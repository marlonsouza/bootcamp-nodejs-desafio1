const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const middlewareAgeValidation = (req, res, next) => {
  let age = req.query.age
  console.log('Middleware age validation')

  if (!age) return res.redirect('/')

  return next()
}

app.get('/', (req, res) => res.render('new'))
app.get('/major', middlewareAgeValidation, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})
app.get('/minor', middlewareAgeValidation, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  let { age } = req.body
  let major = age >= 18 ? '/major' : 'minor'
  return res.redirect(`${major}?age=${age}`)
})

app.listen(3000)
