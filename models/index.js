var mongoose = require("mongoose");
mongoose.connect("mongodb://timetrack:Time4Tracking@ds149874.mlab.com:49874/timetrack");

mongoose.set("debug", true);

module.exports.User = require("./user");