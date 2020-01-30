import 'make-promises-safe'
import express from 'express'
import axios from 'axios'
import path from 'path'

const PORT: number | string | undefined = process.env.PORT || 5000
const WIKIPEDIA_API_URL: string =
  'https://{locale}.wikipedia.org/w/api.php?action=query&prop=info&list=search&srsearch={search}&format=json'
const RANDOM_QUOTE_API_URL: string = 'https://api.quotable.io/random'
const WIKIPEDIA_URL: string = 'https://{locale}.wikipedia.org/wiki'

const app = express()

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

async function fetchWikis(
  search: string,
  locale: string = 'en',
): Promise<Object> {
  const url = WIKIPEDIA_API_URL.replace('{locale}', locale).replace(
    '{search}',
    search,
  )
  try {
    const { data } = await axios(url)

    return data.query.search.map((wiki: any) => {
      const { title } = wiki

      return {
        title,
        url: `${WIKIPEDIA_URL.replace('{locale}', locale)}/${title}`,
      }
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

async function fetchRandomQuote(): Promise<Object | null> {
  try {
    const { data } = await axios(RANDOM_QUOTE_API_URL)

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

app.get('/', async (req, res) => {
  try {
    const quote = await fetchRandomQuote()
    const associatedWikis = await fetchWikis(quote.author)

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
