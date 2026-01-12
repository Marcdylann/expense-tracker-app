import ExpenseItem from "./ExpenseItem"

export default function ExpenseList(){
    return (
        <section>
            <h2>Expenses</h2>


             {/* Empty state message */}
             <p>No expenses yet</p>

            {/* List of ExpenseItem components */}
            <ExpenseItem/>
            
        </section>
    )
}