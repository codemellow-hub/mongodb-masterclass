import connectDB from "./db.js";
import User from "./models/User.js";

const testSearchQueries = async () => {
  await connectDB();

  try {
    // Create text index
    // await User.collection.createIndex({ bio: "text" });
    // console.log("✅ Text Index created on bio field");

    // Full text search
    // const users = await User.find({ $text: { $search: "developer" } });
    // console.log("📌 Users matching 'developer':", users);

    // Search multiple words
    // const users = await User.find({ $text: { $search: "developer engineer" } });
    // console.log("📌 Users matching 'developer' OR 'engineer':", users);

    // Sort search results
    // const users = await User.find(
    //   { $text: { $search: "developer" } },
    //   { score: { $meta: "textScore" } }
    // ).sort({ score: { $meta: "textScore" } });
    // console.log("📌 Users sorted by relevance:", users);

    // Exclude word
    // const users = await User.find({ $text: { $search: "developer -junior" } });
    // console.log("📌 Users matching 'developer' but NOT 'junior':", users);

    // Partial search
    // const users = await User.find({ name: { $regex: "^Al", $options: "i" } });
    // console.log("📌 Users whose name starts with 'Al':", users);

    // Search word in field
    const users = await User.find({ name: { $regex: "son", $options: "i" } });
    console.log("📌 Users with 'son' in their name:", users);
  } catch (error) {
    console.error("❌ Error Search Query:", error);
  }
};

testSearchQueries();
