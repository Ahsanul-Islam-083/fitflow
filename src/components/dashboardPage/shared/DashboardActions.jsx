import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, DollarSign, MessageSquare, FileText } from "lucide-react"

const actions = [
  { label: "Add Student", icon: Users, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400" },
  { label: "New Transaction", icon: DollarSign, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { label: "Create Post", icon: MessageSquare, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400" },
  { label: "Generate Report", icon: FileText, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400" },
]

export default function DashboardActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
              >
                <div className={`size-9 rounded-xl flex items-center justify-center ${action.color}`}>
                  <Icon className="size-4" />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
