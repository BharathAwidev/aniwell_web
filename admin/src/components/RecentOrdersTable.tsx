const ORDERS = [
  {
    id: "#ORD-1001",
    customer: "John Doe",
    status: "Pending",
    total: "$120.00",
  },
  {
    id: "#ORD-1002",
    customer: "Jane Smith",
    status: "Shipped",
    total: "$89.99",
  },
  {
    id: "#ORD-1003",
    customer: "Alex Brown",
    status: "Delivered",
    total: "$240.50",
  },
]

const statusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-[hsl(var(--color-warning))] text-black"
    case "Shipped":
      return "bg-[hsl(var(--color-info))] text-white"
    case "Delivered":
      return "bg-[hsl(var(--color-success))] text-white"
    default:
      return ""
  }
}

export default function RecentOrdersTable() {
  return (
    <div className="rounded-xl bg-[hsl(var(--color-surface))] shadow-sm">
      <div className="border-b border-[hsl(var(--color-border))] px-4 py-3">
        <h3 className="text-sm font-semibold text-[hsl(var(--text-primary))]">
          Recent Orders
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-[hsl(var(--text-muted))]">
            <tr>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>

          <tbody>
            {ORDERS.map(order => (
              <tr
                key={order.id}
                className="border-t border-[hsl(var(--color-border))]"
              >
                <td className="px-4 py-2 font-medium">
                  {order.id}
                </td>
                <td className="px-4 py-2">
                  {order.customer}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {order.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
