import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this to your API URL

export const DoctorService = {
  getAllDoctors: async () => {
    try {
      const response = await axios.get(`${API_URL}/doctors`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createDoctor: async (doctorData) => {
    try {
      const response = await axios.post(`${API_URL}/doctors`, {
        fullName: doctorData.fullName,
        email: doctorData.email,
        specialty: doctorData.specialty,
        availableFrom: doctorData.availableFrom,
        availableTo: doctorData.availableTo
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
