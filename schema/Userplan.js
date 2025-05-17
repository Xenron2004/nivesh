import mongoose from "mongoose";

const userPlan = new mongoose.Schema({
    userId: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);


 export let userAllPlan = mongoose.model(userAllPlan, userPlan);