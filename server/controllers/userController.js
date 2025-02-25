const bcrypt = require('bcrypt');
const UserSchema = require('../models/UserSchema');

const Signup = async (req, res) => {
  // const { error } = UserSchema.validate(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { name, email, password, mobile, dob, department } = req.body;
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User Already Exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserSchema({ name, email, password: hashedPassword, mobile, dob, department });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.err("Error in user registration:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { Signup };
