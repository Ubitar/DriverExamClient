const DAY_MILL_SECOND = 86400000;

function timeStr2date(timeStr) {
  if (timeStr.length < 4) return null;
  var length = timeStr.length;
  var year = 0,
    month = 0,
    day = 0,
    hour = 0,
    minute = 0,
    second = 0,
    millsecond = 0;
  year = parseInt(timeStr.substr(0, 4));
  if (length >= 6) month = parseInt(timeStr.substr(4, 2)) - 1;
  if (length >= 8) day = parseInt(timeStr.substr(6, 2));
  if (length >= 10) hour = parseInt(timeStr.substr(8, 2));
  if (length >= 12) minute = parseInt(timeStr.substr(10, 2));
  if (length >= 14) second = parseInt(timeStr.substr(12, 2));
  if (length >= 17) millsecond = parseInt(timeStr.substr(14, 3));
  return new Date(year, month, day, hour, minute, second, millsecond);
}

function calTimeDifStr2Now_WX(lastDate) {
  var now = new Date();
  var difmillsecond = now.getTime() - lastDate.getTime();
  if (difmillsecond < 0) return "请输入已过去的时间";
  var daydif = difmillsecond / DAY_MILL_SECOND;
  if (parseInt(daydif) < 1) {
    var secondDif = difmillsecond / 1000;
    if (secondDif < 60) return "刚刚";
    var minuteDif = secondDif / 60;
    if (minuteDif < 60) return parseInt(minuteDif) + "分钟前";
    var hourDif = minuteDif / 60;
    return parseInt(hourDif) + "小时前";
  } else if (daydif < 7) {
    return parseInt(daydif) + "天前";
  }
  var weekDif = daydif / 7;
  if (daydif < 30) return parseInt(weekDif) + "周前";
  var monthDif = daydif / 30;
  if (monthDif < 12) return parseInt(monthDif) + "个月前";
  var yearDif = monthDif / 12;
  return parseInt(yearDif) + "年前";
}

function format(time, format) {
  var t = new Date(time);
  var tf = function(i) {
    return (i < 10 ? '0' : '') + i
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}

function isToday(date) {
  var now = new Date();
  if (now.getFullYear() == date.getFullYear() &&
    now.getMonth() == date.getMonth() &&
    now.getDate() == date.getDate())
    return true;
  return false;
}

module.exports = {
  timeStr2date: timeStr2date,
  calTimeDifStr2Now_WX: calTimeDifStr2Now_WX,
  format: format,
  isToday: isToday
}