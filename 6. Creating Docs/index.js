import connectDB from "./db.js";
import User from "./models/User.js";

const insertUser = async () => {
  await connectDB();

  try {
    const user = await User.create({
      name: "Alice",
      age: 25,
      email: "alice@example.com",
    });
    console.log("🎉 User Created:", user);
  } catch (error) {
    console.error("❌ Error inserting user:", error);
  }
};
insertUser();

const insertMultipleUsers = async () => {
  await connectDB();
  try {
    const users = await User.insertMany([
      { name: "Bob", age: 30, email: "bob@example.com" },
      { name: "Charlie", age: 28, email: "charlie@example.com" },
      { name: "David", age: 35, email: "david@example.com" },
    ]);
    console.log("🎉 Users Created:", users);
  } catch (error) {
    console.error("❌ Error inserting users:", error);
  }
};
insertMultipleUsers();
