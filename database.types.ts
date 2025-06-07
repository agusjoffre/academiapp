export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      carreras: {
        Row: {
          description: string | null;
          desired_promedio: number | null;
          estimated_end_date: string | null;
          id: string;
          institucion: string | null;
          my_promedio: number | null;
          nombre: string;
          start_date: string | null;
          user_id: string;
        };
        Insert: {
          description?: string | null;
          desired_promedio?: number | null;
          estimated_end_date?: string | null;
          id?: string;
          institucion?: string | null;
          my_promedio?: number | null;
          nombre: string;
          start_date?: string | null;
          user_id: string;
        };
        Update: {
          description?: string | null;
          desired_promedio?: number | null;
          estimated_end_date?: string | null;
          id?: string;
          institucion?: string | null;
          my_promedio?: number | null;
          nombre?: string;
          start_date?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      dias_off: {
        Row: {
          fecha: string;
          id: string;
          motivo: string | null;
          user_id: string;
        };
        Insert: {
          fecha: string;
          id?: string;
          motivo?: string | null;
          user_id: string;
        };
        Update: {
          fecha?: string;
          id?: string;
          motivo?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      eventos: {
        Row: {
          descripcion: string | null;
          fecha: string;
          hora: string | null;
          id: string;
          materia_id: string | null;
          titulo: string;
          type: Database["public"]["Enums"]["type_evento"];
          user_id: string;
        };
        Insert: {
          descripcion?: string | null;
          fecha: string;
          hora?: string | null;
          id?: string;
          materia_id?: string | null;
          titulo: string;
          type?: Database["public"]["Enums"]["type_evento"];
          user_id: string;
        };
        Update: {
          descripcion?: string | null;
          fecha?: string;
          hora?: string | null;
          id?: string;
          materia_id?: string | null;
          titulo?: string;
          type?: Database["public"]["Enums"]["type_evento"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "eventos_materia_id_fkey";
            columns: ["materia_id"];
            isOneToOne: false;
            referencedRelation: "materias";
            referencedColumns: ["id"];
          }
        ];
      };
      examenes: {
        Row: {
          created_at: string | null;
          fecha: string;
          id: string;
          materia_id: string;
          nota: number | null;
          objetivo_nota: number | null;
          status: Database["public"]["Enums"]["status_tarea"];
          type: Database["public"]["Enums"]["type_examen"];
        };
        Insert: {
          created_at?: string | null;
          fecha: string;
          id?: string;
          materia_id: string;
          nota?: number | null;
          objetivo_nota?: number | null;
          status?: Database["public"]["Enums"]["status_tarea"];
          type?: Database["public"]["Enums"]["type_examen"];
        };
        Update: {
          created_at?: string | null;
          fecha?: string;
          id?: string;
          materia_id?: string;
          nota?: number | null;
          objetivo_nota?: number | null;
          status?: Database["public"]["Enums"]["status_tarea"];
          type?: Database["public"]["Enums"]["type_examen"];
        };
        Relationships: [
          {
            foreignKeyName: "examenes_materia_id_fkey";
            columns: ["materia_id"];
            isOneToOne: false;
            referencedRelation: "materias";
            referencedColumns: ["id"];
          }
        ];
      };
      horarios: {
        Row: {
          dia_semana: number | null;
          hora_fin: string;
          hora_inicio: string;
          id: string;
          materia_id: string;
        };
        Insert: {
          dia_semana?: number | null;
          hora_fin: string;
          hora_inicio: string;
          id?: string;
          materia_id: string;
        };
        Update: {
          dia_semana?: number | null;
          hora_fin?: string;
          hora_inicio?: string;
          id?: string;
          materia_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "horarios_materia_id_fkey";
            columns: ["materia_id"];
            isOneToOne: false;
            referencedRelation: "materias";
            referencedColumns: ["id"];
          }
        ];
      };
      logs_eventos: {
        Row: {
          accion: string;
          descripcion: string | null;
          fecha: string | null;
          id: string;
          registro_id: string | null;
          tabla: string;
          usuario_id: string | null;
        };
        Insert: {
          accion: string;
          descripcion?: string | null;
          fecha?: string | null;
          id?: string;
          registro_id?: string | null;
          tabla: string;
          usuario_id?: string | null;
        };
        Update: {
          accion?: string;
          descripcion?: string | null;
          fecha?: string | null;
          id?: string;
          registro_id?: string | null;
          tabla?: string;
          usuario_id?: string | null;
        };
        Relationships: [];
      };
      materias: {
        Row: {
          carrera_id: string | null;
          created_at: string | null;
          cronograma: string | null;
          end_date: string;
          id: string;
          nombre: string;
          nota_aprobacion: number | null;
          nota_final: number | null;
          nota_promocion: number | null;
          programa: string | null;
          promocion_directa: boolean | null;
          start_date: string;
          status: Database["public"]["Enums"]["status_materia"];
          type: Database["public"]["Enums"]["type_materia"] | null;
          user_id: string;
        };
        Insert: {
          carrera_id?: string | null;
          created_at?: string | null;
          cronograma?: string | null;
          end_date: string;
          id?: string;
          nombre: string;
          nota_aprobacion?: number | null;
          nota_final?: number | null;
          nota_promocion?: number | null;
          programa?: string | null;
          promocion_directa?: boolean | null;
          start_date: string;
          status?: Database["public"]["Enums"]["status_materia"];
          type?: Database["public"]["Enums"]["type_materia"] | null;
          user_id: string;
        };
        Update: {
          carrera_id?: string | null;
          created_at?: string | null;
          cronograma?: string | null;
          end_date?: string;
          id?: string;
          nombre?: string;
          nota_aprobacion?: number | null;
          nota_final?: number | null;
          nota_promocion?: number | null;
          programa?: string | null;
          promocion_directa?: boolean | null;
          start_date?: string;
          status?: Database["public"]["Enums"]["status_materia"];
          type?: Database["public"]["Enums"]["type_materia"] | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "materias_carrera_id_fkey";
            columns: ["carrera_id"];
            isOneToOne: false;
            referencedRelation: "carreras";
            referencedColumns: ["id"];
          }
        ];
      };
      sesiones_estudio: {
        Row: {
          duracion_minutos: number | null;
          fecha: string;
          id: string;
          materia_id: string | null;
          objetivo: string | null;
          tareas_completadas: number | null;
          user_id: string;
        };
        Insert: {
          duracion_minutos?: number | null;
          fecha: string;
          id?: string;
          materia_id?: string | null;
          objetivo?: string | null;
          tareas_completadas?: number | null;
          user_id: string;
        };
        Update: {
          duracion_minutos?: number | null;
          fecha?: string;
          id?: string;
          materia_id?: string | null;
          objetivo?: string | null;
          tareas_completadas?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sesiones_estudio_materia_id_fkey";
            columns: ["materia_id"];
            isOneToOne: false;
            referencedRelation: "materias";
            referencedColumns: ["id"];
          }
        ];
      };
      subtareas: {
        Row: {
          descripcion: string | null;
          id: string;
          status: Database["public"]["Enums"]["status_tarea"];
          tarea_id: string;
          titulo: string;
        };
        Insert: {
          descripcion?: string | null;
          id?: string;
          status?: Database["public"]["Enums"]["status_tarea"];
          tarea_id: string;
          titulo: string;
        };
        Update: {
          descripcion?: string | null;
          id?: string;
          status?: Database["public"]["Enums"]["status_tarea"];
          tarea_id?: string;
          titulo?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subtareas_tarea_id_fkey";
            columns: ["tarea_id"];
            isOneToOne: false;
            referencedRelation: "tareas";
            referencedColumns: ["id"];
          }
        ];
      };
      tareas: {
        Row: {
          created_at: string | null;
          descripcion: string | null;
          end_date: string | null;
          id: string;
          materia_id: string;
          semana: number | null;
          status: Database["public"]["Enums"]["status_tarea"];
          titulo: string;
        };
        Insert: {
          created_at?: string | null;
          descripcion?: string | null;
          end_date?: string | null;
          id?: string;
          materia_id: string;
          semana?: number | null;
          status?: Database["public"]["Enums"]["status_tarea"];
          titulo: string;
        };
        Update: {
          created_at?: string | null;
          descripcion?: string | null;
          end_date?: string | null;
          id?: string;
          materia_id?: string;
          semana?: number | null;
          status?: Database["public"]["Enums"]["status_tarea"];
          titulo?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tareas_materia_id_fkey";
            columns: ["materia_id"];
            isOneToOne: false;
            referencedRelation: "materias";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      status_materia: "aprobada" | "regular" | "cursando";
      status_tarea: "pendiente" | "completada";
      type_evento: "clase" | "examen" | "tarea" | "personal" | "sesion_estudio";
      type_examen: "parcial" | "final";
      type_materia:
        | "anual"
        | "cuatrimestral"
        | "bimestral"
        | "semestral"
        | "seminario";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      status_materia: ["aprobada", "regular", "cursando"],
      status_tarea: ["pendiente", "completada"],
      type_evento: ["clase", "examen", "tarea", "personal", "sesion_estudio"],
      type_examen: ["parcial", "final"],
      type_materia: [
        "anual",
        "cuatrimestral",
        "bimestral",
        "semestral",
        "seminario",
      ],
    },
  },
} as const;
