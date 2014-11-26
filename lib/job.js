module.exports = (function() {

  function Job(string) {
    this.name = '';
    this.data = {};

    this.fill(string);
  }

  Job.prototype.fill = function(string) {
    var data = JSON.parse(string);
    if (!data.name || !data.data) {
      throw new Error("unrecognizable job format");
    }
    this.name = data.name;
    this.data = data.data;
  }

  Job.prototype.toJSON = function() {
    return {
      name: this.name,
      data: this.data
    };
  }

  return Job;

});