
export default function ExpenseItem() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
      <div>
        <div>Chicken rice</div>
        <small>Food</small>
      </div>

      <div style={{ textAlign: "right" }}>
        <div>₱120</div>
        <small>2026-01-12</small>
      </div>
    </div>
  )
}
