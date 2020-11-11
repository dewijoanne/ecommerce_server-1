const http = require('http')
const app = require('../app')
const PORT = process.env.PORT || 3092

app.set('PORT', PORT)

const server = http.createServer(app)

server.listen(PORT, function() {
  console.log(`App is listening on port ${PORT}`)
})