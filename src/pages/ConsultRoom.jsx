import React from 'react';
import { Navigation } from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConsultRoomList } from "@/components/consult-room-list";
import { ConsultRoomForm } from "@/components/consult-room-form";

function ConsultRoom() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Consultorios</h1>
          <p className="text-gray-600 mt-2">Administra los consultorios de la clínica</p>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Lista de Consultorios</TabsTrigger>
            <TabsTrigger value="create">Crear Consultorio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <ConsultRoomList />
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <div className="max-w-2xl">
              <ConsultRoomForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default ConsultRoom; 