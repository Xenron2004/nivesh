import mongoose from "mongoose";

let userAuth=new mongoose.Schema({
    "name":{typeof:String,require:true},
    "email":{typeof:String,require:true},
    "phone":{typeof:String,require:true},
    "password":{typeof:String,require:true},
    "totalAmount" :{typeof:Number , require:false, default : 0},
    "accountDetails":{typeof : Object , default : {}},

})

export let authUser=mongoose.model(authUser,userAuth);

