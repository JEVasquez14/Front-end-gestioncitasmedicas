import React from 'react'
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AppointmentForm } from "@/components/appointment-form"
import { AppointmentsList } from "@/components/appointments-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AppointmentsPage() {
  const [refreshList, setRefreshList] = useState(false)

  const handleAppointmentCreated = () => {
    setRefreshList(!refreshList)
  }

  const handleRefresh = () => {
    setRefreshList(!refreshList)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
          <p className="text-gray-600 mt-2">Administra las citas médicas del sistema</p>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Lista de Citas</TabsTrigger>
            <TabsTrigger value="create">Nueva Cita</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <AppointmentsList refresh={refreshList} onRefresh={handleRefresh} />
          </TabsContent>

          <TabsContent value="create">
            <AppointmentForm onSuccess={handleAppointmentCreated} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
