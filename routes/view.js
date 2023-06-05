const router = require('express').Router();

router.get("/test", (req, res)=>{
  res.send("view works");
})
module.exports = router;