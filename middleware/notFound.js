function notFound (req, res, next){
   //forziamo il codice corretto 
    res.status(404)
    res.json({
        error:"not found",
        message:"pagina non trovata"
    });
};
module.exports = notFound