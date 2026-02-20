const express = require('express');
const postsRouter = require('./routes/posts')
const notFound = require('./middleware/notFound')

const errorsHandler = require('./middleware/errorsHandler');

const app = express();
const port = 3000;

//app.use(express.json())
app.use(express.static('public'));

app.get('/api', (req, res) => {
    res.send("<h1>server del mio blog</h1>");
});

//app.use('/posts', postsRouter) 


app.use(errorsHandler);
app.use(notFound);

app.listen(port,()=>{
    console.log(`example app listening on port ${port}`); 
});