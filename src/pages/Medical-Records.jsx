import { Navigation } from "@/components/navigation"
import { MedicalRecords } from "@/components/medical-records"

export default function MedicalRecordsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Historiales Médicos</h1>
          <p className="text-gray-600 mt-2">Consulta el historial clínico completo de los pacientes</p>
        </div>

        <MedicalRecords />
      </main>
    </div>
  )
}
