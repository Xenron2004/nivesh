import mongoose from "mongoose";

let userAuth=new mongoose.Schema({
    "name":{typeof:String,require:true},
    "email":{typeof:String,require:true},
    "phone":{typeof:String,require:true},
    "password":{typeof:String,require:true},

})

export let authUser=mongoose.model(authUser,userAuth);

