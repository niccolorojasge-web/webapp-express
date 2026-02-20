const mysql = require ('mysql2')
 
const connection = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password :'12345678',
    database :'Movie',
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('connected to my SQL')

});
module.exports = connection ;