const path = require('path');
const fs = require('fs').promises;

const DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'expenses.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE_PATH);
  } catch (_error) {
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, '[]', 'utf8');
  }
}

async function readExpenses() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE_PATH, 'utf8');

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

async function writeExpenses(expenses) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(expenses, null, 2), 'utf8');
}

function generateId(existingExpenses) {
  const maxId = existingExpenses.reduce((max, expense) => {
    const numericId = Number(expense.id);
    if (Number.isNaN(numericId)) return max;
    return Math.max(max, numericId);
  }, 0);

  return String(maxId + 1);
}

async function createExpense({ amount, category, note, date }) {
  const expenses = await readExpenses();

  const newExpense = {
    id: generateId(expenses),
    amount,
    category,
    note: note || '',
    date: date || new Date().toISOString(),
  };

  expenses.push(newExpense);
  await writeExpenses(expenses);

  return newExpense;
}

async function getExpenses() {
  return readExpenses();
}

async function getSummary() {
  const expenses = await readExpenses();

  const totalsByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorized';
    const amount = Number(expense.amount) || 0;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const total = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

  return {
    total,
    totalsByCategory,
  };
}

async function updateExpense(id, updates) {
  const expenses = await readExpenses();
  const index = expenses.findIndex((expense) => String(expense.id) === String(id));

  if (index === -1) {
    return null;
  }

  expenses[index] = {
    ...expenses[index],
    ...updates,
    id: expenses[index].id,
  };

  await writeExpenses(expenses);
  return expenses[index];
}

async function deleteExpense(id) {
  const expenses = await readExpenses();
  const index = expenses.findIndex((expense) => String(expense.id) === String(id));

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);
  await writeExpenses(expenses);
  return true;
}

module.exports = {
  createExpense,
  getExpenses,
  getSummary,
  updateExpense,
  deleteExpense,
};
