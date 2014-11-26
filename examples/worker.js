var Qued = require('../index');
var qued = new Qued();

qued.addProcess('test', function(job, done) {
  console.log('fake processing for 2000ms');
  setTimeout(function() {
    done();
  }, 2000);
});

var worker = qued.createWorker();