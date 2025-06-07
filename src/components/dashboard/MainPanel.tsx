"use client";

import { Database } from "@/database.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MateriaHeader } from "./MateriaHeader";
import { Calendar } from "./Calendar";
import { TareasList } from "./TareasList";
import { ExamenesList } from "./ExamenesList";
import { EventosList } from "./EventosList";
import { SesionesList } from "./SesionesList";

type Materia = Database["public"]["Tables"]["materias"]["Row"];
type Tarea = Database["public"]["Tables"]["tareas"]["Row"];
type Subtarea = Database["public"]["Tables"]["subtareas"]["Row"];
type Examen = Database["public"]["Tables"]["examenes"]["Row"];
type Evento = Database["public"]["Tables"]["eventos"]["Row"];
type SesionEstudio = Database["public"]["Tables"]["sesiones_estudio"]["Row"];

interface MainPanelProps {
  materia: Materia | null;
  tareas: Tarea[];
  subtareas: Subtarea[];
  examenes: Examen[];
  eventos: Evento[];
  sesionesEstudio: SesionEstudio[];
}

export function MainPanel({
  materia,
  tareas,
  subtareas,
  examenes,
  eventos,
  sesionesEstudio,
}: MainPanelProps) {
  if (!materia) {
    return (
      <div className="flex-1 p-4 md:p-8">
        <div className="text-center text-muted-foreground">
          Selecciona una materia para ver su información
        </div>
      </div>
    );
  }

  // Filter data for selected materia
  const materiaTareas = tareas.filter((t) => t.materia_id === materia.id);
  const materiaExamenes = examenes.filter((e) => e.materia_id === materia.id);
  const materiaEventos = eventos.filter((e) => e.materia_id === materia.id);
  const materiaSesiones = sesionesEstudio.filter(
    (s) => s.materia_id === materia.id
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 md:p-8">
        <MateriaHeader materia={materia} />

        <Tabs defaultValue="calendario" className="mt-4 md:mt-8">
          <div className="overflow-x-auto">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="calendario">Calendario</TabsTrigger>
              <TabsTrigger value="tareas">Tareas</TabsTrigger>
              <TabsTrigger value="examenes">Exámenes</TabsTrigger>
              <TabsTrigger value="eventos">Eventos</TabsTrigger>
              <TabsTrigger value="sesiones">Sesiones</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="calendario" className="mt-4 md:mt-6">
            <Calendar
              eventos={materiaEventos}
              examenes={materiaExamenes}
              tareas={materiaTareas}
            />
          </TabsContent>

          <TabsContent value="tareas" className="mt-4 md:mt-6">
            <TareasList
              tareas={materiaTareas}
              subtareas={subtareas}
              materiaId={materia.id}
            />
          </TabsContent>

          <TabsContent value="examenes" className="mt-4 md:mt-6">
            <ExamenesList examenes={materiaExamenes} />
          </TabsContent>

          <TabsContent value="eventos" className="mt-4 md:mt-6">
            <EventosList eventos={materiaEventos} />
          </TabsContent>

          <TabsContent value="sesiones" className="mt-4 md:mt-6">
            <SesionesList sesiones={materiaSesiones} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
