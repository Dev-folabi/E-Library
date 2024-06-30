const Library = require('../models/libraryModel');

// Middleware to increment the total user count
exports.incrementTotalUser = async () => {
  try {
    await Library.updateOne({}, { $inc: { totalUser: 1 } }, { upsert: true });
    return true
  } catch (error) {
    return next(new Error(`Failed to update total user count: ${error.message}`));
  }
};

// Middleware to decrement the total user count
exports.decrementTotalUser = async () => {
  try {
    await Library.updateOne({}, { $inc: { totalUser: -1 } });
    return true
  } catch (error) {
    return next(new Error(`Failed to update total user count: ${error.message}`));
  }
};

// Middleware to increment the total document count
exports.incrementTotalDocument = async () => {
  try {
    await Library.updateOne({}, { $inc: { totalDocument: 1 } }, { upsert: true });
    return true
  } catch (error) {
    return next(new Error(`Failed to update total document count: ${error.message}`));
  }
};

// Middleware to decrement the total document count
exports.decrementTotalDocument = async () => {
  try {
    await Library.updateOne({}, { $inc: { totalDocument: -1 } });
    return true
  } catch (error) {
    return next(new Error(`Failed to update total document count: ${error.message}`));
  }
};

// Middleware to increment the total category count
exports.incrementTotalCategory = async () => {
  try {
    await Library.updateOne({}, { $inc: { totalCategory: 1 } }, { upsert: true });
    return true
  } catch (error) {
    return next(new Error(`Failed to update total category count: ${error.message}`));
  }
};

// Middleware to decrement the total category count
exports.decrementTotalCategory = async () => {
  try {
    await Library.updateOne({}, { $inc: { totalCategory: -1 } });
    return true
  } catch (error) {
    return next(new Error(`Failed to update total category count: ${error.message}`));
  }
};
