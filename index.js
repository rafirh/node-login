const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./config/mysql");
const app = express();
const port = 8080;
 
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.get("/", (req, res) => {});
 
app.post("/authlogin", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const sql = "SELECT * FROM akun WHERE email = ? AND password = ?";
  if (email && password) {
    db.query(sql, [email, password], (err, rows) => {
      if (err){ throw err;}
      else if (rows.length > 0) {
        req.session.loggedin = true;
        req.session.email = email;
        res.end("Selamat email " + email + " berhasil login");
      } else {
        res.end("Kredensial anda salah!");
      }
    });
  }
});

app.post('/auth_register', (req, res) => {
  var register_data = {
      nama: req.body.nama,
      email: req.body.email,
      password: req.body.password
  }
  db.query('INSERT INTO akun SET ?', register_data, (err, results)=>{
      if(err) throw err
      else{
          res.send("selamat berhasil register dengan email "+register_data.email)    
          console.log("Berhasil register", results)
      }
  })
});

app.get('/logout', (req, res)=>{
  if(req.session.loggedin === true){
      req.session.loggedin = false
  }
  res.end("Berhasil logout")
})


app.listen(port, () => {
  console.log(`Server di ${port}`);
});
