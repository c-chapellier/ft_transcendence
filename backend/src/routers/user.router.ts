import express, { Router } from 'express';
const userRouter = express.Router();

userRouter.get('/', function(req, res){
   res.send('GET route on things.');
});
userRouter.post('/', function(req, res){
   res.send('POST route on things.');
});

export default userRouter;