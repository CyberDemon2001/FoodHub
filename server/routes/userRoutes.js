const express = require('express');
// const Joi = require('joi');
const {Signup, profileEdit, addAddress, getAddress }=require('../controllers/userController');
const { getRestaurantByName } = require('../controllers/RestaurantController');

const router = express.Router();

router.post('/signup', Signup);
router.get('restaurant/:name',getRestaurantByName);
router.patch('/:id/profile', profileEdit);
router.patch("/:userId/address", addAddress);
router.get("/:userId/address", getAddress);
  
module.exports = router;
