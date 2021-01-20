    var http = require('http');
    var qs = require('querystring');
    var pageHTML = '<html>' +
    '<head>' +
    '<title>Add something</title>' +
    '<meta charset="utf-8">' +
    '</head>' +
    '<body>' +
    '<form method="post" action="">' +
    '<div>' +
    '<label for="nickname">Nickname:</label>'+
    '<input type="text" name="nickname">' +
    '</div>' +
    '<div>' +
    '<input type="submit" value="send it">' +
    '</div>' +
    '</form>' +
    '</body>' +
    '</html>';
    var server = http.createServer(function (req, res) {
    var requestData = '';
    if (req.method === "GET") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(pageHTML);
    } else if (req.method === "POST") {
    req.setEncoding('utf-8');
    req.on('data', function(data) {
    requestData += data;
    if (requestData.length > 1e6) {
    requestData = "";
    res.writeHead(413, {'Content-Type': 'text/plain'});
    req.connection.destroy();
    }
    });
    req.on('end', function() {
    var postData = qs.parse(requestData);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html><head><title>Your nickname</title></head><body><h1>Your nickname is: '+ postData.nickname + '</h1></body></html>');
    });
    }
    });
    server.listen(3101, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:3101/');

