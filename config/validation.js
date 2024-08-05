const Joi = require('joi');

const adminSignupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required().custom((value, helper) => {
        if (!value.endsWith('@staff.unilorin.edu.ng')) {
            return helper.message('The library is for University of Ilorin only');
        }
        return value;
    }),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('Admin'),
    gender: Joi.string().valid('Male', 'Female', 'other').required()
});

const userSignupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required().custom((value, helper) => {
        if (!value.endsWith('@students.unilorin.edu.ng')) {
            return helper.message('The library is for University of Ilorin only');
        }
        return value;
    }),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('User'),
    matric: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional()
  });

const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const userLoginSchema = Joi.object({
    emailOrMatric: Joi.string().required(),
    password: Joi.string().required()
});

const updateAdminSchema = Joi.object({
    name: Joi.string().min(3).required().optional(),
    email: Joi.string().email().optional().custom((value, helper) => {
        if (!value.endsWith('@students.unilorin.edu.ng')) {
            return helper.message('The library is for University of Ilorin students only');
        }
        return value;
    }),
    gender: Joi.string().valid('Male', 'Female', 'other').required()
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).optional(),
    email: Joi.string().email().optional().custom((value, helper) => {
        if (!value.endsWith('@students.unilorin.edu.ng')) {
            return helper.message('The library is for University of Ilorin students only');
        }
        return value;
    }),
    gender: Joi.string().valid('Male', 'Female', 'other').optional(),
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
