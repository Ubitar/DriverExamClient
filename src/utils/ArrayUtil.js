function shuffle(a) {
  var len = a.length;
  for(var i=0;i<len;i++){
    var end = len - 1 ;
    var index = (Math.random()*(end + 1)) >> 0;
    var t = a[end];
    a[end] = a[index];
    a[index] = t;
  }
  return a;
};

module.exports = {
  shuffle:shuffle
};
