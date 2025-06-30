const express = require('express');
const morgan = require('morgan');   //middleware
const mongoose = require('mongoose');
const blogRoute = require('./router/blogRouter');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './page');

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const dburl = "mongodb+srv://ahmad:123@node.7b4h5et.mongodb.net/db?retryWrites=true&w=majority&appName=node";
mongoose.connect(dburl).then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});
app.get('/about', (req, res) => {
    res.redirect('/all-blog');
});
// app.get('/about', (req, res) => {
//     res.render('about', { title: 'About' });
// });
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

app.use(blogRoute);
app.use((req, res) => {
    res.render('404', { title: 'Error 404' });
});
