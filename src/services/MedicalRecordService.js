import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const MedicalRecordService = {
  getPatientRecords: async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/records/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createMedicalRecord: async (recordData) => {
    try {
      const response = await axios.post(`${API_URL}/records`, {
        appointmentId: recordData.appointmentId,
        patientId: recordData.patientId,
        diagnosis: recordData.diagnosis,
        notes: recordData.notes
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 