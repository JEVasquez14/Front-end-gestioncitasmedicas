import React from 'react'
import { Calendar, FileText, Users, Home } from "lucide-react"
import { Link } from "react-router-dom"

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/home" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Clínica</span>
            </Link>

            <div className="flex space-x-4">
              <Link to="/appointments" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <Calendar className="h-4 w-4" />
                <span>Citas</span>
              </Link>

              <Link to="/medical-records" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <FileText className="h-4 w-4" />
                <span>Historiales</span>
              </Link>

              <Link to="/schedule" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <Users className="h-4 w-4" />
                <span>Agenda</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Sistema Demo</span>
          </div>
        </div>
      </div>
    </nav>
  )
} 