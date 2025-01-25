import { ActiveUsersChart } from "@/components/ActiveUsersChart"
import { ActivityMetricsChart } from "@/components/ActivityMetricsChart"
import { LiveUserCounter } from "@/components/LiveUserCounter"
import { ActivityFeed } from "@/components/ActivityFeed"
import { ConnectionStatus } from "@/components/ConnectionStatus"
import { UserSimulator } from "@/components/UserSimulator"

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveUsersChart />
        <ActivityMetricsChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LiveUserCounter />
        <ActivityFeed />
        <ConnectionStatus />
      </div>
      <UserSimulator />
    </div>
  )
}

