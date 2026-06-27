"use client"

import { useState } from "react"
import { Dumbbell, Clock, Users, DollarSign, Edit2, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const initialClasses = [
  { id: 1, name: "Power Yoga", schedule: "Mon, Wed, Fri — 7:00 AM", trainer: "Alex Rivera", capacity: 25, enrolled: 22, price: 49, status: "active", description: "Build strength and flexibility with dynamic yoga flows." },
  { id: 2, name: "HIIT Max", schedule: "Tue, Thu — 6:00 PM", trainer: "Jordan Lee", capacity: 30, enrolled: 28, price: 59, status: "active", description: "High-intensity interval training for maximum calorie burn." },
  { id: 3, name: "Strength Foundations", schedule: "Mon, Wed — 5:00 PM", trainer: "Marcus Chen", capacity: 20, enrolled: 15, price: 39, status: "active", description: "Learn proper lifting techniques and build foundational strength." },
]

export default function ClassesManagerCard() {
  const [classes, setClasses] = useState(initialClasses)
  const [editingClass, setEditingClass] = useState(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: "", schedule: "", trainer: "", capacity: "", price: "", description: "", status: "active",
  })

  const resetForm = () => setFormData({ name: "", schedule: "", trainer: "", capacity: "", price: "", description: "", status: "active" })

  const handleAdd = (e) => {
    e.preventDefault()
    const newClass = { id: Date.now(), ...formData, capacity: Number(formData.capacity), enrolled: 0, price: Number(formData.price) }
    setClasses([newClass, ...classes])
    resetForm()
    setShowAddDialog(false)
  }

  const handleEdit = (cls) => {
    setEditingClass(cls)
    setFormData({ name: cls.name, schedule: cls.schedule, trainer: cls.trainer, capacity: String(cls.capacity), price: String(cls.price), description: cls.description, status: cls.status })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setClasses(classes.map((c) => c.id === editingClass.id ? { ...c, ...formData, capacity: Number(formData.capacity), price: Number(formData.price) } : c))
    setEditingClass(null)
    resetForm()
  }

  const handleDelete = (id) => setClasses(classes.filter((c) => c.id !== id))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Class Management</h3>
          <p className="text-sm text-muted-foreground">Manage your fitness programs and schedules</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>Create a new fitness program</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Class Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Trainer</Label>
                  <Input value={formData.trainer} onChange={(e) => setFormData({ ...formData, trainer: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Schedule</Label>
                  <Input value={formData.schedule} onChange={(e) => setFormData({ ...formData, schedule: e.target.value })} required placeholder="e.g. Mon, Wed — 7:00 AM" />
                </div>
                <div className="space-y-2">
                  <Label>Capacity</Label>
                  <Input type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
                <Button type="submit">Create Class</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => {
          const fillPercent = Math.round((cls.enrolled / cls.capacity) * 100)
          return (
            <Card key={cls.id} className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full" />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-9 rounded-xl bg-blue-50 flex items-center justify-center dark:bg-blue-900/30">
                      <Dumbbell className="size-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{cls.name}</CardTitle>
                      <CardDescription>{cls.trainer}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={cls.status === "active" ? "success" : "secondary"}>{cls.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{cls.schedule}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="size-3.5" />
                    <span>{cls.enrolled}/{cls.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <DollarSign className="size-3.5 text-emerald-500" />
                    <span>${cls.price}</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-blue-100 dark:bg-blue-900/30 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-600 dark:bg-blue-400 transition-all" style={{ width: `${fillPercent}%` }} />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleEdit(cls)}>
                    <Edit2 className="size-3 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-destructive hover:text-destructive" onClick={() => handleDelete(cls.id)}>
                    <Trash2 className="size-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingClass} onOpenChange={(open) => { if (!open) setEditingClass(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>Update class details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Class Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Trainer</Label>
                <Input value={formData.trainer} onChange={(e) => setFormData({ ...formData, trainer: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Schedule</Label>
                <Input value={formData.schedule} onChange={(e) => setFormData({ ...formData, schedule: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
