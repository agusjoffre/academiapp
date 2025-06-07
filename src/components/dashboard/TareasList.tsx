"use client";

import { Database } from "@/database.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type Tarea = Database["public"]["Tables"]["tareas"]["Row"];
type Subtarea = Database["public"]["Tables"]["subtareas"]["Row"];

interface TareasListProps {
  tareas: Tarea[];
  subtareas: Subtarea[];
  materiaId: string;
}

export function TareasList({ tareas, subtareas, materiaId }: TareasListProps) {
  const [completedTareas, setCompletedTareas] = useState<Set<string>>(
    new Set()
  );
  const [completedSubtareas, setCompletedSubtareas] = useState<Set<string>>(
    new Set()
  );
  const [expandedTareas, setExpandedTareas] = useState<Set<string>>(new Set());

  const handleTareaToggle = (tareaId: string) => {
    const newCompleted = new Set(completedTareas);
    if (newCompleted.has(tareaId)) {
      newCompleted.delete(tareaId);
    } else {
      newCompleted.add(tareaId);
    }
    setCompletedTareas(newCompleted);
  };

  const handleSubtareaToggle = (subtareaId: string) => {
    const newCompleted = new Set(completedSubtareas);
    if (newCompleted.has(subtareaId)) {
      newCompleted.delete(subtareaId);
    } else {
      newCompleted.add(subtareaId);
    }
    setCompletedSubtareas(newCompleted);
  };

  const toggleTareaExpansion = (tareaId: string) => {
    const newExpanded = new Set(expandedTareas);
    if (newExpanded.has(tareaId)) {
      newExpanded.delete(tareaId);
    } else {
      newExpanded.add(tareaId);
    }
    setExpandedTareas(newExpanded);
  };

  return (
    <div className="space-y-4">
      {tareas.map((tarea) => {
        const tareaSubtareas = subtareas.filter(
          (subtarea) => subtarea.tarea_id === tarea.id
        );
        const isCompleted = completedTareas.has(tarea.id);
        const allSubtareasCompleted =
          tareaSubtareas.length > 0 &&
          tareaSubtareas.every((subtarea) =>
            completedSubtareas.has(subtarea.id)
          );
        const isExpanded = expandedTareas.has(tarea.id);

        return (
          <Card key={tarea.id}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isCompleted || allSubtareasCompleted}
                  onCheckedChange={() => handleTareaToggle(tarea.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="font-medium truncate">{tarea.titulo}</h3>
                      {tareaSubtareas.length > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 sm:hidden"
                          onClick={() => toggleTareaExpansion(tarea.id)}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {tarea.end_date && (
                        <Badge variant="outline" className="whitespace-nowrap">
                          {format(new Date(tarea.end_date), "dd/MM/yy", {
                            locale: es,
                          })}
                        </Badge>
                      )}
                      <Badge variant={isCompleted ? "default" : "secondary"}>
                        {isCompleted ? "Completada" : "Pendiente"}
                      </Badge>
                    </div>
                  </div>
                  {tarea.descripcion && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2 sm:line-clamp-none">
                      {tarea.descripcion}
                    </p>
                  )}
                  {tareaSubtareas.length > 0 && (
                    <div
                      className={`mt-4 space-y-2 ${
                        !isExpanded ? "hidden sm:block" : ""
                      }`}
                    >
                      {tareaSubtareas.map((subtarea) => (
                        <div
                          key={subtarea.id}
                          className="flex items-start gap-3 rounded-lg border p-2 sm:p-3"
                        >
                          <Checkbox
                            checked={completedSubtareas.has(subtarea.id)}
                            onCheckedChange={() =>
                              handleSubtareaToggle(subtarea.id)
                            }
                            className="mt-1"
                          />
                          <div className="min-w-0">
                            <div className="font-medium truncate">
                              {subtarea.titulo}
                            </div>
                            {subtarea.descripcion && (
                              <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {subtarea.descripcion}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
