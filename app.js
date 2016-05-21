let express = require('express');
let app = express();
let port = process.env.PORT;

app.get('/', (req, res) => {
	res.send("Hello from Matt")
})

app.listen(port, () => {
	console.log("Running on " + port)
})