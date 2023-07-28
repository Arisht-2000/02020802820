const express = require('express');
const uuidv4 = require("uuid/v4");
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.use(express.json());
app.post('/train/register', (req, res)=>{
    var companyName = res.body.companyName
    var ownerName = res.body.ownerName
    var rollNo = res.body.rollNo
    var ownerEmail = res.body.ownerEmail
    var accessCode = res.body.accessCode
    var clientId = uuidv4()
    var clientSecret = uuidv4()
    var sql = 'INSERT INTO users (companyName, ownerName, rollNo, ownerEmail,accessCode,clientId,clientSecret) VALUES ("${companyName}","${ownerName}","${rollNo}","${ownerEmail}","${accessCode}","${clientId}","${clientSecret}")'
    db.query(sql, function (err, result) {
        if (err) throw err
        console.log('Row has been updated')
        req.json({ companyName: "${companyName}", clientId: "${clientId}", clientSecret: "${clientSecret}"})
      })
});

app.post('/train/auth', (req, res)=>{
    var companyName = res.body.companyName
    var clientId = res.body.clientId
    var ownerName = res.body.ownerName
    var ownerEmail = res.body.ownerEmail
    var rollNo = res.body.rollNo
    var clientSecret = res.body.clientSecret

    var sql = 'SELECT (companyName,ownerName,ownerEmail,rollNo,clientSecret) FROM users WHERE clientId = "${clientId}"'
    a = db.query(sql,function (err, result) {
        if (err) throw err})
    if (a.companyName == companyName && a.clientSecret == clientSecret){
        var token = jwt.sign(clientId, clientSecret, { expiresIn: '1682629264s' });
        res.json(token);}
});

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, clientSecret, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

app.get('/train/trains', authenticateToken, (req, res) => {
    // executes after authenticateToken
    // ...
  })

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);