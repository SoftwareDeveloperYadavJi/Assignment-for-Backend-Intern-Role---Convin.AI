const Expense = require('../models/expense.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const { equalSplit, exactSplit, percentageSplit } = require('../utils/splitMethods');
const xlsx = require('node-xlsx');

// Add a new expense
const addExpense = async (req, res) => {
  try {
    const { userId, amount, splitMethod, participants } = req.body;

    // Validate incoming data types
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Amount must be a positive number');
    }
    
    const formattedParticipants = participants.map(participant => {
      if (!participant.userId) throw new Error('Participant must have a userId');
      if (splitMethod === 'exact' && typeof participant.amount !== 'number') {
        throw new Error('Exact split requires a numerical amount for each participant');
      }
      if (splitMethod === 'percentage' && typeof participant.percentage !== 'number') {
        throw new Error('Percentage split requires a numerical percentage for each participant');
      }
      return new mongoose.Types.ObjectId(participant.userId);
    });

    // Handle different split methods
    let splitData;
    if (splitMethod === 'equal') {
      splitData = equalSplit(amount, formattedParticipants);
    } else if (splitMethod === 'exact') {
      splitData = exactSplit(amount, participants); // Ensure to pass the original participants with amounts
    } else if (splitMethod === 'percentage') {
      splitData = percentageSplit(amount, participants); // Ensure to pass the original participants with percentages
    } else {
      throw new Error('Invalid split method');
    }

    // Create and save the expense document
    const newExpense = new Expense({
      userId: new mongoose.Types.ObjectId(userId),
      amount,
      splitMethod,
      participants: splitData,
    });

    await newExpense.save();

    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
  } catch (err) {
    res.status(500).json({ message: 'Error adding expense', error: err.message });
  }
};




// healper function to extrat the user expences from the expense data
function extractUsersWithId(data, targetUserId) {
  
  const result = data.reduce((acc, transaction) => {
    // console.log("Processing transaction:", transaction._id);
    const matchingParticipants = transaction.participants.filter(participant => {
    
      return participant.userId.toString() === targetUserId.toString();
    });
    return [...acc, ...matchingParticipants];
  }, []);
  return result;
}

// Get all expenses for a specific user
const getUserExpenses = async (req, res) => {
  try {
    console.log('hello')
    const { userId } = req.params;
    const expenses = await Expense.find({ 'participants.userId': userId });
    const userExpenses = extractUsersWithId(expenses, userId);
    res.status(200).json(userExpenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user expenses', error: err.message });
  }
};

// Get overall expenses for all users
const getOverallExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching overall expenses', error: err.message });
  }
};

// Download balance sheet as Excel file
const downloadBalanceSheet = async (req, res) => {
  try {
    // Fetch all expenses with participant information
    const expenses = await Expense.find().populate('participants.userId', 'name email'); // Populate user details

    const balanceSheetData = [];

    expenses.forEach(expense => {
      expense.participants.forEach(participant => {
        // Check if participant's userId exists and is populated
        if (participant.userId && participant.userId._id) {
          balanceSheetData.push({
            userId: participant.userId._id,
            userName: participant.userId.name || 'Unknown', // Handle missing names
            amount: participant.amount
          });
        } else {
          balanceSheetData.push({
            userId: 'Unknown', // If userId is null, add 'Unknown'
            userName: 'Unknown',
            amount: participant.amount
          });
        }
      });
    });

    // Convert to CSV or Excel
    const csvData = [
      ['User ID', 'User Name', 'Amount'], // Headers
      ...balanceSheetData.map(row => [row.userId, row.userName, row.amount])
    ];

    const csvString = csvData.map(e => e.join(",")).join("\n");
    
    res.setHeader('Content-Type', '');
    res.setHeader('Content-Disposition', 'attachment; filename=balance_sheet.csv');
    res.status(200).end(csvString);
    
  } catch (err) {
    res.status(500).json({ message: 'Error generating balance sheet', error: err.message });
  }
};



module.exports = { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet };
