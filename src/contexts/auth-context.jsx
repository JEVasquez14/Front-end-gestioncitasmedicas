import React, { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const API_URL = "http://localhost:8080/api"
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Verificar token al iniciar/recargar la aplicación
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem("token")
    if (token) {
      // Verificar si el token es válido decodificándolo
      const decodedUser = decodeToken(token)
      if (decodedUser && decodedUser.exp * 1000 > Date.now()) {
        setUser(decodedUser)
      } else {
        // Si el token expiró, limpiar todo
        logout()
      }
    }
    setLoading(false)
  }

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error en la autenticación")
      }

      const { token } = await response.json()
      
      // Guardar el token en localStorage
      localStorage.setItem("token", token)
      
      // Decodificar y guardar la información del usuario
      const decodedUser = decodeToken(token)
      setUser(decodedUser)

      // Redirigir al home
      navigate("/home")
      
      return { success: true }
    } catch (error) {
      console.error("Error de login:", error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.name,
          email: userData.email,
          password: userData.password,
          roleId: 1
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error en el registro")
      }

      return { success: true }
    } catch (error) {
      console.error("Error de registro:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/")
  }

  // Función para decodificar el token JWT
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(window.atob(base64))
      return payload
    } catch (error) {
      console.error("Error decodificando token:", error)
      return null
    }
  }

  // Función para obtener el token actual
  const getToken = () => localStorage.getItem("token")

  // Función para verificar si hay un token válido
  const isAuthenticated = () => {
    const token = getToken()
    if (!token) return false
    
    const decodedToken = decodeToken(token)
    return decodedToken && decodedToken.exp * 1000 > Date.now()
  }

  const value = {
    user,
    login,
    logout,
    register,
    getToken,
    isAuthenticated,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}