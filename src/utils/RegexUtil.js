function isTelNumber(value) {
  var phoneReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  var telReg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
  if (!phoneReg.test(value) && !telReg.test(value)) return false;
  return true;
}

function isPhoneNumber(value) {
  var phoneReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  return phoneReg.test(value);
}

function isEmail(value) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return filter.test(mail);
}

function isNumber(value) {
  return /^[0-9]*$/.test(value);
}

function isIDCardNo(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) === false) {
    return false;
  }
  return true;
}

module.exports = {
  isTelNumber: isTelNumber,
  isPhoneNumber: isPhoneNumber,
  isEmail:isEmail,
  isNumber:isNumber,
  isIDCardNo: isIDCardNo
}
