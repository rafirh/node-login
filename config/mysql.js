const mysql = require("mysql")
 
db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_node_login',
    multipleStatements: true
})
 
db.connect((err)=>{
    if(err) throw err
    else{
        console.log('Terkoneksi!')
    }
})
 
module.exports = db
