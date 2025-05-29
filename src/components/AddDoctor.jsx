import React, { useState } from 'react';
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DoctorService } from '@/services/DoctorService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/toast';

function AddDoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    specialty: '',
    availableFrom: '',
    availableTo: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await DoctorService.createDoctor(formData);
      toast.success('Doctor creado exitosamente');
      navigate('/home');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al crear el doctor';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Agregar Nuevo Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Especialidad</label>
                <Input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Horario Desde</label>
                <Input
                  type="time"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Horario Hasta</label>
                <Input
                  type="time"
                  name="availableTo"
                  value={formData.availableTo}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <Button type="submit" className="w-full">
                Crear Doctor
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default AddDoctor; 