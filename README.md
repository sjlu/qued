## qued

A very simple queue/dequeue worker inspired by [kue](https://github.com/learnboost/kue). In fact, it is so similar that it is essentially a drop-in replacement. It runs on Node.js applications and requires Redis for storage.

This queue has a mantra of "simplicity over functionality" where we want less complexity in code and more stability in the worker. Therefore, there is no extra queues (like completed and error) and executes one job at a time.

### install

    npm install qued --save

### usage

To create an instance of qued:

    var Qued = require('qued');
    
    var qued = new Qued({
      REDIS_HOSTNAME: 'localhost',
      REDIS_PORT: 6379,
      REDIS_PASSWORD: ''
    });

To create a *consumer* that will push jobs on the queue.
    
    var jobs = qued.createConsumer();
    
    jobs.create('job_name', {data:'data'}).save(function(){});
    
Your *worker* that will execute jobs from the queue will look like.

    qued.addProcess('job_name', function(job, cb) { cb() });
    
    var worker = qued.createWorker();

### license

MIT.
  
  
