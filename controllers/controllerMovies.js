//importiamo la connessione del DB
const connection = require('../data/db')

//funzione di index
function index(req, res) {
    //prepariamo la query
    const sql = 'SELECT * FROM movies';
    //eseguiamo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        const films = results.map (film =>{
            return {
                ...film,
                image:req.imagePath + film.image
            }
        })
        res.json(films)
    })
}

//funzione di show
function show(req, res) {
    const { id } = req.params;
    //prepariasmo la query per la richiesta
    const moviesql = 'SELECT * FROM movies WHERE id = ?';
    const reviesMovie = 'SELECT * FROM reviews WHERE movie_id = ?';
    //chiamata db principale
    connection.query(moviesql, [id], (err, movieresult) => {
        if (err) return res.status(500).json({ error: 'Dtabase is failed' });
        if (movieresult.length === 0) return res.status(404).json({ error: 'movie is not found' })

        const movie = movieresult[0];
        movie.image = req.imagePath + movie.image

        connection.query(reviesMovie, [id], (err, resultsReview) => {
            if (err) return res.status(500).json({ error: 'database query is failed' });
            // saviamo le reviews in una cost
            const rewiesArr = resultsReview
            // aggiungiamo a oggetto book la prop per le reviews
            movie.results = rewiesArr
            // ritorniamo il json del Film
            res.json(movie)
        })
    })
}

//logica funzione store
function storeReview (req, res){
//recuperiamo parametro dinamico 
    const {id} = req.params
//recuperiamo le info del body della req 
const {name, text, vote}=req.body
//settiamo sql
const sql = 'INSERT INTO reviews (text, name, vote, movie_id ) VALUES(?, ?, ?, ?)'

connection.query(sql,[text, name, vote, id],(err,results)=>{
    if(err) return res.status(500).json ({error:'database is failed'})
        res.status(201)
    res.json ({message:'review added', id: results.insertId})
})
}
module.exports = { index, show, storeReview };