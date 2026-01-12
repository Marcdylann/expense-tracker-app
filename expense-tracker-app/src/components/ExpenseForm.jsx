export default function ExpenseForm() {
  return (
    <form style = {{display: "grid", gap: 12, marginTop: 16}}>
      <label style = {{display: "grid", gap: 6}}>
        <span>Amount</span>
        <input type = "number" placeholder = "0"/>
      </label>

      <label style = {{display: "grid", gap: 6}} >
        <span>Category</span>
        <select defaultValue="">
            <option value ="" disabled>
                select a category
            </option>
            <option value = "food">Food</option>
            <option value = "transport">Transport</option>
            <option value = "bills">Bills</option>
            <option value = "shopping">Shopping</option>
            <option value = "others">Others</option>

        </select>
        </label>  

       {/* Description for the product */}
      <label style = {{display: "grid", gap: 6}}>
        <span>Description</span>
        <input type = "text" placeholder="Optional"/>
      </label>

      {/* Submit button */}
      <button type = "submit">Add Expense</button>
    </form>
  )
}
