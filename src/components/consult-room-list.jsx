import React, { useEffect, useState } from 'react';
import { ConsultRoomService } from '@/services/ConsultRoomService';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building, MapPin } from "lucide-react";

export function ConsultRoomList() {
  const [consultRooms, setConsultRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsultRooms();
  }, []);

  const loadConsultRooms = async () => {
    try {
      const data = await ConsultRoomService.getAllConsultRooms();
      setConsultRooms(data);
    } catch (error) {
      console.error('Error loading consultation rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Cargando consultorios...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lista de Consultorios</h2>
        <Button onClick={loadConsultRooms} variant="outline">
          Actualizar
        </Button>
      </div>

      {consultRooms.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No hay consultorios registrados</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {consultRooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle className="text-lg">{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Piso {room.floor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{room.description}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 