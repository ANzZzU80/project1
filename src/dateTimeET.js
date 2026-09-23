//function dateFormattedET(){
const dateFormattedET = function(monthType){
	let timeNow = new Date();
	const monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember']
	const monthNamesFolkET = ['näärikuu', 'radokuu', 'paastukuu', 'jürikuu', 'lehekuu', 'jaanikuu', 'heinakuu', 'lõikuskuu', 'mihklikuu', 'viinakuu', 'kooljakuu','jõulukuu'];
	if(monthType == 0){
		return timeNow.getDate() + '. ' + monthNamesET[timeNow.getMonth()] + ' ' + timeNow.getFullYear();
	}
	else{
		return timeNow.getDate() + '. ' + monthNamesET[timeNow.getMonth()] + ' (' + monthNamesFolkET[timeNow.getMonth()] + ') ' + timeNow.getFullYear();
	}
}

const weekdayET = function(){
	let timeNow = new Date();
	const weekdaysET = ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'];
	return weekdaysET[timeNow.getDay()];
}

function addLeadZero(numValue){
	if(numValue < 10){
		numValue = '0' + numValue;
	}
	return numValue;
}

const timeFormattedET = function (){
	let timeNow = new Date();
	let hourNow = timeNow.getHours();
	let minuteNow = timeNow.getMinutes();
	let secondsNow = timeNow.getSeconds();
	return addLeadZero(hourNow) + ':' + addLeadZero(minuteNow) + ':' + addLeadZero(secondsNow);
	
}

module.exports = {
	dateET: dateFormattedET,
	timeET: timeFormattedET,
	weekdayET: weekdayET
}
	