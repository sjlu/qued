## qued

A very simple queue/dequeue worker inspired by [kue](https://github.com/learnboost/kue). In fact, it is so similar that it is essentially a drop-in replacement. It runs on Node.js applications and requires Redis for storage.

This queue has a mantra of "simplicity over functionality" where we want less complexity in code and more stability in the worker. Therefore, there is no extra queues (like completed and error) and executes one job at a time.

### install

    npm install qued --save

### usage

To create an instance of qued:

    var Qued = require('qued');
    var qued = new Qued();

#### opts

Here are several opts that you can provide when creating your new qued instance. Provided are their default values.

    var qued = new Qued({
      REDIS_HOSTNAME: 'localhost',
      REDIS_PORT: 6379,
      REDIS_PASSWORD: null,
      TIMEOUT: 0                    // set to 0 for no timeout
    });


To create a *consumer* that will push jobs on the queue.
    
    var jobs = qued.createConsumer();
    
    jobs.create('job_name', {data:'data'}).save(function(){});
    
Your *worker* that will execute jobs from the queue, looking something like this.

    qued.addProcess('job_name', function(job, done) { 
      setTimeout(done, 100);
    });
    
    var worker = qued.createWorker();

### extras

To prevent your worker from stopping mid execution, you can implement use the shutdown function which ensures that the last job executing finishes.

    process.on('message', function(message) {
      if (message === 'shutdown') {
        worker.shutdown(function() {
          process.exit(0);
        });
      });
    });


### license

MIT.
  
  
