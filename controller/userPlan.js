import { userAllPlan } from "../schema/Userplan";

export const createUserPlan = async (req, res) => {
  try {
    const { userId, price, description } = req.body;

    if (!userId || !price || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPlan = new userAllPlan({
      userId,
      price,
      description,
    });

    const savedPlan = await newPlan.save();

    return res.status(201).json({
      message: "Plan created successfully",
      data: savedPlan,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


