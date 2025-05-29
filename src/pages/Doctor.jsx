import React, { useState } from 'react';
import { Navigation } from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddDoctor from '../components/AddDoctor';
import { DoctorList } from '@/components/doctor-list';

function Doctor() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Lista de Doctores</TabsTrigger>
            <TabsTrigger value="create">Crear Doctor</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <DoctorList />
          </TabsContent>
          <TabsContent value="create">
            <AddDoctor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Doctor; 