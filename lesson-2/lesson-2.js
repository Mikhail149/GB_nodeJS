const colors = require("colors/safe");
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

const parsingAguments = (argumets) => {
  let dateArr = [];
  for (let i = 2; i < argumets.length; i++) {
    let dataTimer = argumets[i].split('-');
    let [hours, date, month, year] = dataTimer;
    //Проверка корректности введенных данных
    let carrentArg = true;
    if (year.length != 4 || isNaN(year)) {
      carrentArg = false;
    }
    if (month.length > 2 || isNaN(month) || parseInt(month) < 1 || parseInt(month) > 12) {
      carrentArg = false;
    }
    if (date.length > 2 || isNaN(date) || parseInt(date) < 1 || parseInt(date) > 31) {
      carrentArg = false;
    }
    if (parseInt(month) == 2) {
      if (parseInt(date) < 1 || parseInt(date) > 29) {
        carrentArg = false;
      }
    }
    if (parseInt(month) == 4 || parseInt(month) == 6 || parseInt(month) == 9 || parseInt(month) == 11) {
      if (parseInt(date) < 1 || parseInt(date) > 30) {
        carrentArg = false;
      }
    }
    if (hours.length > 2 || isNaN(hours) || parseInt(hours) < 0 || parseInt(hours) > 24) {
      carrentArg = false;
    }
    //Если агрументы корректны, сравнить таймер с текущим временем, если таймер не меньше текущего времени, то создать таймер
    if (carrentArg) {
      let dateTimer = new Date(year, month - 1, date, hours)
      if (dateTimer.getTime() < Date.now()) {
        let timeIsGone = `Время для таймера №${i - 1} уже ушло`
        console.log(timeIsGone);
        eventEmitter.emit("messageErr", timeIsGone);
      } else {
        dateArr.push(dateTimer);
      }
    } else {
      let messErr = `Аргумент №${i - 1} введен не корректно`;
      eventEmitter.emit("messageErr", messErr);
    }
  }
  return (dateArr);
}

const createMessage = (timersArr) => {
  for (let i = 0; i < timersArr.length; i++) {
    let ostMs = timersArr[i] - new Date();
    if (ostMs > 0) {
      let ostSeconds = Math.floor(ostMs / 1000) % 60;
      let ostMinutes = Math.floor(ostMs / (60 * 1000)) % 60;
      let ostHours = Math.floor(ostMs / (60 * 60 * 1000)) % 24;
      let ostDay = Math.floor(ostMs / (60 * 60 * 1000 * 24)) % 31;
      let ostMonth = Math.floor(ostMs / (60 * 60 * 1000 * 24 * 31)) % 12;
      let ostYear = Math.floor(ostMs / (60 * 60 * 1000 * 24 * 31 * 12));
      let mess = `до конца таймера №${i + 1} осталось: `;
      if (ostYear != 0) {
        mess += `${ostYear} лет `;
      }
      if (ostMonth != 0) {
        mess += `${ostYear} месяцев `;
      }
      if (ostDay != 0) {
        mess += `${ostDay} дней `;
      }
      if (ostHours != 0) {
        mess += `${ostHours} часов `;
      }
      if (ostMinutes != 0) {
        mess += `${ostMinutes} минут `;
      }
      if (ostSeconds != 0) {
        mess += `${ostSeconds} секунд `;
      }
      eventEmitter.emit("message", mess);
    } else {
      timersArr.slice([i], [i]);
      let messEndTimer = 'Таймер №' + (i - 1) + ' закончился'
      eventEmitter.emit("endTimer", messEndTimer);
    }
  }
}

let timersArr = parsingAguments(process.argv);

setInterval(() => createMessage(timersArr), 1000);

eventEmitter.on("messageErr", function (data) {
  console.log(colors.red(data));
});
eventEmitter.on("message", function (data) {
  console.log(data);
});
eventEmitter.on("endTimer", function (data) {
  console.log(colors.green(data));
})


// час-день-месяц-год
// 11-15-05-2022
//new Date(year, month, date, hours, minutes, seconds, ms)
//if (curentDate.getTime() < oldDate.getTime()) - Сравнение двух дат
// Date.now() Получение текущей даты в милисекундном формате