import React, { useState } from "react";
import {
  Calendar,
  FileText,
  Users,
  Home,
  LogOut,
  ChevronDown,
  UserPlus,
  User,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export function Navigation() {
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <Link
                to="/appointments"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <Calendar className="h-4 w-4" />
                <span>Citas</span>
              </Link>

              <Link
                to="/medical-records"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <FileText className="h-4 w-4" />
                <span>Historiales</span>
              </Link>

              <Link
                to="/schedule"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <Users className="h-4 w-4" />
                <span>Agenda</span>
              </Link>

              <Link
                to="/doctors"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <User className="h-4 w-4" />
                <span>Doctores</span>
              </Link>
              <Link
                to="/patients"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <User className="h-4 w-4" />
                <span>Pacientes</span>
              </Link>
              <Link
                to="/consult-rooms"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <Building2 className="h-4 w-4" />
                <span>Consultorios</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                <span className="text-sm text-gray-700">
                  {user?.email || "Usuario"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
