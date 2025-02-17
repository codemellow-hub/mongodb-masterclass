import connectDB from "./db.js";
import User from "./models/User.js";

const preventSQLInject = async () => {
  await connectDB();

  try {
    // Matches exact email
    // const user = await User.findOne({ email: req.body.email.toString() });

    // Allows attackers to inject operators
    const user = await User.findOne(req.body);
  } catch (error) {
    console.error("❌ Error Preventing Injection:", error);
  }
};

preventSQLInject();
