import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoctorService } from '@/services/DoctorService';

export function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await DoctorService.getAllDoctors();
        setDoctors(data);
      } catch (err) {
        setError('Error al cargar los doctores');
      }
    };

    fetchDoctors();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lista de Doctores</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="grid gap-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="p-4">
              <div className="space-y-2">
                <h3 className="font-medium">{doctor.fullName}</h3>
                <div className="text-sm text-gray-500">
                  <p>Email: {doctor.email}</p>
                  <p>Especialidad: {doctor.specialty}</p>
                  <p>Horario: {doctor.availableFrom} - {doctor.availableTo}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 