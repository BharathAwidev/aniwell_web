import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import KpiCard from "../../components/KpiCard"
import OrderStatusStrip from "../../components/OrderStatusStrip"
import RecentOrdersTable from "../../components/RecentOrdersTable"


export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Revenue"
          value="$12,450"
          icon={<DollarSign size={18} />}
        />
        <KpiCard
          label="Orders"
          value="342"
          icon={<ShoppingCart size={18} />}
        />
        <KpiCard
          label="Customers"
          value="1,290"
          icon={<Users size={18} />}
        />
        <KpiCard
          label="Conversion"
          value="3.4%"
          icon={<TrendingUp size={18} />}
        />
      </div>

      {/* ORDER STATUS */}
      <OrderStatusStrip />

      {/* CHART PLACEHOLDER */}
      <div className="h-64 rounded-xl bg-[hsl(var(--color-surface))] flex items-center justify-center text-[hsl(var(--text-muted))] shadow-sm">
        Revenue Chart (Coming Soon)
      </div>

      {/* RECENT ORDERS */}
      <RecentOrdersTable />
    </div>
  )
}
