const Library = require('../models/libraryModel');

// Middleware to increment the total user count
exports.incrementTotalUser = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalUser: 1 } }, { upsert: true });
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total user count', details: error.message });
  }
};

// Middleware to decrement the total user count
exports.decrementTotalUser = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalUser: -1 } });
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total user count', details: error.message });
  }
};

// Middleware to increment the total document count
exports.incrementTotalDocument = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalDocument: 1 } }, { upsert: true });
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total document count', details: error.message });
  }
};

// Middleware to decrement the total document count
exports.decrementTotalDocument = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalDocument: -1 } });
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total document count', details: error.message });
  }
};

// Middleware to increment the total category count
exports.incrementTotalCategory = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalCategory: 1 } }, { upsert: true });
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total category count', details: error.message });
  }
};

// Middleware to decrement the total category count
exports.decrementTotalCategory = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalCategory: -1 } });
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total category count', details: error.message });
  }
};
