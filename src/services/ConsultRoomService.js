import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const ConsultRoomService = {
  getAllConsultRooms: async () => {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  },

  createConsultRoom: async (consultRoom) => {
    const response = await axios.post(`${API_URL}/rooms`, consultRoom);
    return response.data;
  }
}; 