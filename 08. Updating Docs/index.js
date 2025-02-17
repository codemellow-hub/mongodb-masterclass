import connectDB from "./db.js";
import User from "./models/User.js";

const updateUser = async () => {
  await connectDB();

  try {
    // Modify with $set
    // const user = await User.findOneAndUpdate(
    //   { name: "Alice" },
    //   { $set: { age: 26 } },
    //   { new: true }
    // );
    // console.log("📌 $set:", user);

    // Add with $push
    // const user = await User.findOneAndUpdate(
    //   { name: "Alice" },
    //   { $push: { skills: "JavaScript" } },
    //   { new: true }
    // );
    // console.log("📌 $push:", user);

    // Remove with $pull
    // const user = await User.findOneAndUpdate(
    //   { name: "Alice" },
    //   { $pull: { skills: "JavaScript" } },
    //   { new: true }
    // );
    // console.log("📌 $pull:", user);

    // Increment with $inc
    const user = await User.findOneAndUpdate(
      { name: "Alice" },
      { $inc: { experience: 1 } },
      { new: true }
    );
    console.log("📌 $inc:", user);
  } catch (error) {
    console.error("❌ Error updating user:", error);
  }
};

updateUser();
