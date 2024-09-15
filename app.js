const express = require('express')
const path = require('path')
const app = express()

// Use the environment's port or default to 3000
const port = process.env.PORT || 5000

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
