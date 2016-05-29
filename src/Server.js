var app = require('./app')
var port = process.env.PORT || process.env.port || 7800;

app.start(port, (port) => {
  console.log("Running on " + port)
})
