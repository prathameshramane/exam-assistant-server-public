const cors = require("cors")

const whiteList = [
  "http://localhost:3000",
  "exam-assistant.prathameshramane.com",
  "www.exam-assistant.prathameshramane.com",
];

var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    if (whiteList.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  };

exports.cors = cors()
exports.corsWithOptions = cors(corsOptionsDelegate)