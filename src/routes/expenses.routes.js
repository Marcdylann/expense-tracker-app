const express = require('express');

const {
  createExpense,
  getExpenses,
  getSummary,
  updateExpense,
  deleteExpense,
} = require('../services/expenses.service');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { amount, category, note, date } = req.body;

    if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'amount must be a number greater than 0' });
    }

    if (typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ error: 'category is required' });
    }

    const created = await createExpense({
      amount,
      category: category.trim(),
      note,
      date,
    });

    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const expenses = await getExpenses();
    return res.status(200).json(expenses);
  } catch (error) {
    return next(error);
  }
});

router.get('/summary', async (_req, res, next) => {
  try {
    const summary = await getSummary();
    return res.status(200).json(summary);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if ('amount' in updates) {
      if (
        typeof updates.amount !== 'number' ||
        Number.isNaN(updates.amount) ||
        updates.amount <= 0
      ) {
        return res.status(400).json({ error: 'amount must be a number greater than 0' });
      }
    }

    if ('category' in updates) {
      if (typeof updates.category !== 'string' || updates.category.trim() === '') {
        return res.status(400).json({ error: 'category is required' });
      }
      updates.category = updates.category.trim();
    }

    const updated = await updateExpense(id, updates);

    if (!updated) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteExpense(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
