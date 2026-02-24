//importiamo la connessione del DB
const connection = require('../data/db')

//funzione di index
function index(req, res) {
    //prepariamo la query
    const sql = 'SELECT * FROM movies';
    //eseguiamo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results)
    })
}

//funzione di show
function show(req, res) {
    const { id } = req.params;
    //prepariasmo la query per la richiesta
    const moviesql = 'SELECT * FROM movies WHERE moovie.id = ?';
    const reviesMovie = 'SELECT * FROM reviews WHERE moovie_id = ?';
    //chiamata db principale
    connection.query(moviesql, [id], (err, movieresult) => {
        if (err) return res.status(500).json({ error: 'Dtabase is failed' });
        if (movieresult.length === 0) return res.status(404).json({ error: 'movie is not found' })

        const movie = movieresult[0];

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
module.exports = { index, show };