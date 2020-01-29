import 'make-promises-safe'
import express from 'express'
import path from 'path'

const PORT: number = 8080
const app = express()

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  res.render('index')
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
