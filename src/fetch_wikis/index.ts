import axios from 'axios'

const WIKIPEDIA_API_URL: string =
  'https://{locale}.wikipedia.org/w/api.php?action=query&prop=info&list=search&srsearch={search}&format=json'
const WIKIPEDIA_URL: string = 'https://{locale}.wikipedia.org/wiki'

async function fetchWikis(
  search: string,
  locale: string = 'en',
): Promise<Wiki[]> {
  const url = WIKIPEDIA_API_URL.replace('{locale}', locale).replace(
    '{search}',
    search,
  )
  const { data } = await axios(url)

  // intentionally not making use of optionnal chaining here since we want an error to be thrown to be handled from server endpoint
  return data.query.search.map((wiki: any) => {
    const { title } = wiki

    return {
      title,
      url: `${WIKIPEDIA_URL.replace('{locale}', locale)}/${title}`,
    }
  })
}

export interface Wiki {
  title: string
  url: string
}

export default fetchWikis
