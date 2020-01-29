import 'make-promises-safe'
import express from 'express'
import path from 'path'

const PORT: number | string | undefined = process.env.PORT || 5000
const app = express()

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const quote = {
    _id: 'yUVQvOdsif',
    content:
      'Technology made large populations possible; large populations now make technology indispensable.',
    author: 'Joseph Wood Krutch',
  }

  const wikiQuery = {
    searchinfo: {
      totalhits: 11,
    },
    search: [
      {
        ns: 0,
        title: 'Joseph Wood Krutch',
        pageid: 4139235,
        size: 4008,
        wordcount: 512,
        snippet:
          '<span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span> modifier - modifier le code - modifier Wikidata <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span> (prononcer krootch) (né le 25 novembre 1893 à Knoxville dans le',
        timestamp: '2018-05-14T20:20:59Z',
      },
      {
        ns: 0,
        title: 'La Chute de la maison Usher (nouvelle)',
        pageid: 4321226,
        size: 11263,
        wordcount: 1418,
        snippet:
          'Usher\' », Southern Humanities Review, no 26,‎ 1992, p. 101-113. (en) <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span>, Edgar Allan Poe: A Study in Genius, New York, Alfred A. Knopf, 1926',
        timestamp: '2020-01-15T10:47:30Z',
      },
      {
        ns: 0,
        title: 'Doris Ulmann',
        pageid: 7914840,
        size: 1987,
        wordcount: 245,
        snippet:
          'Butler Yeats, John Dewey, Max Eastman, Sinclair Lewis, Lewis Mumford, <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span>, Martha Graham, Anna Pavlova, Paul Robeson, Lillian Gish), elle fit',
        timestamp: '2018-07-09T17:48:55Z',
      },
      {
        ns: 0,
        title: 'Virginia Poe',
        pageid: 2959083,
        size: 42808,
        wordcount: 5680,
        snippet:
          'serait représentée dans le personnage éponyme du poème Annabel Lee. <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span>, également biographe de Poe, suggère que Poe n’a pas eu besoin des',
        timestamp: '2018-12-19T06:47:10Z',
      },
      {
        ns: 0,
        title: 'National Book Award',
        pageid: 1690936,
        size: 15287,
        wordcount: 1312,
        snippet:
          'Course of Empire 1954 : Bruce Catton, A Stillness at Appomattox 1955 : <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span>, The Measure of Man 1956 : Herbert Kubly, An American in Italy 1957 :',
        timestamp: '2019-11-21T06:43:21Z',
      },
      {
        ns: 0,
        title: 'Edgar Allan Poe',
        pageid: 1074,
        size: 152280,
        wordcount: 17321,
        snippet:
          'the life of writing, New Haven, Yale University Press, 1987. (en) <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span>, Edgar Allan Poe: A Study in Genius, New York, Alfred A. Knopf, 1926',
        timestamp: '2020-01-10T08:50:12Z',
      },
      {
        ns: 0,
        title: 'Henry David Thoreau',
        pageid: 6889,
        size: 129446,
        wordcount: 15146,
        snippet:
          'concerne : John Burroughs, John Muir, E.O. Wilson, Edwin Way Teale, <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span>, Rick Bass (son roman Winter, publié en 1999, est organisé de manière',
        timestamp: '2020-01-22T14:33:35Z',
      },
      {
        ns: 0,
        title: 'Walden ou la Vie dans les bois',
        pageid: 783868,
        size: 150694,
        wordcount: 16956,
        snippet:
          'concerne : John Burroughs, John Muir, E.O. Wilson, Edwin Way Teale, <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span>, Rick Bass (son roman Winter, publié en 1999, est organisé de manière',
        timestamp: '2019-10-17T18:23:58Z',
      },
      {
        ns: 0,
        title: 'Humane Society of the United States',
        pageid: 7255868,
        size: 11049,
        wordcount: 1411,
        snippet:
          'théologien Albert Schweitzer et le deuxième de l\'écrivain américain <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span>. Il s\'agissait alors d\'une nouvelle forme d\'organisation puisque les',
        timestamp: '2020-01-22T12:22:05Z',
      },
      {
        ns: 0,
        title: 'Médaille John Burroughs',
        pageid: 1617797,
        size: 7236,
        wordcount: 1040,
        snippet:
          '(ISBN 0-451-61873-4) 1953 - Gilbert Klingel, The Bay (ISBN 0-8018-2536-9) 1954 - <span class="searchmatch">Joseph</span> <span class="searchmatch">Wood</span> <span class="searchmatch">Krutch</span>, The Desert Year (ISBN 0-8165-0923-9) 1955 - Wallace Byron Grange',
        timestamp: '2019-10-28T17:43:07Z',
      },
    ],
  }

  res.render('index', {
    quote,
    associatedWikis: wikiQuery.search.map(result => {
      const { title, pageid, size } = result

      return { title, pageid, size }
    }),
  })
})

const start = async () => {
  try {
    await app.listen(PORT)
    // tslint:disable-next-line:no-console
    console.log(`server started on port ${PORT}`)
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err)
    process.exit(1)
  }
}

start()
