const Library = require('../models/libraryModel');

// Middleware to increment the total user count
exports.incrementTotalUser = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalUser: 1 } }, { upsert: true });
    next();
  } catch (error) {
    return next(new Error(`Failed to update total user count: ${error.message}`));
  }
};

// Middleware to decrement the total user count
exports.decrementTotalUser = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalUser: -1 } });
    next();
  } catch (error) {
    return next(new Error(`Failed to update total user count: ${error.message}`));
  }
};

// Middleware to increment the total document count
exports.incrementTotalDocument = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalDocument: 1 } }, { upsert: true });
    next();
  } catch (error) {
    return next(new Error(`Failed to update total document count: ${error.message}`));
  }
};

// Middleware to decrement the total document count
exports.decrementTotalDocument = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalDocument: -1 } });
    next();
  } catch (error) {
    return next(new Error(`Failed to update total document count: ${error.message}`));
  }
};

// Middleware to increment the total category count
exports.incrementTotalCategory = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalCategory: 1 } }, { upsert: true });
    next();
  } catch (error) {
    return next(new Error(`Failed to update total category count: ${error.message}`));
  }
};

// Middleware to decrement the total category count
exports.decrementTotalCategory = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalCategory: -1 } });
    next();
  } catch (error) {
    return next(new Error(`Failed to update total category count: ${error.message}`));
  }
};
