module.exports = (function() {

  function Job(input) {
    this.name = '';
    this.data = {};

    if (typeof input === "string") {
      this.fill(input);
    } else if (typeof input === "object") {
      this.name = input.name;
      this.data = input.data;
    }
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

})();