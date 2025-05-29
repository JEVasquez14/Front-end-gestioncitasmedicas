import React, { useState } from 'react';
import { Navigation } from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddPatient from '../components/AddPatient';
import { PatientList } from '@/components/patient-list';

function Patient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Lista de Pacientes</TabsTrigger>
            <TabsTrigger value="create">Crear Paciente</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <PatientList />
          </TabsContent>
          <TabsContent value="create">
            <AddPatient />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Patient; 