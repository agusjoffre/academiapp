import { Database } from "../../database.types";

export const mockUserId = "7fa33678-9d7f-47ce-bb59-aa3b65740ba2";

export const mockData: {
  carreras: Database["public"]["Tables"]["carreras"]["Row"][];
  materias: Database["public"]["Tables"]["materias"]["Row"][];
  tareas: Database["public"]["Tables"]["tareas"]["Row"][];
  subtareas: Database["public"]["Tables"]["subtareas"]["Row"][];
  examenes: Database["public"]["Tables"]["examenes"]["Row"][];
  eventos: Database["public"]["Tables"]["eventos"]["Row"][];
  horarios: Database["public"]["Tables"]["horarios"]["Row"][];
  sesiones_estudio: Database["public"]["Tables"]["sesiones_estudio"]["Row"][];
  dias_off: Database["public"]["Tables"]["dias_off"]["Row"][];
} = {
  carreras: [
    {
      id: "1",
      nombre: "Ingeniería en Sistemas",
      description: "Carrera de ingeniería en sistemas de información",
      institucion: "Universidad Nacional",
      start_date: "2023-03-01",
      estimated_end_date: "2028-12-31",
      desired_promedio: 8.5,
      my_promedio: 8.2,
      user_id: mockUserId,
    },
  ],
  materias: [
    {
      id: "1",
      nombre: "Algoritmos y Estructuras de Datos",
      carrera_id: "1",
      start_date: "2024-03-01",
      end_date: "2024-07-31",
      status: "cursando",
      type: "cuatrimestral",
      nota_aprobacion: 6,
      nota_promocion: 8,
      nota_final: null,
      promocion_directa: true,
      programa: "Programa de la materia",
      cronograma: "Cronograma de la materia",
      created_at: "2024-03-01",
      user_id: mockUserId,
    },
    {
      id: "2",
      nombre: "Base de Datos",
      carrera_id: "1",
      start_date: "2024-03-01",
      end_date: "2024-07-31",
      status: "cursando",
      type: "cuatrimestral",
      nota_aprobacion: 6,
      nota_promocion: 8,
      nota_final: null,
      promocion_directa: true,
      programa: "Programa de la materia",
      cronograma: "Cronograma de la materia",
      created_at: "2024-03-01",
      user_id: mockUserId,
    },
  ],
  tareas: [
    {
      id: "1",
      titulo: "Implementar Árbol Binario",
      descripcion: "Implementar un árbol binario de búsqueda en Java",
      materia_id: "1",
      status: "pendiente",
      created_at: "2024-03-15",
      end_date: "2024-03-22",
      semana: 3,
    },
    {
      id: "2",
      titulo: "Diseño de Base de Datos",
      descripcion: "Diseñar esquema de base de datos para sistema de ventas",
      materia_id: "2",
      status: "completada",
      created_at: "2024-03-10",
      end_date: "2024-03-17",
      semana: 2,
    },
  ],
  subtareas: [
    {
      id: "1",
      titulo: "Implementar inserción",
      descripcion: "Implementar método de inserción en árbol binario",
      tarea_id: "1",
      status: "pendiente",
    },
    {
      id: "2",
      titulo: "Implementar búsqueda",
      descripcion: "Implementar método de búsqueda en árbol binario",
      tarea_id: "1",
      status: "pendiente",
    },
  ],
  examenes: [
    {
      id: "1",
      materia_id: "1",
      fecha: "2024-04-15",
      type: "parcial",
      status: "pendiente",
      objetivo_nota: 8,
      nota: null,
      created_at: "2024-03-01",
    },
    {
      id: "2",
      materia_id: "2",
      fecha: "2024-04-20",
      type: "parcial",
      status: "pendiente",
      objetivo_nota: 8,
      nota: null,
      created_at: "2024-03-01",
    },
  ],
  eventos: [
    {
      id: "1",
      titulo: "Clase de Árboles",
      descripcion: "Clase teórica sobre árboles binarios",
      fecha: "2025-06-07",
      hora: "14:00",
      type: "clase",
      materia_id: "1",
      user_id: mockUserId,
    },
    {
      id: "2",
      titulo: "Consultas SQL",
      descripcion: "Práctica de consultas SQL",
      fecha: "2025-06-12",
      hora: "16:00",
      type: "clase",
      materia_id: "2",
      user_id: mockUserId,
    },
  ],
  horarios: [
    {
      id: "1",
      materia_id: "1",
      dia_semana: 1,
      hora_inicio: "14:00",
      hora_fin: "17:00",
    },
    {
      id: "2",
      materia_id: "2",
      dia_semana: 3,
      hora_inicio: "16:00",
      hora_fin: "19:00",
    },
  ],
  sesiones_estudio: [
    {
      id: "1",
      fecha: "2024-03-15",
      materia_id: "1",
      duracion_minutos: 120,
      objetivo: "Repasar conceptos de árboles binarios",
      tareas_completadas: 1,
      user_id: mockUserId,
    },
    {
      id: "2",
      fecha: "2024-03-16",
      materia_id: "2",
      duracion_minutos: 90,
      objetivo: "Practicar consultas SQL",
      tareas_completadas: 2,
      user_id: mockUserId,
    },
  ],
  dias_off: [
    {
      id: "1",
      fecha: "2024-04-01",
      motivo: "Feriado nacional",
      user_id: mockUserId,
    },
    {
      id: "2",
      fecha: "2024-04-02",
      motivo: "Feriado nacional",
      user_id: mockUserId,
    },
  ],
};
