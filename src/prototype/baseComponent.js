const { response } = require("express")

module.exports = class BaseComponent {
  catchError(response, error) {
    response.status(400).json({
      code: 0,
      message: error.message
    })
  }
}