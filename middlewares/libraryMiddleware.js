const Library = require('../models/libraryModel');

// Middleware to increment the total user count
exports.incrementTotalUser = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalUser: 1 } }, { upsert: true });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total user count' });
  }
};

// Middleware to decrement the total user count
exports.decrementTotalUser = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalUser: -1 } });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total user count' });
  }
};

// Middleware to increment the total document count
exports.incrementTotalDocument = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalDocument: 1 } }, { upsert: true });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total document count' });
  }
};

// Middleware to decrement the total document count
exports.decrementTotalDocument = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalDocument: -1 } });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total document count' });
  }
};

// Middleware to increment the total category count
exports.incrementTotalCategory = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalCategroy: 1 } }, { upsert: true });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total category count' });
  }
};

// Middleware to decrement the total category count
exports.decrementTotalCategory = async (req, res, next) => {
  try {
    await Library.updateOne({}, { $inc: { totalCategroy: -1 } });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update total category count' });
  }
};
