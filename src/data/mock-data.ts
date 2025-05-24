import type { Doctor, Patient, Office, Appointment, MedicalRecord } from "@/types"

export const mockDoctors: Doctor[] = [
  { id: 1, name: "Dr. García", specialty: "Cardiología", workingHours: { start: "08:00", end: "17:00" } },
  { id: 2, name: "Dr. López", specialty: "Pediatría", workingHours: { start: "09:00", end: "18:00" } },
  { id: 3, name: "Dr. Martínez", specialty: "Neurología", workingHours: { start: "07:00", end: "16:00" } },
  { id: 4, name: "Dra. Rodríguez", specialty: "Ginecología", workingHours: { start: "08:30", end: "17:30" } },
  { id: 5, name: "Dr. Fernández", specialty: "Traumatología", workingHours: { start: "09:00", end: "18:00" } },
]

export const mockPatients: Patient[] = [
  { id: 1, name: "Juan Pérez", email: "juan@email.com", phone: "123456789", birthDate: "1990-01-01" },
  { id: 2, name: "María González", email: "maria@email.com", phone: "987654321", birthDate: "1985-05-15" },
  { id: 3, name: "Carlos Rodríguez", email: "carlos@email.com", phone: "456789123", birthDate: "1992-12-10" },
  { id: 4, name: "Ana Martínez", email: "ana@email.com", phone: "789123456", birthDate: "1988-03-22" },
  { id: 5, name: "Luis Sánchez", email: "luis@email.com", phone: "321654987", birthDate: "1995-07-08" },
  { id: 6, name: "Carmen López", email: "carmen@email.com", phone: "654987321", birthDate: "1982-11-30" },
]

export const mockOffices: Office[] = [
  { id: 1, name: "Consultorio 1", location: "Planta Baja" },
  { id: 2, name: "Consultorio 2", location: "Primer Piso" },
  { id: 3, name: "Consultorio 3", location: "Segundo Piso" },
  { id: 4, name: "Consultorio 4", location: "Primer Piso" },
  { id: 5, name: "Sala de Emergencias", location: "Planta Baja" },
]

export const mockAppointments: Appointment[] = [
  {
    id: 1,
    patient: mockPatients[0],
    doctor: mockDoctors[0],
    office: mockOffices[0],
    dateTime: "2024-01-25T09:00:00",
    status: "SCHEDULED",
    reason: "Consulta de rutina cardiológica",
  },
  {
    id: 2,
    patient: mockPatients[1],
    doctor: mockDoctors[1],
    office: mockOffices[1],
    dateTime: "2024-01-25T10:30:00",
    status: "COMPLETED",
    reason: "Control pediátrico",
  },
  {
    id: 3,
    patient: mockPatients[2],
    doctor: mockDoctors[2],
    office: mockOffices[2],
    dateTime: "2024-01-25T14:00:00",
    status: "SCHEDULED",
    reason: "Dolor de cabeza persistente",
  },
  {
    id: 4,
    patient: mockPatients[3],
    doctor: mockDoctors[3],
    office: mockOffices[3],
    dateTime: "2024-01-25T11:00:00",
    status: "COMPLETED",
    reason: "Control ginecológico anual",
  },
  {
    id: 5,
    patient: mockPatients[4],
    doctor: mockDoctors[4],
    office: mockOffices[0],
    dateTime: "2024-01-26T08:30:00",
    status: "SCHEDULED",
    reason: "Lesión en rodilla",
  },
  {
    id: 6,
    patient: mockPatients[5],
    doctor: mockDoctors[0],
    office: mockOffices[1],
    dateTime: "2024-01-26T15:00:00",
    status: "CANCELLED",
    reason: "Consulta cardiológica",
  },
]

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 1,
    appointment: mockAppointments[1],
    diagnosis: "Desarrollo normal para la edad",
    treatment: "Continuar con vitaminas y controles regulares",
    notes: "Paciente en excelente estado de salud",
    createdAt: "2024-01-25T10:30:00",
  },
  {
    id: 2,
    appointment: mockAppointments[3],
    diagnosis: "Examen ginecológico normal",
    treatment: "Continuar con controles anuales",
    notes: "Se recomienda mamografía el próximo año",
    createdAt: "2024-01-25T11:00:00",
  },
]
