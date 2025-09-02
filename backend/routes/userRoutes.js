import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
//    console.log("User: ",user)
//    console.log("Password: ", req.body.password)
    if (user) {
//        console.log("I am In")
        console.log(bcrypt.compareSync(req.body.password, user.password))
        if (bcrypt.compareSync(req.body.password, user.password)) {
//            console.log("I am working...")
            res.send({
                _id: user._id,
                name: user.name,
                password: user.password,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
}));

userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save();
    res.send({
        _id: user._id,
        name: user.name,
        password: user.password,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    })
}));

export default userRouter;