const express = require('express'),
			bodyParser = require('body-parser'),
			app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const tagsJSON = {
	"tags": [
	{
		"name" : "User Interface",
		"type" : "Design"
	},
	{
		"name" : "User Experience",
		"type" : "Design"
	},
	{
		"name" : "HTML",
		"type" : "Dev"
	},
	{
		"name" : "CSS/SASS",
		"type" : "Dev"
	},
	{
		"name" : "Random",
		"type" : "Other"
	}],
	"types": [
		{"name": "Design"},
		{"name": "Dev"},
		{"name": "Other"},
]};

const urlJSON = {
	"urls": ["https://www.google.com", "https://www.facebook.com", "http://www.agrawalravi.com"]
};

app.listen(8081, function() {
	console.log("Server running on 8081");
})

app.get('/resources/', (req, res) => {
	res.sendFile(__dirname + '/index.html');

	

})

app.get('/resources/tags', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(tagsJSON);
})

app.get('/resources/check/*', (req, res) => {

	const str = '/resources/check/',
				checkURL = req.url.toString().substring(str.length, req.url.length);

	res.send('Not Found');

})

app.post('/resources/add/*', (req, res) => {

	var utmIndex = req.body.shareURL.indexOf('?');
	if(utmIndex == -1) utmIndex = req.body.shareURL.length;

	req.body.shareURL = req.body.shareURL.substring(0, utmIndex);

	console.log(req.body);
})

