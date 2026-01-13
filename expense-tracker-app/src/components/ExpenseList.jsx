import ExpenseItem from "./ExpenseItem"

export default function ExpenseList() {
  return (
    <section style={{ marginTop: 24 }}>
      <h2>Expenses</h2>

      <p>No expenses yet.</p>

      <ExpenseItem />
      <ExpenseItem />
    </section>
  )
}