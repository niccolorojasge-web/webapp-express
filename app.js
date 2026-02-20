const express = require('express');
const routerMovie = require ('./routers/routerMovie')
const notFound = require('./middleware/notFound')

const errorsHandler = require('./middleware/errorsHandler');

const app = express();
const port = process.env.PORT;

//app.use(express.json())
//app.use(express.static('public'));

app.get('/api', (req, res) => {
    res.send("<h1>server del mio blog</h1>");
});


app.use('/api/Movie',routerMovie)

app.use(errorsHandler);
app.use(notFound);

app.listen(port,()=>{
    console.log(`example app listening on port ${port}`); 
});