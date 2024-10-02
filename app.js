const express = require('express')
const path = require('path')
const app = express()

// Use the environment's port or default to 3000
const port = process.env.PORT || 5001

const urlMap = {
  '/home': '/adminHome.html',
  '/': '/index.html',
  '/database': '/databasePage.html',
};
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')))
// Middleware to handle simplified URLs
app.get(Object.keys(urlMap), (req, res) => {
  const actualPath = path.join(__dirname, 'public', urlMap[req.path]);
  res.sendFile(actualPath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
