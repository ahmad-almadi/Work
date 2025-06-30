
const http = require('http');
const fs = require('fs');
const _ = require("lodash");
const server = http.createServer((req, res) => {

    let path = './page/';
    switch(req.url){
        case '/':
            path+= 'a.html';
            break;
        case '/about':
            path+= 'aa.html';
            break;
        case '/about-us':
            res.statusCode =301;
            res.setHeader('location','/about');
            res.end();
            break;
        default:
            path+='404.html';
            break;
    }
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);   
            res.end();

        } else {
            res.write(data);
            res.end();

        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for localhost 3000');
});