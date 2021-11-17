const express = require('express');
const router = express.Router();
const moment = require('moment');

moment.locale('ru');

router.get('/', (req, res) => {
  res.send('calendar');
});

router.get('/:year/:month/', (req, res) => {

  const profileObj = {
    year: req.params.year,
    month: req.params.month,
    daysOfMonth: moment([req.params.year, req.params.month, 1]).daysInMonth(),
    firstDay: Number(moment([req.params.year, req.params.month, 1]).format('e')),
  }

  const weekArr = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Субота',
    'Воскресенье',
  ];

  console.log(weekArr[0]);

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  let monthStr = moment().month(profileObj.month).format("MMMM").capitalize();

  const getTotalCellCount = (tempObj) => {
    const sumStart = tempObj.daysOfMonth + tempObj.firstDay;
    return (7 - (sumStart % 7)) + sumStart;
  };
  
  const generateTable = (tempObj, count) => {
    let strMain = '';
    let strTr = '';
    let dayNumber = 0;
    let weekend = (7 - ((tempObj.daysOfMonth + tempObj.firstDay) % 7)) + (tempObj.daysOfMonth + tempObj.firstDay)
    for (let i = 0; i <= count; i++) {
      if ((i % 7) === 0 && i !== 0) {
        strMain += `<tr>${strTr}</tr>\n`;
        dayNumber++
        strTr = `<td>${dayNumber}</td>`;
        console.log(weekend);
      } else {
        if (i >= tempObj.firstDay && i < (tempObj.daysOfMonth + tempObj.firstDay)) {
          dayNumber++
          strTr += `<td>${dayNumber}</td>`;
        } else {
          strTr += `<td class="no-data"></td>`;
        } 
      }
    }
    strMain = `<table>
    <tr class="header"><td>${weekArr[0]}</td><td>${weekArr[1]}</td><td>${weekArr[2]}</td><td>${weekArr[3]}</td><td>${weekArr[4]}</td><td>${weekArr[5]}</td><td>${weekArr[6]}</td></tr>
    ${strMain}</table>`;
    return strMain;
  }

  const cellCount = getTotalCellCount(profileObj);
  const table = generateTable(profileObj, cellCount)

  res.render('calendar', {...profileObj, weekArr, monthStr, table})
});



module.exports = router;  