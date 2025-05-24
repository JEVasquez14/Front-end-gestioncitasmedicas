import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Sistema de Gestión Clínica
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestiona citas médicas, historiales clínicos y agenda de doctores en un solo lugar
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Iniciar Sesión
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/register")}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Registrarse
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Gestión de Citas</h3>
              <p className="text-gray-600">
                Programa y administra citas médicas de manera eficiente
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Historiales Médicos</h3>
              <p className="text-gray-600">
                Accede a historiales médicos de forma segura y organizada
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Agenda Médica</h3>
              <p className="text-gray-600">
                Gestiona los horarios y disponibilidad de los doctores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
