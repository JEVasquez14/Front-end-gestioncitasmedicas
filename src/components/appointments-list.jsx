import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import { AppointmentService } from "../services/AppointmentService";

export function AppointmentsList({ refresh, onRefresh }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await AppointmentService.getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [refresh]);

  const updateAppointmentStatus = async (id, status) => {
    try {
      setLoading(true);
      await AppointmentService.updateAppointmentStatus(id, status);
      const data = await AppointmentService.getAllAppointments();
      setAppointments(data);
    } catch (error) {}
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment,
      ),
    );
    onRefresh();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "Programada";
      case "COMPLETED":
        return "Completada";
      case "CANCELED":
        return "Cancelada";
      default:
        return status;
    }
  };

  const canModifyAppointment = (appointment) => {
    const appointmentDate = new Date(appointment.startTime);
    const now = new Date();
    return appointmentDate > now && appointment.status === "SCHEDULED";
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Cargando citas...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lista de Citas</h2>
        <Button onClick={fetchAppointments} variant="outline">
          Actualizar
        </Button>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No hay citas programadas</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {appointment.patientName}
                    </CardTitle>
                    <CardDescription>
                      {appointment.consultRoomName}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {getStatusText(appointment.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{appointment.doctorName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {new Date(appointment.startTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {new Date(appointment.startTime).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {appointment.consultRoomName}
                    </span>
                  </div>
                </div>

                {canModifyAppointment(appointment) && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateAppointmentStatus(appointment.id, "COMPLETED")
                      }
                    >
                      Completar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        updateAppointmentStatus(appointment.id, "CANCELED")
                      }
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

