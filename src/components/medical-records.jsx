import React, { useState, useEffect } from "react"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { PatientService } from "../services/PacienteService"
import { MedicalRecordService } from "../services/MedicalRecordService"
import { MedicalRecordForm } from "./medical-record-form"
import { toast } from 'sonner'

export function MedicalRecords() {
  const [selectedPatientId, setSelectedPatientId] = useState("")
  const [medicalRecords, setMedicalRecords] = useState([])
  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const patientsData = await PatientService.getAllPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error loading patients:", error);
        toast.error("Error al cargar los pacientes");
      }
    };

    loadPatients();
  }, []);

  useEffect(() => {
    const loadRecords = async () => {
      if (!selectedPatientId) return;
      
      setIsLoading(true);
      try {
        const records = await MedicalRecordService.getPatientRecords(selectedPatientId);
        setMedicalRecords(records);
      } catch (error) {
        console.error("Error loading medical records:", error);
        toast.error("Error al cargar los registros médicos");
      } finally {
        setIsLoading(false);
      }
    };

    loadRecords();
  }, [selectedPatientId]);

  const selectedPatient = patients.find((p) => p.id.toString() === selectedPatientId);

  const handleRecordCreated = () => {
    if (selectedPatientId) {
      MedicalRecordService.getPatientRecords(selectedPatientId)
        .then(records => setMedicalRecords(records))
        .catch(error => {
          console.error("Error refreshing records:", error);
          toast.error("Error al actualizar los registros");
        });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Registros</TabsTrigger>
          <TabsTrigger value="create">Crear Registro</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial Clínico</CardTitle>
              <CardDescription>Consulta el historial médico completo de los pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente</Label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.fullName} - {patient.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPatient && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">{selectedPatient.fullName}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                      <p>Email: {selectedPatient.email}</p>
                      <p>Teléfono: {selectedPatient.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {selectedPatientId && (
            <Card>
              <CardHeader>
                <CardTitle>Registros Médicos</CardTitle>
                <CardDescription>Historial de consultas y tratamientos</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">Cargando registros...</div>
                ) : medicalRecords.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No hay registros médicos para este paciente</div>
                ) : (
                  <div className="space-y-4">
                    {medicalRecords
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((record) => (
                        <div key={record.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">
                                Registro - {new Date(record.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="grid gap-3">
                            <div>
                              <h4 className="font-medium text-sm text-gray-700">Diagnóstico:</h4>
                              <p className="text-sm">{record.diagnosis}</p>
                            </div>

                            {record.notes && (
                              <div>
                                <h4 className="font-medium text-sm text-gray-700">Notas adicionales:</h4>
                                <p className="text-sm">{record.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <div className="max-w-2xl">
            <MedicalRecordForm onSuccess={handleRecordCreated} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 