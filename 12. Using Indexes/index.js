import connectDB from "./db.js";
import User from "./models/User.js";

const testQueryPerformance = async () => {
  await connectDB();

  try {
    // console.time("Query Time");
    // const user = await User.findOne({ email: "alice@example.com" });
    // console.timeEnd("Query Time");
    // console.log("📌 User Found:", user);

    // Query with explain()
    // const explainResult = await User.findOne({
    //   email: "alice@example.com",
    // }).explain("executionStats");
    // console.log("📌 Query Execution Stats:", explainResult.executionStats);

    // Index on 'experience'
    // await User.collection.createIndex({ experience: 1 });
    // console.log("✅ Index created on experience field");

    // Check used index
    // const explainResult = await User.findOne({
    //   experience: 4,
    // }).explain("executionStats");
    // console.log(
    //   "📌 Query Execution Stats (After Index):",
    //   explainResult.executionStats
    // );

    // Compound index
    // await User.collection.createIndex({ age: 1, name: 1 });
    // console.log("✅ Compound Index created on age and name fields");

    // Search compound index
    // const explainResult = await User.findOne({ age: 25, name: "Alice" }).explain("executionStats");
    // console.log("📌 Query Execution Stats (Compound Index):", explainResult.executionStats);

    // Text index for search
    // await User.collection.createIndex({ bio: "text" });
    // console.log("✅ Text Index created on bio field");

    // Search text index
    const users = await User.find({ $text: { $search: "developer" } });
    console.log("📌 Users matching 'developer':", users);
  } catch (error) {
    console.error("❌ Error Testing Performance:", error);
  }
};

testQueryPerformance();
