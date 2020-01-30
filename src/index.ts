import 'make-promises-safe'
import express from 'express'
import path from 'path'

import fetchRandomQuote, { Quote } from './fetch_random_quote'
import fetchWikis, { Wiki } from './fetch_wikis'

const PORT: number | string | undefined = process.env.PORT || 5000

const app = express()

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Serve static files (css, javascript, ...)
app.use(express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
  try {
    const quote: Quote = await fetchRandomQuote()
    const associatedWikis: Array<Wiki> = await fetchWikis(quote.author)

    res.render('index', {
      quote,
      associatedWikis,
    })
  } catch (error) {
    res.render('error', {
      error,
    })
  }
})

app.get('/about', async (req, res) => {
  res.render('about')
})

app.get('*', async (req, res) => {
  res.render('404')
})

const start = async () => {
  try {
    await app.listen(PORT)
    console.log(`server started on port ${PORT}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
