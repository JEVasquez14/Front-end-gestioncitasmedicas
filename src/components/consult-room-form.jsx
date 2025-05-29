import React, { useState } from 'react';
import { ConsultRoomService } from '@/services/ConsultRoomService';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toast";
import { toast } from 'sonner';

export function ConsultRoomForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    floor: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        floor: parseInt(formData.floor)
      };
      
      await ConsultRoomService.createConsultRoom(dataToSubmit);
      toast.success('Consultorio creado exitosamente');
      setFormData({
        name: '',
        floor: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating consultation room:', error);
      toast.error('Error al crear el consultorio');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Consultorio</CardTitle>
          <CardDescription>Crear un nuevo consultorio médico</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Consultorio</Label>
              <Input
                id="name"
                placeholder="Ej: Consultorio 101"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="floor">Piso</Label>
              <Input
                id="floor"
                type="number"
                placeholder="Ej: 1"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Descripción del consultorio"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creando consultorio..." : "Crear Consultorio"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
} 