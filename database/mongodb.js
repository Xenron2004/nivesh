import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect("", {
      newUrlParser: true,
      newUnifidTopology: true,
    });
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error.message);
  }
};
