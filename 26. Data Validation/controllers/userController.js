export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });

    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists!" });
    }
  }
};
