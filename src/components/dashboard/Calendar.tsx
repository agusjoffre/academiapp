"use client";

import { Database } from "../../../database.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, getWeek } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

type Tarea = Database["public"]["Tables"]["tareas"]["Row"];
type Examen = Database["public"]["Tables"]["examenes"]["Row"];
type Evento = Database["public"]["Tables"]["eventos"]["Row"];

interface CalendarProps {
  eventos: Evento[];
  examenes: Examen[];
  tareas: Tarea[];
}

const locales = {
  es,
};

const localizer = dateFnsLocalizer({
  format,
  parse: (str) => new Date(str),
  startOfWeek: (date) => {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    return d;
  },
  getDay: (date) => date.getDay(),
  locales,
});

export function Calendar({ eventos, examenes, tareas }: CalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [currentView, setCurrentView] = useState("month");

  // Combine all events for the calendar
  const calendarEvents = [
    ...eventos.map((evento) => ({
      id: evento.id,
      title: evento.titulo,
      start: new Date(evento.fecha + (evento.hora ? `T${evento.hora}` : "")),
      end: new Date(evento.fecha + (evento.hora ? `T${evento.hora}` : "")),
      type: "evento",
      data: evento,
      resource: evento,
    })),
    ...examenes.map((examen) => ({
      id: examen.id,
      title: `Examen ${examen.type}`,
      start: new Date(examen.fecha),
      end: new Date(examen.fecha),
      type: "examen",
      data: examen,
      resource: examen,
    })),
    ...tareas.map((tarea) => ({
      id: tarea.id,
      title: tarea.titulo,
      start: new Date(tarea.end_date || ""),
      end: new Date(tarea.end_date || ""),
      type: "tarea",
      data: tarea,
      resource: tarea,
    })),
  ];

  const eventStyleGetter = (event: any) => {
    let style: any = {
      backgroundColor: "#fff",
      borderRadius: "0.5rem",
      opacity: 0.8,
      color: "#000",
      border: "0px",
      display: "block",
    };

    switch (event.type) {
      case "evento":
        style.backgroundColor = "#3b82f6";
        style.color = "#fff";
        break;
      case "examen":
        style.backgroundColor = "#ef4444";
        style.color = "#fff";
        break;
      case "tarea":
        style.backgroundColor = "#22c55e";
        style.color = "#fff";
        break;
    }

    return {
      style,
    };
  };

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
    setShowEventDialog(true);
  };

  const getCurrentWeek = () => {
    const today = new Date();
    const startDate = new Date("2024-03-01"); // Start of the semester
    const weekNumber = getWeek(today) - getWeek(startDate) + 1;
    return weekNumber;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">
          Semana {getCurrentWeek()} del Cuatrimestre
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Evento</DialogTitle>
            </DialogHeader>
            {/* Form will be added here later */}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-2 sm:p-4">
          <div className="h-[400px] sm:h-[500px] md:h-[600px]">
            <BigCalendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
              views={["month", "week", "day", "agenda"]}
              view={currentView}
              onView={setCurrentView}
              defaultView="month"
              messages={{
                next: "Siguiente",
                previous: "Anterior",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                agenda: "Agenda",
                date: "Fecha",
                time: "Hora",
                event: "Evento",
                noEventsInRange: "No hay eventos en este rango",
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Badge
                variant={
                  selectedEvent?.type === "evento"
                    ? "default"
                    : selectedEvent?.type === "examen"
                    ? "destructive"
                    : "secondary"
                }
              >
                {selectedEvent?.type}
              </Badge>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  window.location.href = `/dashboard/${selectedEvent?.type}/${selectedEvent?.id}`;
                }}
              >
                Ver Detalles
              </Button>
            </div>
            {selectedEvent?.data?.descripcion && (
              <p className="text-sm text-muted-foreground">
                {selectedEvent.data.descripcion}
              </p>
            )}
            {selectedEvent?.data?.hora && (
              <p className="text-sm text-muted-foreground">
                Hora: {selectedEvent.data.hora}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
