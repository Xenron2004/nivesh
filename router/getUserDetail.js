import express from 'express';
import { getAllUser } from '../controller/getUserDetails';
import { getUserById } from '../controller/getUserDetails';
import { updateUser } from '../controller/getUserDetails';
export const userRoute=express.Router();

userRoute.get('/',getAllUser);
userRoute.get('/id',getUserById);
userRoute.put('/update',updateUser);





