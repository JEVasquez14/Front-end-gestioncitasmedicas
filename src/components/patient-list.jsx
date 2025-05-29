import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientService } from '@/services/PacienteService';

export function PatientList() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await PatientService.getAllPatients();
        setPatients(data);
      } catch (err) {
        setError('Error al cargar los pacientes');
      }
    };

    fetchPatients();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lista de Pacientes</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="grid gap-4">
          {patients.map((patient) => (
            <Card key={patient.id} className="p-4">
              <div className="space-y-2">
                <h3 className="font-medium">{patient.fullName}</h3>
                <div className="text-sm text-gray-500">
                  <p>Email: {patient.email}</p>
                  <p>Teléfono: {patient.phone}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 