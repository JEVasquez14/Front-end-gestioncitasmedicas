const API_URL = "http://localhost:8080/api"

export const api = {
  request: async (endpoint, options = {}) => {
    const token = localStorage.getItem("token")
    
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config)
      
      // Si el token expiró o es inválido
      if (response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
        throw new Error("Sesión expirada")
      }

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error en la petición")
      }

      return response.json()
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  },

  get: (endpoint) => {
    return api.request(endpoint, { method: "GET" })
  },

  post: (endpoint, data) => {
    return api.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  put: (endpoint, data) => {
    return api.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete: (endpoint) => {
    return api.request(endpoint, { method: "DELETE" })
  },
} 