const mongoose = require('mongoose');
const User  = require('../models/user.model');


const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
  participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      amount: { type: Number } // amount may vary for exact/percentage split
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
