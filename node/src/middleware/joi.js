const Joi = require('joi');
const { ResponseObject } = require('../utility/helper')


async function validateUserRegistration(req, res, next) {

  try {
    const signUp_Schema = Joi.object({
      fullName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin:Joi.boolean()
      // activeStatus: Joi.string().valid('Active', 'Inactive').required(),
  
    }).options({
      abortEarly: false,
    });

await signUp_Schema.validateAsync(req.body);
    next();
  }
  catch (error) {
    const msg = error.details.restructureErrors();
    return ResponseObject(res, {
      status: 400,
      success: false,
      message: msg,
      data: {},
    });
  }
}


// Validation schema for user signup
async function validateUserSignIn(req, res, next) {
  console.log('Request Body:', req.body);

  try {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).options({
      abortEarly: false,
    });

    await loginSchema.validateAsync(req.body);
    next();

  }
  catch (error) {
    const msg = error.details.restructureErrors();
    return ResponseObject(res, {
      status: 400,
      success: false,
      message: msg,
      data: {},
    });
  }
}
module.exports = {
  validateUserRegistration,
  validateUserSignIn,
};
