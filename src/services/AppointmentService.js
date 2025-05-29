import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const AppointmentService = {
  getAllAppointments: async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDoctorAppointments: async (doctorId, date) => {
    try {
      const response = await axios.get(`${API_URL}/appointments`, {
        params: {
          doctorId,
          date
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createAppointment: async (appointmentData) => {
    try {
      const response = await axios.post(`${API_URL}/appointments`, {
        patientId: appointmentData.patientId,
        doctorId: appointmentData.doctorId,
        consultRoomId: appointmentData.consultRoomId,
        startTime: appointmentData.startTime,
        endTime: appointmentData.endTime,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAppointmentStatus: async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/appointments/${id}`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
