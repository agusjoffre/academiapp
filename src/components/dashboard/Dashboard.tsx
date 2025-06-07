"use client";

import { useState } from "react";
import { Database } from "../../../database.types";
import { mockData } from "@/lib/mockup";
import { Sidebar } from "./Sidebar";
import { MainPanel } from "./MainPanel";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSwipeable } from "react-swipeable";

type Carrera = Database["public"]["Tables"]["carreras"]["Row"];
type Materia = Database["public"]["Tables"]["materias"]["Row"];

export function Dashboard() {
  const [selectedCarrera, setSelectedCarrera] = useState<Carrera | null>(null);
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);

  // Get the last modified or created carrera
  const defaultCarrera = mockData.carreras.sort((a, b) => {
    const dateA = new Date(a.estimated_end_date || "").getTime();
    const dateB = new Date(b.estimated_end_date || "").getTime();
    return dateB - dateA;
  })[0];

  // Set default carrera on mount
  useState(() => {
    setSelectedCarrera(defaultCarrera);
  });

  // Get materias for selected carrera
  const materiasForCarrera = mockData.materias.filter(
    (materia) => materia.carrera_id === selectedCarrera?.id
  );

  const handleMateriaChange = (materia: Materia) => {
    setSelectedMateria(materia);
    setIsMobileMenuOpen(false);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setIsMobileMenuOpen(true);
      setShowSwipeIndicator(false);
    },
    trackMouse: true,
  });

  return (
    <div className="flex w-full h-full">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block border-r border-border">
        <Sidebar
          carreras={mockData.carreras}
          materias={materiasForCarrera}
          examenes={mockData.examenes}
          selectedCarrera={selectedCarrera}
          selectedMateria={selectedMateria}
          onCarreraChange={setSelectedCarrera}
          onMateriaChange={handleMateriaChange}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <div
            {...swipeHandlers}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-8 z-40"
          >
            {showSwipeIndicator && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary/10 p-2 rounded-r-lg animate-pulse">
                <ChevronRight className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-full">
          <SheetHeader className="sr-only">
            <SheetTitle>Menú de navegación</SheetTitle>
          </SheetHeader>
          <Sidebar
            carreras={mockData.carreras}
            materias={materiasForCarrera}
            examenes={mockData.examenes}
            selectedCarrera={selectedCarrera}
            selectedMateria={selectedMateria}
            onCarreraChange={setSelectedCarrera}
            onMateriaChange={handleMateriaChange}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <MainPanel
          materia={selectedMateria}
          tareas={mockData.tareas}
          subtareas={mockData.subtareas}
          examenes={mockData.examenes}
          eventos={mockData.eventos}
          sesionesEstudio={mockData.sesiones_estudio}
        />
      </div>
    </div>
  );
}
