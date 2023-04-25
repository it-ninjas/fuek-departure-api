var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/connections", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
