const bcrypt=require('bcryptjs');
const UserSchema=require('../models/UserSignup');
const jwt=require('jsonwebtoken');


const Signup =async (req,res)=>{
const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password, mobile, dob, department } = req.body;

  try {
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User Already Exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserSchema({ name, email, password: hashedPassword, mobile, dob, department });
    await user.save();

    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, department: user.department }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports ={Signup};