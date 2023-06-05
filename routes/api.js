const router = require('express').Router();

router.get("/test", (req, res)=>{
  res.send("api works");
})
module.exports = router;