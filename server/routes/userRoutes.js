const express = require('express');
const Joi = require('joi');
const {Signup}=require('../controllers/userController');

const router = express.Router();

// const signupSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
//   mobile: Joi.string().length(10).required(),
//   dob: Joi.date().required(),
//   department: Joi.string().required()
// });

router.post('/signup', Signup);
  
module.exports = router;
