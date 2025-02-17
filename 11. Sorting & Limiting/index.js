import connectDB from "./db.js";
import User from "./models/User.js";

const fetchUsers = async () => {
  await connectDB();

  try {
    // Sort ascending
    // const users = await User.find().sort({ age: 1 });
    // console.log("📌 Sorted by Age (Ascending):", users);

    // Sort descending
    // const users = await User.find().sort({ age: -1 });
    // console.log("📌 Sorted by Age (Descending):", users);

    // Sort multiple fields
    // const users = await User.find().sort({ age: 1, name: 1 });
    // console.log("📌 Sorted by Age & Name:", users);

    // Limit results
    // const users = await User.find().limit(5);
    // console.log("📌 First 5 Users:", users);

    // Skip docs
    const users = await User.find().skip(5).limit(5);
    console.log("📌 Users (Page 2):", users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
  }
};

// fetchUsers();

const getUsersByPage = async (page, limit) => {
  await connectDB();

  try {
    const users = await User.find()
      .sort({ age: 1 }) // Sort by age ascending
      .skip((page - 1) * limit) // Skip previous pages
      .limit(limit); // Limit results per page

    console.log(`📌 Users (Page ${page}):`, users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
  }
};

getUsersByPage(2, 5);
