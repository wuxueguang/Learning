
/**
 * 视频duration转分钟
 */
export function formatVideoTime(time) {
  if (!time) return null;

  const iTime = Math.floor(time);

  let min = Math.floor(iTime / 60);

  if (min === 0) {
    return '少于一分钟';
  } else {
    if (min > 1) {
      return `${min} 分钟`;
    } else {
      return `${min} 分钟`;
    }
  }
};

export function formatTagline(str, length) {
  if (!str) {
    return "";
  }
  let realStr = '';
  let realLength = 0, len = str.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);

    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      realLength += 2;
    }

    realStr += str[i];

    if (realLength >= length) {
      return realStr;
    }
  }

  return realStr;
};