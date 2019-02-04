function isEmpty(input) {
  return input == null || input == '';
}
function isNotEmpty(input) {
  return !this.isEmpty(input);
}
function isBlank(input) {
  return input == null || /^\s*$/.test(input);
}
function isNotBlank(input) {
  return !this.isBlank(input);
}
function trim(input) {
  return input.replace(/^\s+|\s+$/, '');
}
function trimToEmpty(input) {
  return input == null ? "" : this.trim(input);
}
function startsWith(input, prefix) {
  return input.indexOf(prefix) === 0;
}
function endsWith(input, suffix) {
  return input.lastIndexOf(suffix) === 0;
}
function contains(input, searchSeq) {
  return input.indexOf(searchSeq) >= 0;
}
function equals(input1, input2) {
  return input1 == input2;
}
function equalsIgnoreCase(input1, input2) {
  return input1.toLocaleLowerCase() == input2.toLocaleLowerCase();
}
function containsWhitespace(input) {
  return this.contains(input, ' ');
}
//生成指定个数的字符
function repeat(ch, repeatTimes) {
  var result = "";
  for (var i = 0; i < repeatTimes; i++) {
    result += ch;
  }
  return result;
}
function deleteWhitespace(input) {
  return input.replace(/\s+/g, '');
}
function rightPad(input, size, padStr) {
  return input + this.repeat(padStr, size);
}
function leftPad(input, size, padStr) {
  return this.repeat(padStr, size) + input;
}
//首小写字母转大写
function capitalize(input) {
  var strLen = 0;
  if (input == null || (strLen = input.length) == 0) {
    return input;
  }
  return input.replace(/^[a-z]/, function (matchStr) {
    return matchStr.toLocaleUpperCase();
  });
}
//首大写字母转小写
function uncapitalize(input) {
  var strLen = 0;
  if (input == null || (strLen = input.length) == 0) {
    return input;
  }
  return input.replace(/^[A-Z]/, function (matchStr) {
    return matchStr.toLocaleLowerCase();
  });
}
//大写转小写，小写转大写
function swapCase(input) {
  return input.replace(/[a-z]/ig, function (matchStr) {
    if (matchStr >= 'A' && matchStr <= 'Z') {
      return matchStr.toLocaleLowerCase();
    } else if (matchStr >= 'a' && matchStr <= 'z') {
      return matchStr.toLocaleUpperCase();
    }
  });
}
//统计含有的子字符串的个数
function countMatches(input, sub) {
  if (this.isEmpty(input) || this.isEmpty(sub)) {
    return 0;
  }
  var count = 0;
  var index = 0;
  while ((index = input.indexOf(sub, index)) != -1) {
    index += sub.length;
    count++;
  }
  return count;
}
//只包含字母
function isAlpha(input) {
  return /^[a-z]+$/i.test(input);
}
//只包含字母、空格
function isAlphaSpace(input) {
  return /^[a-z\s]*$/i.test(input);
}
//只包含字母、数字
function isAlphanumeric(input) {
  return /^[a-z0-9]+$/i.test(input);
}
//只包含字母、数字和空格
function isAlphanumericSpace(input) {
  return /^[a-z0-9\s]*$/i.test(input);
}
//数字
function isNumeric(input) {
  return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input);
}
//小数
function isDecimal(input) {
  return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input);
}
//负小数
function isNegativeDecimal(input) {
  return /^\-?(?:0|[1-9]\d*)\.\d+$/.test(input);
}
//正小数
function isPositiveDecimal(input) {
  return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input);
}
//整数
function isInteger(input) {
  return /^[-+]?(?:0|[1-9]\d*)$/.test(input);
}
//正整数
function isPositiveInteger(input) {
  return /^\+?(?:0|[1-9]\d*)$/.test(input);
}
//负整数
function isNegativeInteger(input) {
  return /^\-?(?:0|[1-9]\d*)$/.test(input);
}
//只包含数字和空格
function isNumericSpace(input) {
  return /^[\d\s]*$/.test(input);
}
function isWhitespace(input) {
  return /^\s*$/.test(input);
}
function isAllLowerCase(input) {
  return /^[a-z]+$/.test(input);
}
function isAllUpperCase(input) {
  return /^[A-Z]+$/.test(input);
}
function defaultString(input, defaultStr) {
  return input == null ? defaultStr : input;
}
function defaultIfBlank(input, defaultStr) {
  return this.isBlank(input) ? defaultStr : input;
}
function defaultIfEmpty(input, defaultStr) {
  return this.isEmpty(input) ? defaultStr : input;
}
//字符串反转
function reverse(input) {
  if (this.isBlank(input)) {
    input;
  }
  return input.split("").reverse().join("");
}
//删掉特殊字符(英文状态下)
function removeSpecialCharacter(input) {
  return input.replace(/[!-/:-@\[-`{-~]/g, "");
}
//只包含特殊字符、数字和字母（不包括空格，若想包括空格，改为[ -~]）
function isSpecialCharacterAlphanumeric(input) {
  return /^[!-~]+$/.test(input);
}
//中文校验
function isChinese(input) {
  return /^[\u4E00-\u9FA5]+$/.test(input);
}
//去掉中文字符
function removeChinese(input) {
  return input.replace(/[\u4E00-\u9FA5]+/gm, "");
}
//转义元字符
function escapeMetacharacter(input) {
  var metacharacter = "^$()*+.[]|\\-?{}|";
  if (metacharacter.indexOf(input) >= 0) {
    input = "\\" + input;
  }
  return input;
}
//转义字符串中的元字符
function escapeMetacharacterOfStr(input) {
  return input.replace(/[\^\$\*\+\.\|\\\-\?\{ \ }\|]/gm, "\\$&");
}

module.exports={
  isBlank:isBlank,
  contains:contains,
  isNumeric: isNumeric
}