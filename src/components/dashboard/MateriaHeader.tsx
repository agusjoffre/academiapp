"use client";

import { Database } from "@/database.types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Calendar, Award, Target } from "lucide-react";

type Materia = Database["public"]["Tables"]["materias"]["Row"];

interface MateriaHeaderProps {
  materia: Materia;
}

const statusIcons = {
  cursando: <CheckCircle2 className="h-4 w-4 text-blue-500" />,
  aprobada: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  regular: <XCircle className="h-4 w-4 text-yellow-500" />,
};

const statusLabels = {
  cursando: "Cursando",
  aprobada: "Aprobada",
  regular: "Regular",
};

export function MateriaHeader({ materia }: MateriaHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      {/* Title and Status */}
      <div className="flex items-center gap-2 min-w-0">
        <h1 className="text-lg sm:text-xl font-bold truncate">
          {materia.nombre}
        </h1>
        <div className="flex items-center gap-1">
          {statusIcons[materia.status]}
          <span className="text-sm text-muted-foreground">
            {statusLabels[materia.status]}
          </span>
        </div>
      </div>

      {/* Essential Info */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Badge variant={materia.promocion_directa ? "default" : "secondary"}>
          {materia.promocion_directa ? "Promoción Directa" : "Regular"}
        </Badge>
        <Badge variant="outline">{materia.type}</Badge>

        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {format(new Date(materia.start_date), "dd/MM/yy", { locale: es })} -{" "}
            {format(new Date(materia.end_date), "dd/MM/yy", { locale: es })}
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <Award className="h-4 w-4" />
          <span>
            Nota: {materia.nota_final ? materia.nota_final : "Pendiente"}
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <Target className="h-4 w-4" />
          <span>
            Aprob: {materia.nota_aprobacion} | Prom: {materia.nota_promocion}
          </span>
        </div>
      </div>
    </div>
  );
}
