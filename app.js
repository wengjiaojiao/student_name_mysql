var mysql = require('mysql');
var express = require('express')
var app = express()
var ejs = require('ejs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.engine('.html',ejs.__express);
app.set("view engine",'html');

app.get('/', function (req, res) {
  res.render("print-infor");
})

function connetMysql() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database:'student',
        port: 3306
    });
}

app.get('/student_names', function(req, res) {
    var conn = connetMysql();
    conn.connect();
    conn.query('SELECT * from student_name', function(err, result) {
        res.send(result);
    });
    conn.end();
});

app.delete('/student_name/:id', function(req, res) {
    var id = req.params.id;
    var conn = connetMysql();

    conn.connect();
    conn.query('delete from student_name where id =' + id, function(err, result) {
        //res.send(result);
        console.log(result);
        res.end();
    });
    conn.end();
});

app.post('/student_name', function(req, res) {
    var name = req.body.name;
    var conn = connetMysql();

    conn.connect();
    conn.query('insert into student_name(name) values ("' + name + '")' , function(err, result) {
        //res.send(result);
        res.end();
    });
    conn.end();
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
