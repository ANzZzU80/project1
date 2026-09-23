const http = require('http');
const dateTimeET = require('./src/dateTimeET');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Anna Kartasheva, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Anna Kartasheva, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tÃµsiseltvÃµetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';


http.createServer(function (req, res){
	res.writeHead(200, {"content-type": "text/html"});
	//res.write('Meie veeb käivitus!');
	res.write(pageHead);
	res.write(pageBody);
	res.write('<p>Nädalapäev: ' + dateTimeET.weekdayET() + '</p>');
	res.write('<p>Kuupäev: ' + dateTimeET.dateET(1) + '</p>');
	res.write('<p>Kellaaeg: ' + dateTimeET.timeET() + '</p>');
	res.write(pageFoot);
	return res.end();
}).listen(5308);