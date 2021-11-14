const express = require('express');
const router = express.Router();
const moment = require('moment');

moment.locale('ru');

router.get('/', (req, res) => {
  res.send('calendar');
});

router.get('/:var1/:var2/', (req, res) => {
  console.log(req.params);
  console.log(req.query);

  const profileObj = {
    var1: req.params.var1,
    var2: req.params.var2,
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

  const data = {
    year: req.params.var1,
    month: req.params.var2,
  }

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  let year = data.year;
  let month = data.month;
  let monthStr = moment().month(month).format("MMMM").capitalize();
  let daysOfMonth = moment([data.year, data.month, 1]).daysInMonth();
  let firstDay = moment([data.year, data.month, 1]).format('e');

   console.log('Year >>>>>', year);
  console.log('Month >>>>>', month);
  console.log('MonthStr >>>>>', monthStr);
  console.log('Days of the Month >>>>>', daysOfMonth);
  console.log('1-st day of the month >>>>>', weekArr[firstDay]);

  res.render('calendar', {...profileObj, weekArr, daysOfMonth, firstDay, monthStr})
});

module.exports = router;