module.exports = {
    genericErrorHandler: function (err, req, res, next) {
        if (err) {
          res.status(500).send(err);
        } else {
          next()
        }
    }
}