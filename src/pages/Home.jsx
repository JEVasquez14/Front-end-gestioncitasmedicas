import React from 'react'

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, Clock } from "lucide-react"

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Clínica Médica</h1>
          <p className="text-gray-600 mt-2">Gestión integral de citas y historiales médicos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/appointments">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <CardTitle>Gestión de Citas</CardTitle>
                </div>
                <CardDescription>Crear, modificar y gestionar citas médicas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Administra las citas de los pacientes con los médicos</p>
              </CardContent>
            </Card>
          </a>

          <a href="/schedule">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Clock className="h-6 w-6 text-green-600" />
                  <CardTitle>Agenda Médica</CardTitle>
                </div>
                <CardDescription>Ver la agenda de los médicos por día</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Consulta la disponibilidad y citas programadas</p>
              </CardContent>
            </Card>
          </a>

          <a href="/medical-records">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                  <CardTitle>Historiales Médicos</CardTitle>
                </div>
                <CardDescription>Consultar historiales clínicos de pacientes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Accede al historial médico completo de los pacientes</p>
              </CardContent>
            </Card>
          </a>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-blue-600">Gestión de Citas</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Crear nuevas citas médicas</li>
                    <li>• Validación de horarios laborales</li>
                    <li>• Completar y cancelar citas</li>
                    <li>• Vista detallada de todas las citas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">Agenda Médica</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Ver agenda por médico y fecha</li>
                    <li>• Horarios laborales de cada doctor</li>
                    <li>• Estados de las citas en tiempo real</li>
                    <li>• Organización cronológica</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-purple-600">Historiales Médicos</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Consulta por paciente</li>
                    <li>• Historial completo de consultas</li>
                    <li>• Diagnósticos y tratamientos</li>
                    <li>• Información detallada del paciente</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-orange-600">Datos Demo</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 5 médicos especialistas</li>
                    <li>• 6 pacientes registrados</li>
                    <li>• 5 consultorios disponibles</li>
                    <li>• Citas de ejemplo programadas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Home 