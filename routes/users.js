var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();

let refreshTokens=[];

router.post('/login',(req,res)=>{
    //Db ekata save krla ok una
  const username=req.body.username;
  const user={name:username};

  const accessToken=jwt.sign(user,process.env.TOKEN_KEY,{expiresIn: '10s'});
  const refreshToken=jwt.sign(user,process.env.RE_TOKEN_KEY,{expiresIn: '10s'});
  refreshTokens.push(refreshToken)
  res.json({accessToken,refreshToken});
});

router.post('/token',(req,res)=>{
  const refreshToken=req.body.refreshToken;
  if (refreshToken==null) res.sendStatus(401);
  if (refreshTokens.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(refreshToken,process.env.RE_TOKEN_KEY,(err,user)=>{
    if (err) res.sendStatus(403);
    const accessToken=jwt.sign({name:user.name},process.env.TOKEN_KEY,{expiresIn: '10s'});
    res.json({accessToken});
  });
})

router.delete('/logout',(req,res)=>{
  const refreshToken=req.body.refreshToken;
  refreshTokens=refreshTokens.filter(t=> t !== refreshToken);
  res.sendStatus(204);
});

module.exports = router;
