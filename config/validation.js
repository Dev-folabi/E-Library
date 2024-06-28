const Joi = require('joi');

const adminSignupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('Admin'),
    gender: Joi.string().valid('Male', 'Female', 'other').required()
});

const userSignupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('User'),
    gender: Joi.string().valid('Male', 'Female', 'other').required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional()
});

const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const updateAdminSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('Male', 'Female', 'other').required()
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('Male', 'Female', 'other').required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
});

module.exports = {
    adminSignupSchema,
    userSignupSchema,
    adminLoginSchema,
    userLoginSchema,
    updateAdminSchema,
    updateUserSchema
};
