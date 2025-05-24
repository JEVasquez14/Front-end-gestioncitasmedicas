// src/utils/api.js

const baseUrl = "http://localhost:8080/api"

export const auth = {
    get: async (url) => {
      const token = localStorage.getItem("token")
      const response = await fetch(`${baseUrl}${url}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Error en la petición")
      }
      return response.json()
    },
  
    post: async (url, data) => {
      const token = localStorage.getItem("token")
      const response = await fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Error en la petición")
      }
      return response.json()
    },
    // Agregar más métodos según necesites
  }