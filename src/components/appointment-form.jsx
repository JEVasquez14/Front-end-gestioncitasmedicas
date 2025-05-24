import React, { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { mockDoctors, mockPatients, mockOffices } from "../data/mock-data"

export function AppointmentForm({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    officeId: "",
    dateTime: "",
    reason: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular creación de cita
    setTimeout(() => {
      setIsLoading(false)
      onSuccess()
      setFormData({
        patientId: "",
        doctorId: "",
        officeId: "",
        dateTime: "",
        reason: "",
      })
      alert("Cita creada exitosamente")
    }, 1000)
  }

  const validateDateTime = (dateTime, doctorId) => {
    if (!dateTime || !doctorId) return true

    const selectedDate = new Date(dateTime)
    const selectedDoctor = mockDoctors.find((d) => d.id.toString() === doctorId)

    if (!selectedDoctor) return false

    const selectedTime = selectedDate.toTimeString().slice(0, 5)
    const { start, end } = selectedDoctor.workingHours

    return selectedTime >= start && selectedTime <= end
  }

  const isDateTimeValid = validateDateTime(formData.dateTime, formData.doctorId)

  return (
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
                  {mockPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id.toString()}>
                      {patient.name}
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
                  {mockDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      {doctor.name} - {doctor.specialty}
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
                value={formData.officeId}
                onValueChange={(value) => setFormData({ ...formData, officeId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar consultorio" />
                </SelectTrigger>
                <SelectContent>
                  {mockOffices.map((office) => (
                    <SelectItem key={office.id} value={office.id.toString()}>
                      {office.name} - {office.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTime">Fecha y Hora</Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                required
              />
              {!isDateTimeValid && formData.dateTime && formData.doctorId && (
                <p className="text-red-600 text-sm">La hora debe estar dentro del horario laboral del médico</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo de la consulta</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Describe el motivo de la consulta..."
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !isDateTimeValid}>
            {isLoading ? "Creando cita..." : "Crear Cita"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 