const express = require('express');
const mongoose = require('mongoose');
const product_router = require('./router/product_router');
const user_router = require('./router/user_router');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './page');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// const product_router = require('./router/product_router');


const dburl = "mongodb+srv://ahmad:123@node.7b4h5et.mongodb.net/db?retryWrites=true&w=majority&appName=node";

mongoose.connect(dburl)
.then(() => {
    console.log("Connected to mongodb");
})
.catch((err) => {
    console.log(`Error: ${err}`);
});

app.use('/products', product_router);
app.use('/users',user_router);

app.get("/", (req, res)=> {
    res.render('Home')
})


app.listen(5000, () => {
    console.log("App is listening on PORT 5000")
})

