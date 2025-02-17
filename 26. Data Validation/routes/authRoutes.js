import { check, validationResult } from "express-validator";

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({ email: req.body.email });
    res.json(user);
  }
);
