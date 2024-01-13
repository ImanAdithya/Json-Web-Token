var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const user=req.user;
    res.json(user);
    // res.json(
    //   [
    //       {
    //           "id":1,
    //           "name":"saman",
    //           "age":14
    //       },
    //       {
    //           "id":2,
    //           "name":"Namal",
    //           "age":30
    //       }
    //   ]
    // );
});

module.exports=router;