import { authUser } from "../schema/userAuth";

// Get all users
export const getAllUser = async (req, res) => {
  let { id } = req.params;
  try {
    let getUserDetails = await authUser.find({ _id: id });
    return res
      .status(200)
      .json({ data: getUserDetails, message: "Users fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ data: [], message: "Internal server error: " + error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  let { id } = req.query;
  try {
    let user = await authUser.findOne(id);
    if (!user) {
      return res.status(404).json({ data: [], message: "User not found" });
    }
    return res
      .status(200)
      .json({ data: user, message: "User fetched successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ data: [], message: "Bad request: " + error.message });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the user by ID and update with the new data
    const updatedUser = await authUser.findOneAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ data: [], message: "User not found" });
    }

    return res
      .status(200)
      .json({ data: updatedUser, message: "User updated successfully" });
  } catch (error) {
    return res
      .status(422)
      .json({ data: [], message: "Unprocessable entity: " + error.message });
  }
};
export const updateUserPlan = (req, res) => {
  try {
    let { userId, price, planId } = req.body;

    let updatePlan = authUser.findOneAndUpdate(
      { _id: userId },
      { price: { price: price, planId: planId } },
      { new: true }
    );

    if (!updatePlan) {
      return res.status(404).json({ data: [], message: "User not found" });
    }
    return res
      .status(200)
      .json({ data: updatePlan, message: "Successfully updated plan" });
  } catch (error) {
    return res
      .status(422)
      .json({ data: [], message: "Unprocessable entity: " + error.message });
  }
};

export const widroAmount = async (req, res) => {
  try {
    const { id, amount } = req.body;

    const getUserDetails = await authUser.findById(id);

    if (!getUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    if (getUserDetails.totalAmount < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const updatedAmount = getUserDetails.totalAmount - amount;

    const updatedUser = await authUser.findByIdAndUpdate(
      id,
      { totalAmount: updatedAmount },
      { new: true }
    );

    return res.status(200).json({
      message: "Amount withdrawn successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(422).json({
      data: [],
      message: "Unprocessable entity: " + error.message,
    });
  }
};


