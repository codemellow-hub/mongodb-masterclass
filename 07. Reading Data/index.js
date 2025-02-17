import connectDB from "./db.js";
import User from "./models/User.js";

const fetchUsers = async () => {
  await connectDB();

  try {
    // All users
    // const users = await User.find();
    // console.log("📌 All Users:", users);

    // Users 25 or older
    // const users = await User.find({ age: { $gte: 25 } });
    // console.log("📌 Users 25 & Older:", users);

    // Users name start with 'A'
    // const users = await User.find({ name: { $regex: "^A", $options: "i" } });
    // console.log("📌 Users with Names Starting with 'A':", users);

    // Only name & email fields
    const users = await User.find({}, { name: 1, email: 1, _id: 0 });
    console.log("📌 Users with Selected Fields:", users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
  }
};

fetchUsers();
