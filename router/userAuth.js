import express from 'express';
import { login } from '../controller/userAuth';
import { signup } from '../controller/userAuth';
export const authRoute=express.Router();

authRoute.post('/login',login);
authRoute.post('/singup',signup);




