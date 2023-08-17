const express = require('express')
const connectToMongo = require('./Db.js');
const router = require('./Router/Router.js');

connectToMongo();


const app = express()
const port = 3005

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',router);


app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`)
})