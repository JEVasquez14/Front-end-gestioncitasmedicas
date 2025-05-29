import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { PatientService } from "../services/PacienteService"
import { DoctorService } from "../services/DoctorService"
import { AppointmentService } from "../services/AppointmentService"
import { ConsultRoomService } from "../services/ConsultRoomService"
import { Toaster } from "./ui/toast"
import { toast } from 'sonner'

// Mock data solo para consultorios
const mockOffices = [
  { id: 1, name: "Consultorio 101", location: "Primer Piso" },
  { id: 2, name: "Consultorio 102", location: "Primer Piso" },
  { id: 3, name: "Consultorio 201", location: "Segundo Piso" },
]

export function AppointmentForm({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [consultRooms, setConsultRooms] = useState([])
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    consultRoomId: "",
    startTime: "",
    endTime: "",
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patientsData, doctorsData, consultRoomsData] = await Promise.all([
          PatientService.getAllPatients(),
          DoctorService.getAllDoctors(),
          ConsultRoomService.getAllConsultRooms()
        ]);
        setPatients(patientsData);
        setDoctors(doctorsData);
        setConsultRooms(consultRoomsData);
      } catch (error) {
        console.error("Error loading data:", error);
        const errorMessage = error.response?.data?.message || 
          error.response?.data?.error ||
          error.message ||
          "Error desconocido al cargar los datos";
        toast.error(`Error al cargar los datos: ${errorMessage}`);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await AppointmentService.createAppointment({
        patientId: Number(formData.patientId),
        doctorId: Number(formData.doctorId),
        consultRoomId: Number(formData.consultRoomId),
        startTime: formData.startTime,
        endTime: formData.endTime
      });

      setIsLoading(false)
      onSuccess()
      setFormData({
        patientId: "",
        doctorId: "",
        consultRoomId: "",
        startTime: "",
        endTime: "",
      })
      toast.success("Cita creada exitosamente")
    } catch (error) {
      console.error("Error creating appointment:", error);
      const errorMessage = error.response?.data?.message || 
        error.response?.data?.error ||
        error.message ||
        "Error desconocido al crear la cita";
      
      // Mensajes específicos para errores comunes
      let userMessage = "Error al crear la cita: ";
      if (errorMessage.includes("overlap") || errorMessage.includes("conflicto")) {
        userMessage += "Ya existe una cita programada en ese horario";
      } else if (errorMessage.includes("availability") || errorMessage.includes("disponibilidad")) {
        userMessage += "El doctor no está disponible en ese horario";
      } else if (errorMessage.includes("past") || errorMessage.includes("pasado")) {
        userMessage += "No se pueden crear citas en fechas pasadas";
      } else {
        userMessage += errorMessage;
      }
      
      toast.error(userMessage);
      setIsLoading(false);
    }
  }

  const validateDateTime = (startTime, endTime, doctorId) => {
    if (!startTime || !endTime || !doctorId) return true
    const start = new Date(startTime)
    const end = new Date(endTime)
    return start < end
  }

  const isDateTimeValid = validateDateTime(formData.startTime, formData.endTime, formData.doctorId)

  return (
    <>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Nueva Cita Médica</CardTitle>
          <CardDescription>Programa una nueva cita médica para un paciente</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Paciente</Label>
                <Select
                  value={formData.patientId}
                  onValueChange={(value) => setFormData({ ...formData, patientId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select
                  value={formData.doctorId}
                  onValueChange={(value) => setFormData({ ...formData, doctorId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>
                        {doctor.fullName} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="office">Consultorio</Label>
                <Select
                  value={formData.consultRoomId}
                  onValueChange={(value) => setFormData({ ...formData, consultRoomId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar consultorio" />
                  </SelectTrigger>
                  <SelectContent>
                    {consultRooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.name} - {room.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Horario de la Cita</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                  <Input
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>
                {!isDateTimeValid && formData.startTime && formData.endTime && (
                  <p className="text-red-600 text-sm">La hora de fin debe ser posterior a la hora de inicio</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || !isDateTimeValid}>
              {isLoading ? "Creando cita..." : "Crear Cita"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
} 