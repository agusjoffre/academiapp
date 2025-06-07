"use client";

import { Database } from "@/database.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Evento = Database["public"]["Tables"]["eventos"]["Row"];

interface EventosListProps {
  eventos: Evento[];
}

const eventTypeLabels = {
  clase: "Clase",
  examen: "Examen",
  tarea: "Tarea",
  personal: "Personal",
  sesion_estudio: "Sesión de Estudio",
};

export function EventosList({ eventos }: EventosListProps) {
  // Sort events by date, upcoming first
  const sortedEventos = [...eventos].sort((a, b) => {
    const dateA = new Date(a.fecha).getTime();
    const dateB = new Date(b.fecha).getTime();
    return dateA - dateB;
  });

  return (
    <div className="space-y-4">
      {sortedEventos.map((evento) => (
        <Card key={evento.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{evento.titulo}</h3>
                <div className="mt-1 text-sm text-muted-foreground">
                  {format(new Date(evento.fecha), "PPP", { locale: es })}
                  {evento.hora && ` • ${evento.hora}`}
                </div>
                {evento.descripcion && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {evento.descripcion}
                  </p>
                )}
              </div>
              <Badge variant="outline">{eventTypeLabels[evento.type]}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
