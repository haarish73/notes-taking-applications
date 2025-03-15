const express = require('express');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const port = 2000;

let noters = [
    {
        id: uuidv4(),
        titled: "My First Note",
        content: "This is the content of the first note."
    },
    {
        id: uuidv4(),
        titled: "My Second Note",
        content: "This is the content of the second note."
    },
    {
        id: uuidv4(),
        titled: "My Third Note",
        content: "This is the content of the third note."
    }
];

// Show All Notes
app.get("/note", (req, res) => {
    res.render("index", { noters });
});

// Show a Specific Note
app.get("/notes/:id", (req, res) => {
    let { id } = req.params;
    const note = noters.find((n) => n.id === id);
    res.render('show', { note });
});

// Add New Note Page
app.get("/note/new", (req, res) => {
    res.render("newNote");
});

// Add New Note
app.post('/note', (req, res) => {
    let { titled, content } = req.body;
    let id = uuidv4();
    noters.push({ id, titled, content });
    res.redirect('/note');
});

// Edit Note Page
app.get("/notes/:id/edit", (req, res) => {
    let { id } = req.params;
    let note = noters.find((n) => n.id === id);

    res.render('edit', { note });
});

// Update Note
app.patch("/notes/:id", (req, res) => {
    let { id } = req.params;
    let { titled, content } = req.body;

    let note = noters.find((n) => n.id === id);

    if (note) {
        note.titled = titled;
        note.content = content;
    }

    res.redirect('/note');
});

// Delete Note
app.delete("/note/:id", (req, res) => {
    let { id } = req.params;

    noters = noters.filter((n) => n.id !== id);
    res.redirect('/note');
});


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
