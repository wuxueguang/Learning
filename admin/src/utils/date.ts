/**
 * 获取当天开始时间，结束时间，返回一个数组，0是开始时间，1是结束时间
 */
export function getToday() {
  let today = getFormatTime(new Date());
  let time: string[] = [];
  time.push(
    formatDate([today[0], format(today[1]), format(today[2]), "00", "00", "00"])
  );
  time.push(getCurrentFormat(today));

  return time;
}

export function getMonthLastDay() {
  let today = getFormatTime(new Date());
  let year = today[0];
  let month = today[1] - 1;
  if (month === 0) {
    year -= 1;
    month = 12;
  }
  const lastDay = getFormatTime(new Date(year, month, 1));
  return getCurrentFormat(lastDay);
}

/**
 * 获取当周开始时间和结束时间
 */
export function getWeek() {
  let today = getFormatTime(new Date()); //今天
  let dayfromMonday = new Date().getDay() - 1; //今天是一个星期的第几天,从周一算
  let monday = getFormatTime(
    new Date(today[0], today[1] - 1, today[2] - dayfromMonday)
  ); //当前周周一
  let time: string[] = [];
  time.push(
    formatDate([
      monday[0],
      format(monday[1]),
      format(monday[2]),
      "00",
      "00",
      "00"
    ])
  );
  time.push(getCurrentFormat(today));

  return time;
}

/**
 * 获取当月的开始时间和结束时间
 */
export function getMonth() {
  let today = getFormatTime(new Date());
  let time: string[] = [];
  time.push(formatDate([today[0], format(today[1]), "01", "00", "00", "00"]));
  time.push(getCurrentFormat(today));

  return time;
}

export function getYear() {
  let today = getFormatTime(new Date());
  let time: string[] = [];
  time.push(formatDate([today[0], "01", "01", "00", "00", "00"]));
  time.push(getCurrentFormat(today));
  return time;
}

/**
 * 传入一个日期对象或者数组格式化输出
 * @param {*} date
 */
export function getCurrentFormat(date) {
  let tmp: string[] = [];
  if (Object.prototype.toString.call(date) === "[object Array]") {
    tmp = date;
  } else if (Object.prototype.toString.call(date) === "[object Date]") {
    tmp = getFormatTime(date);
  } else {
    throw new Error("cannot change uncorrect date format");
  }
  return formatDate(
    tmp.map(val => {
      return format(val);
    })
  );
}

/**
 * 获取传入时期的年月日时分秒
 * @param today 日期
 */
export function getFormatTime(today) {
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let seconds = today.getSeconds();

  return [year, month, day, hour, minute, seconds];
}

/**
 * 将一位数时间补成两位
 * @param time
 */
function format(time) {
  return time < 10 ? `0${time}` : time;
}

/**
 *按年-月-日T时-分-秒的格式格式化日期
 * @param {*} today 日期数组
 */
function formatDate(today) {
  //today是一个[年，月，日，时，分，秒]的数组
  // safari not friendly decode time iso-8601
  return new Date(today[0], today[1] - 1, today[2], today[3], today[4], today[5]).toISOString();
}

/**
 *  将秒转换成分钟:秒 的格式 60 -> 1:00
 */
export function setMS(duration: number): string {
  return `${Math.floor((duration || 0) / 60)}:${
    Math.ceil((duration || 0) % 60) < 10
      ? `0${Math.ceil((duration || 0) % 60)}`
      : Math.ceil((duration || 0) % 60)
  }`
}

export function formatISOTime(str: string) {
  const dateArr = getFormatTime(new Date(str));
  return dateArr.splice(0, 3).join('-');
}

export function formatUTCTimespan(second?: number): string {
  if (!second) {
    return '';
  }
  const dateArr = getFormatTime(new Date(second * 1000));
  return dateArr.splice(0, 3).join('-');
}

export function formatUTCTimespanToISOTime(second?: number): string {
  if (!second) {
    return '';
  }
  return new Date(second * 1000).toISOString();
}
