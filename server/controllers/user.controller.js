const userModel = require('../models/user.model.js');
const userServices = require('../services/user.services.js');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() });
      }

      const { email, password, fullname } = req.body;

      console.log(req.body, "user.controller");

      const hashPassword = await userModel.hashPassword(password);

      const user = await userServices.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
      });

      const token = user.generateAuthToken();

      return res.status(201).json({ token, user});

    }
    catch (error) {
      next(error);
    }
};