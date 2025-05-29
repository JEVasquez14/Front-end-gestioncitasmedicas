import React, { useState, useEffect } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Clock, User } from "lucide-react"
import { DoctorService } from "../services/DoctorService"
import { AppointmentService } from "../services/AppointmentService"
import { toast } from 'sonner'

export function DoctorSchedule() {
  const [doctors, setDoctors] = useState([])
  const [selectedDoctorId, setSelectedDoctorId] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Cargar lista de doctores
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const doctorsData = await DoctorService.getAllDoctors();
        setDoctors(doctorsData);
        if (doctorsData.length > 0) {
          setSelectedDoctorId(doctorsData[0].id.toString());
        }
      } catch (error) {
        console.error("Error loading doctors:", error);
        toast.error("Error al cargar la lista de doctores");
      }
    };

    loadDoctors();
  }, []);

  // Cargar citas cuando cambia el doctor o la fecha
  useEffect(() => {
    const loadAppointments = async () => {
      if (!selectedDoctorId || !selectedDate) return;

      setIsLoading(true);
      try {
        const appointmentsData = await AppointmentService.getDoctorAppointments(
          selectedDoctorId,
          selectedDate
        );
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error loading appointments:", error);
        toast.error("Error al cargar las citas");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, [selectedDoctorId, selectedDate]);

  const selectedDoctor = doctors.find((d) => d.id.toString() === selectedDoctorId)

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800"
      case "COMPLETED":
        return "bg-green-100 text-green-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "Programada"
      case "COMPLETED":
        return "Completada"
      case "CANCELLED":
        return "Cancelada"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agenda del Médico</CardTitle>
          <CardDescription>Consulta la agenda de citas por médico y fecha</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Médico</Label>
              <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar médico" />
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

            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input 
                id="date" 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
              />
            </div>
          </div>

          {selectedDoctor && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">{selectedDoctor.fullName}</h3>
              <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
              <p className="text-sm text-gray-600">
                Horario: {selectedDoctor.availableFrom} - {selectedDoctor.availableTo}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Citas del Día</CardTitle>
          <CardDescription>
            {selectedDate &&
              new Date(selectedDate).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Cargando citas...</div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No hay citas programadas para este día</div>
          ) : (
            <div className="space-y-4">
              {appointments
                .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                .map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {new Date(appointment.startTime).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{appointment.patientName}</span>
                      </div>
                      <span className="text-sm text-gray-600">{appointment.consultRoomName}</span>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 