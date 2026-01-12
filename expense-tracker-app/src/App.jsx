import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"

export default function App(){
    return (
            <div style={{ maxWidth: 600, margin: "40px auto", padding: 16 }}>
                <h1 style = {{margin:0}}>Expense tracker</h1>
                <p style = {{margintop:8, fontSize: 18 }}> Total: ₱0</p>
                <ExpenseForm/>
                <ExpenseList/>
            </div>
    )
}