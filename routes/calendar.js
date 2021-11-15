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

  let month = data.month;
  let monthStr = moment().month(month).format("MMMM").capitalize();
  let daysOfMonth = moment([data.year, data.month, 1]).daysInMonth();
  let firstDay = moment([data.year, data.month, 1]).format('e');

  const beginData = 1;
  const endData = daysOfMonth;
  const arrDates = [];
  for (var i = beginData; i <= endData; i++) {
    arrDates.push(i);
  }
  // console.log('arrDates >>>>>', arrDates);

  let calendar = [];
  const startWeek = 1;
  const endWeek = moment([data.year, data.month]).weeks();
  // console.log('endWeek >>>>>', endWeek);

  for(var week = startWeek; week < endWeek; week++){
    calendar.push({
      week:week,
      days:Array(7).fill(0).map((n, i) => moment(arrDates).week(week).startOf('week').clone().add(n + i, 'day'))
    })
  }
  console.log('week >>>>>', week);
  console.log('calendar >>>>>', calendar);

  res.render('calendar', {...profileObj, weekArr, daysOfMonth, firstDay, monthStr, calendar, arrDates})
});

module.exports = router;