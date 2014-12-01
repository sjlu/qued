module.exports = function(f, t) {
  // ignore if no timeout is set
  if (!t) {
    return f;
  }

  var timeoutErr = new Error('exceeded ' + t + 'ms');
  timeoutErr.name = 'timeout';

  var timer = setTimeout(function() {
    clearTimeout(timer);
    timer = null;
    f.call(f, new Error(timeoutErr));
  }, t);

  return function() {
    if (timer) {
      clearTimeout(timer);
      f.apply(f.arguments);
    }
  }
}