"use client";

import { Database } from "@/database.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Examen = Database["public"]["Tables"]["examenes"]["Row"];

interface ExamenesListProps {
  examenes: Examen[];
}

export function ExamenesList({ examenes }: ExamenesListProps) {
  // Sort exams by date, upcoming first
  const sortedExamenes = [...examenes].sort((a, b) => {
    const dateA = new Date(a.fecha).getTime();
    const dateB = new Date(b.fecha).getTime();
    return dateA - dateB;
  });

  return (
    <div className="space-y-4">
      {sortedExamenes.map((examen) => (
        <Card key={examen.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  Examen {examen.type === "parcial" ? "Parcial" : "Final"}
                </h3>
                <div className="mt-1 text-sm text-muted-foreground">
                  {format(new Date(examen.fecha), "PPP", { locale: es })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {examen.nota && (
                  <Badge variant="outline">Nota: {examen.nota}</Badge>
                )}
                {examen.objetivo_nota && (
                  <Badge variant="secondary">
                    Objetivo: {examen.objetivo_nota}
                  </Badge>
                )}
                <Badge
                  variant={
                    examen.status === "completada" ? "default" : "secondary"
                  }
                >
                  {examen.status === "completada" ? "Completado" : "Pendiente"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
