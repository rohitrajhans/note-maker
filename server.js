const  express = require('express');

const app = express();

app.get('/api/notes', (req, res) => {
	const notes = [
		{ id: 1, text: 'This is 1st note' },
		{ id: 2, text: 'This is a demo note' },
		{ id: 3, text: 'I love pizza'}
	];

	res.json(notes);
});

const port = 5000;

app.listen( port, () => console.log(`Server started on ${port}`));