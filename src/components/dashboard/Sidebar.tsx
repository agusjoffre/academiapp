"use client";

import { Database } from "../../../database.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Carrera = Database["public"]["Tables"]["carreras"]["Row"];
type Materia = Database["public"]["Tables"]["materias"]["Row"];
type Examen = Database["public"]["Tables"]["examenes"]["Row"];

interface SidebarProps {
  carreras: Carrera[];
  materias: Materia[];
  examenes: Examen[];
  selectedCarrera: Carrera | null;
  selectedMateria: Materia | null;
  onCarreraChange: (carrera: Carrera) => void;
  onMateriaChange: (materia: Materia) => void;
}

const statusBadgeVariants = {
  cursando: "secondary",
  aprobada: "default",
  regular: "secondary",
} as const;

const statusLabels = {
  cursando: "Cursando",
  aprobada: "Aprobada",
  regular: "Regular",
} as const;

const examTypeLabels = {
  parcial: "Parcial",
  final: "Final",
} as const;

export function Sidebar({
  carreras,
  materias,
  examenes,
  selectedCarrera,
  selectedMateria,
  onCarreraChange,
  onMateriaChange,
}: SidebarProps) {
  const materiasActivas = materias.filter((m) => m.status === "cursando");
  const materiasCompletadas = materias.filter(
    (m) => m.status === "aprobada" || m.status === "regular"
  );
  const examenesRecientes = examenes
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 4);

  return (
    <div className="w-full min-h-full border-r bg-card flex flex-col gap-4">
      <div className="p-4 pb-2">
        <h2 className="mb-4 text-lg font-semibold">Carrera</h2>
        <Select
          value={selectedCarrera?.id}
          onValueChange={(value) => {
            const carrera = carreras.find((c) => c.id === value);
            if (carrera) onCarreraChange(carrera);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar carrera" />
          </SelectTrigger>
          <SelectContent>
            {carreras.map((carrera) => (
              <SelectItem key={carrera.id} value={carrera.id}>
                {carrera.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {materiasActivas.length > 0 && (
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">Materias Activas</h2>
          <ScrollArea className="h-full">
            <div className="">
              {materiasActivas.map((materia) => (
                <button
                  key={materia.id}
                  onClick={() => onMateriaChange(materia)}
                  className={cn(
                    "w-full rounded-lg p-3 text-left transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    selectedMateria?.id === materia.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-transparent"
                  )}
                >
                  <div className="font-medium">{materia.nombre}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant={statusBadgeVariants[materia.status]}>
                      {statusLabels[materia.status]}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {materiasCompletadas.length > 0 && (
        <div className="px-4 pb-2">
          <h2 className="mb-4 text-lg font-semibold">Materias Completadas</h2>
          <ScrollArea className="h-[150px]">
            <div className="space-y-2">
              {materiasCompletadas.map((materia) => (
                <button
                  key={materia.id}
                  onClick={() => onMateriaChange(materia)}
                  className={cn(
                    "w-full rounded-lg p-3 text-left transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    selectedMateria?.id === materia.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-transparent"
                  )}
                >
                  <div className="font-medium">{materia.nombre}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant={statusBadgeVariants[materia.status]}>
                      {statusLabels[materia.status]}
                    </Badge>
                    {materia.nota_final && (
                      <Badge variant="outline">
                        Nota: {materia.nota_final}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {examenesRecientes.length > 0 && (
        <div className="px-4 pb-2">
          <h2 className="mb-4 text-lg font-semibold">Últimos Exámenes</h2>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {examenesRecientes.map((examen) => {
                const materia = materias.find(
                  (m) => m.id === examen.materia_id
                );
                return (
                  <div
                    key={examen.id}
                    className="w-full rounded-lg p-3 bg-card border"
                  >
                    <div className="font-medium">{materia?.nombre}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline">
                        {examTypeLabels[examen.type]}
                      </Badge>
                      <Badge
                        variant={
                          examen.status === "completada"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {examen.status === "completada"
                          ? "Completado"
                          : "Pendiente"}
                      </Badge>
                      {examen.nota && (
                        <Badge variant="outline">Nota: {examen.nota}</Badge>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {format(new Date(examen.fecha), "dd/MM/yyyy", {
                        locale: es,
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
