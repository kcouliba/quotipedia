import axios from 'axios'

const RANDOM_QUOTE_API_URL: string = 'http://api.quotable.io/random'

async function fetchRandomQuote(): Promise<Quote> {
  const { data } = await axios(RANDOM_QUOTE_API_URL)

  return data
}

export interface Quote {
  _id: string
  content: string
  author: string
}

export default fetchRandomQuote
