const router = require("express").Router();

router.get("/", (_req, res) => {
  res.send("Welcome");
});

module.exports = router;
