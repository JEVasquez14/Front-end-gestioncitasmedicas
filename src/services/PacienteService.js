import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this to your API URL

export const PatientService = {
  getAllPatients: async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createPatient: async (patientData) => {
    try {
      const response = await axios.post(`${API_URL}/patients`, {
        fullName: patientData.fullName,
        email: patientData.email,
        phone: patientData.phone
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
