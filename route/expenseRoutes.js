const express = require('express');
const { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet } = require('../controllers/expenseController');
const expenseRouter = express.Router();

// Route to add a new expense
expenseRouter.post('/add', addExpense);

// Route to get expenses for a specific user
expenseRouter.get('/user/:userId', getUserExpenses);

// Route to get overall expenses for all users
expenseRouter.get('/overall', getOverallExpenses);

// Route to download the balance sheet as an Excel file
expenseRouter.get('/download', downloadBalanceSheet);

module.exports = {expenseRouter};
