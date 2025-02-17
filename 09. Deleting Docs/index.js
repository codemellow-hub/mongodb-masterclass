import connectDB from "./db.js";
import User from "./models/User.js";

const deleteUser = async () => {
  await connectDB();

  try {
    // Delete single user
    // const result = await User.deleteOne({ name: "Alice" });
    // console.log("📌 Deleted User:", result);

    // Delete multiple users
    const result = await User.deleteMany({ age: { $gt: 30 } });
    console.log("📌 Deleted Users:", result);
  } catch (error) {
    console.error("❌ Error deleting user:", error);
  }
};

deleteUser();
