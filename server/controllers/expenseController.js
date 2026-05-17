import Expense from "../models/Expense.js";


// ADD EXPENSE
export const addExpense = async (req, res) => {

  try {

    const expense = await Expense.create(req.body);

    res.status(201).json({
      success: true,
      message: "Expense Added",
      expense,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET EXPENSES
export const getExpenses = async (req, res) => {

  try {

    const expenses = await Expense.find()
      .sort({ createdAt: -1 });

    res.status(200).json(expenses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// DELETE EXPENSE
export const deleteExpense = async (req, res) => {

  try {

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Expense Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};