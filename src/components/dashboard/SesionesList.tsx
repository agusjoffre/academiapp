"use client";

import { Database } from "../../../database.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, Calendar, CheckCircle } from "lucide-react";

type SesionEstudio = Database["public"]["Tables"]["sesiones_estudio"]["Row"];

interface SesionesListProps {
  sesiones: SesionEstudio[];
}

export function SesionesList({ sesiones }: SesionesListProps) {
  // Sort sessions by date, most recent first
  const sortedSesiones = [...sesiones].sort((a, b) => {
    const dateA = new Date(a.fecha).getTime();
    const dateB = new Date(b.fecha).getTime();
    return dateB - dateA;
  });

  return (
    <div className="space-y-4">
      {sortedSesiones.map((sesion) => (
        <Card key={sesion.id}>
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              {/* Title */}
              <h3 className="font-medium text-lg">
                {sesion.objetivo || "Sesión de estudio"}
              </h3>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                {/* Duration */}
                {sesion.duracion_minutos && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{sesion.duracion_minutos} minutos</span>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(sesion.fecha), "dd/MM/yyyy", {
                      locale: es,
                    })}
                  </span>
                </div>

                {/* Tasks Completed */}
                {sesion.tareas_completadas !== null && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>{sesion.tareas_completadas} tareas completadas</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
