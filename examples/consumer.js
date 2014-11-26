var Qued = require('../index');
var qued = new Qued();

var consumer = qued.createConsumer();

consumer.create('test', {a:'b'}).save(function(err) {
  if (err) {
    console.log(err);
    process.exit(0)
    return;
  }
});