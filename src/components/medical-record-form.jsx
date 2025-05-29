import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { PatientService } from "../services/PacienteService"
import { AppointmentService } from "../services/AppointmentService"
import { MedicalRecordService } from "../services/MedicalRecordService"
import { Toaster } from "./ui/toast"
import { toast } from 'sonner'

export function MedicalRecordForm({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [formData, setFormData] = useState({
    patientId: "",
    appointmentId: "",
    diagnosis: "",
    notes: ""
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patientsData, appointmentsData] = await Promise.all([
          PatientService.getAllPatients(),
          AppointmentService.getAllAppointments()
        ]);
        console.log('Appointments data:', appointmentsData); // Para ver la estructura real
        setPatients(patientsData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Error al cargar los datos");
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await MedicalRecordService.createMedicalRecord({
        patientId: Number(formData.patientId),
        appointmentId: Number(formData.appointmentId),
        diagnosis: formData.diagnosis,
        notes: formData.notes
      });

      setIsLoading(false)
      onSuccess?.()
      setFormData({
        patientId: "",
        appointmentId: "",
        diagnosis: "",
        notes: ""
      })
      toast.success("Registro médico creado exitosamente")
    } catch (error) {
      console.error("Error creating medical record:", error);
      toast.error("Error al crear el registro médico");
      setIsLoading(false);
    }
  }

  // Filtrar citas por paciente seleccionado con validación
  const filteredAppointments = formData.patientId
    ? appointments.filter(app => {
        // Buscar el paciente seleccionado
        const selectedPatient = patients.find(p => p.id.toString() === formData.patientId);
        // Comparar por nombre ya que es lo que tenemos en la cita
        return selectedPatient && app.patientName === selectedPatient.fullName;
      })
    : [];

  return (
    <>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Registro Médico</CardTitle>
          <CardDescription>Crear un nuevo registro médico para un paciente</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Paciente</Label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => {
                  setFormData({ ...formData, patientId: value, appointmentId: "" })
                }}
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
              <Label htmlFor="appointment">Cita Médica</Label>
              <Select
                value={formData.appointmentId}
                onValueChange={(value) => setFormData({ ...formData, appointmentId: value })}
                disabled={!formData.patientId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cita" />
                </SelectTrigger>
                <SelectContent>
                  {filteredAppointments.map((appointment) => (
                    <SelectItem key={appointment.id} value={appointment.id.toString()}>
                      {new Date(appointment.startTime).toLocaleString()} - Dr. {appointment.doctorName} - {appointment.consultRoomName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnóstico</Label>
              <Textarea
                id="diagnosis"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                placeholder="Ingrese el diagnóstico"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Ingrese notas adicionales"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creando registro..." : "Crear Registro Médico"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
} 