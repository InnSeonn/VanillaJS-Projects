const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const ORIGIN = `http://localhost:${PORT}`;
const safeSiteList = [ORIGIN, 'http://localhost:1234'];
const corsOptions = {
	// origin: 'http://localhost:3001',
	origin: function(origin, callback) {
		const isSafeSiteListed = safeSiteList.indexOf(origin) !== -1;
		callback(null, isSafeSiteListed);
	},
	// credential: true,
}
app.use(cors(corsOptions));
app.use(express.static('public')); //정적파일(이미지) 제공
app.listen(PORT, function() { //3001 포트로 웹서버 열기
	console.log(`listening on ${PORT}`);
});

/** REVIEWS 데이터 **/
app.get('/reviews', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.send(
	{
		"review": [
			{
				"name": "Mahmoud Baghagho",
				"text": "My project was a simple & small task, but the persistence and determination of Westy team turned it into an awesome and great project which make me very happy with the result!",
				"src": ORIGIN + "/images/user1.jpg",
				"id": 1,
			},
			{
				"name": "Fouad badawy",
				"text": "In my job as social media strategist, I’ve tried every analytics product on market and when I came across West, I was blown away immediately and great project which make me very!",
				"src": ORIGIN + "/images/user2.jpg",
				"id": 2,
			}
		]
	})
});

/** NEWS 데이터 **/
app.get('/news', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.send(
	{
		"news": [
			{
				"image": ORIGIN + "/images/news1.jpg",
				"title": "Old cameras can capture images better!",
				"text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
				"date": "November 1, 2022",
				"id": 1,
			},
			{
				"image": ORIGIN + "/images/news2.jpg",
				"title": "New subway line has the most advanced technology world!",
				"text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
				"date": "November 7, 2022",
				"id": 2,
			},
			{
				"image": ORIGIN + "/images/news3.jpg",
				"title": "In the news: this week’s top news stories",
				"text": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
				"date": "November 13, 2022",
				"id": 3,
			},
		]
	})
});

/** WORKS 데이터 **/
app.get('/works', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.send({
		"works": [
			{
				"image": ORIGIN + "/images/works1.jpg",
				"title": "Branding Mock Up",
				"category": "Branding, Mock Up",
				"id": 1,
			},
			{
				"image": ORIGIN + "/images/works2.jpg",
				"title": "Ploa Beauty Branding",
				"category": "Branding, Web Design",
				"id": 2,
			},
			{
				"image": ORIGIN + "/images/works3.jpg",
				"title": "Ice Cream Packaging",
				"category": "Packaging, Print",
				"id": 3,
			},
			{
				"image": ORIGIN + "/images/works4.jpg",
				"title": "The Eyewear Store",
				"category": "Branding, Web Design",
				"id": 4,
			},
			{
				"image": ORIGIN + "/images/works5.jpg",
				"title": "Fro Ice Cream Mock Up",
				"category": "Mock Up, Packaging",
				"id": 5,
			},
			{
				"image": ORIGIN + "/images/works6.jpg",
				"title": "Coffee Inn Packaging",
				"category": "Packaging, Print",
				"id": 6,
			},
			{
				"image": ORIGIN + "/images/works7.jpg",
				"title": "Branding Mock Up 2",
				"category": "Branding, Mock Up",
				"id": 7,
			},
			{
				"image": ORIGIN + "/images/works8.jpg",
				"title": "Branding Mock Up 3",
				"category": "Branding, Mock Up",
				"id": 8,
			},
			{
				"image": ORIGIN + "/images/works9.jpg",
				"title": "Kate & Tobby Branding",
				"category": "Branding, Web Design",
				"id": 9,
			},
		]
	})
});