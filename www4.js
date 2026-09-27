const http = require('http');
//moodul URL päringu parsimiseks
const url = require('url');
//moodul failitee haldamiseks
const path = require('path');
//const fs = require('fs');
const fs = require('fs').promises;
const dateTimeET = require('./src/dateTimeET');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Anna Kartasheva, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '\t<img src="veebiprogrammeerimine_2026_AA.png" alt="banner">';
const pageBody = '\t<h1>Anna Kartasheva, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';


const navMenu = `
	<nav>
		<ul>
			<li><a href="/">Avaleht</a></li>
			<li><a href="/vanasonad">Tänase päeva vanasõna</a></li>
			<li><a href="/miks-tulin-tlusse">Miks tulin TLÜ-sse õppima?</a></li>
		</ul>
	</nav>
	<hr>
`;


http.createServer(async function (req, res){
	console.log(req.url);
	let currentURL = url.parse(req.url, true);
	console.log('parsituna: ' + currentURL.pathname);
	
	if(currentURL.pathname === '/'){
		res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
		//res.write('Meie veeb käivitus!');
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write(navMenu);
		res.write('<p>Nädalapäev: ' + dateTimeET.weekdayET() + '</p>');
		res.write('<p>Kuupäev: ' + dateTimeET.dateET(1) + '</p>');
		res.write('<p>Kellaaeg: ' + dateTimeET.timeET() + '</p>');
		res.write('<br><img src="catfun.jpg" alt="Avalehe pilt" style="max-width:400px;">');
		res.write(pageFoot);
		return res.end();
	}
	else if(currentURL.pathname === '/vanasonad'){
		res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
		//res.write('Meie veeb käivitus!');
		res.write(pageHead);
		res.write(navMenu);
		res.write('\t<h1>Tänase päeva vanasõna</h1>\n\t<p>Siin näed tänaseks loositud Eesti vaasõna.</p>\n\t<hr>');
		// АСИНХРОННОЕ ЧТЕНИЕ И ВЫБОР ПОСЛОВИЦЫ
		try {
			// Читаем текст из файла vanasonad.txt
			const data = await fs.readFile(path.join(__dirname, 'txt', 'vanasonad.txt'), 'utf-8');
		
			// Разбиваем текст по строкам в массив
			const proverbs = data.split(';').filter(line => line.trim() !== '');
		
			// Берем случайную пословицу из массива
			const randomProverb = proverbs[Math.floor(Math.random() * proverbs.length)];
		
			// Выводим случайную пословицу
			res.write('<p style="font-size: 1.2em; font-style: italic;">"' + randomProverb + '"</p>');
	} catch (err) {
		// Защита от сбоя: если файла vanasonad.txt нет, сервер не упадёт
		res.write('<p>Vanasõna lugemisel tekkis viga või faili ei leitud!</p>');
	}

	// 5. Добавили ссылку возврата на главную страницу
	res.write('<hr><p><a href="/">← Tagasi avalehele</a></p>');
	res.write(pageFoot);
	return res.end();
	}
	
	else if(currentURL.pathname === '/miks-tulin-tlusse'){
		res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
		res.write(pageHead);
		res.write(navMenu); // <-- ДОБАВИЛИ МЕНЮ
		res.write('<h1>Miks tulin TLÜ-sse õppima?</h1>\n');
		res.write('<p>Otsustasin tulla Tallinna Ülikooli, et õppida veebiprogrammeerimist ja IT-valdkonda.</p>\n');
		res.write('<img src="tlu.jpg" alt="TLÜ" style="max-width:400px;">\n'); // <-- ВТОРОЕ ФОТО
		res.write('<hr><p><a href="/">← Tagasi avalehele</a></p>'); // <-- ССЫЛКА ВОЗВРАТА
		res.write(pageFoot);
		return res.end();
}
	
	
	
	
	
		// УНИВЕРСАЛЬНЫЙ МАРШРУТ ДЛЯ КАРТИНОК
	else if(currentURL.pathname.endsWith('.jpg') || currentURL.pathname.endsWith('.png')){
		// liidame virtuaalse serveri päris kataloogiga
		let imagePath = path.join(__dirname, 'pic', currentURL.pathname);
		
		try {
			const data = await fs.readFile(imagePath);
			let contentType = currentURL.pathname.endsWith('.png') ? 'image/png' : 'image/jpeg';
			
			res.writeHead(200, {"Content-type": contentType});
			return res.end(data);
		} catch (err) {
			res.writeHead(404, {"Content-type": "text/plain; charset=utf-8"});
			return res.end('Pilti ei leitud!');
		}
}
		
	
	
	/* else if(currentURL.pathname === '/veebiprogrammeerimine_2026_AA.png'){
		//liidame virtuaalse serveri päris kataloogidga
		let  bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		fs.readFile(bannerPath, (err, data)=>{
			if(err){
				throw(err);
			} else {
				res.writeHead(200, {"Content-type": "image/png"});
				res.end(data);
			}
			
		});
	} */
	
	else {
		res.end ('viga 404! ei leia sellist lehe!')
		
	}
}).listen(5308);


	