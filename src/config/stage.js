const os = require('os');
module.exports = {
  url:  os.type() === 'Windows_NT' ? 'mongodb://localhost:27017/elm' : "mongodb+srv://quitone:<abc12345>@elm.f48s2.mongodb.net/<elm>?retryWrites=true&w=majority",
}