import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"

export default function App() {
  return (
    <div style={{maxWidth: 800, margin: "60px auto", padding: 16}}>
      <h1>Expense Tracker</h1>
      <p>Total: ₱0</p>

      <ExpenseForm />
      <ExpenseList />
    </div>
  )
}
