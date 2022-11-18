const express = require('express');
const app = express();

app.listen(3001, function() { //3001 포트로 웹서버 열기
	console.log('listening on 3001');
});

app.get('/reviews', (req, res, next) => {
	res.send(
	{
		"review": [
			{
				"name": "Mahmoud Baghagho",
				"text": "My project was a simple & small task, but the persistence and determination of Westy team turned it into an awesome and great project which make me very happy with the result!",
				"src": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
				"id": 1,
			},
			{
				"name": "Fouad badawy",
				"text": "In my job as social media strategist, I’ve tried every analytics product on market and when I came across West, I was blown away immediately and great project which make me very!",
				"src": "https://images.unsplash.com/photo-1539125530496-3ca408f9c2d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w2ODA3ODY3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
				"id": 2,
			}
		]
	})
});