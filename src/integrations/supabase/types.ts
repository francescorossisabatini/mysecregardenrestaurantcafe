export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ab_test_events: {
        Row: {
          created_at: string
          event_name: string
          id: string
          metadata: Json
          page_path: string | null
          test_id: string
          user_agent: string | null
          variant: string
        }
        Insert: {
          created_at?: string
          event_name: string
          id?: string
          metadata?: Json
          page_path?: string | null
          test_id: string
          user_agent?: string | null
          variant: string
        }
        Update: {
          created_at?: string
          event_name?: string
          id?: string
          metadata?: Json
          page_path?: string | null
          test_id?: string
          user_agent?: string | null
          variant?: string
        }
        Relationships: []
      }
      ab_test_reports: {
        Row: {
          created_at: string
          file_path: string | null
          generated_at: string | null
          id: string
          period_end: string
          period_start: string
          public_url: string | null
          report_name: string
          status: string
          summary: Json
          test_id: string
        }
        Insert: {
          created_at?: string
          file_path?: string | null
          generated_at?: string | null
          id?: string
          period_end: string
          period_start: string
          public_url?: string | null
          report_name?: string
          status?: string
          summary?: Json
          test_id: string
        }
        Update: {
          created_at?: string
          file_path?: string | null
          generated_at?: string | null
          id?: string
          period_end?: string
          period_start?: string
          public_url?: string | null
          report_name?: string
          status?: string
          summary?: Json
          test_id?: string
        }
        Relationships: []
      }
      kuechenplan_items: {
        Row: {
          allergens: string[]
          category: string | null
          created_at: string
          description: string | null
          fields: Json
          id: string
          ingredients: string[]
          menu_day: string | null
          notes: string[]
          row_index: number
          search_text: string
          snapshot_id: string
          title: string
        }
        Insert: {
          allergens?: string[]
          category?: string | null
          created_at?: string
          description?: string | null
          fields?: Json
          id?: string
          ingredients?: string[]
          menu_day?: string | null
          notes?: string[]
          row_index: number
          search_text?: string
          snapshot_id: string
          title: string
        }
        Update: {
          allergens?: string[]
          category?: string | null
          created_at?: string
          description?: string | null
          fields?: Json
          id?: string
          ingredients?: string[]
          menu_day?: string | null
          notes?: string[]
          row_index?: number
          search_text?: string
          snapshot_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "kuechenplan_items_snapshot_id_fkey"
            columns: ["snapshot_id"]
            isOneToOne: false
            referencedRelation: "kuechenplan_snapshots"
            referencedColumns: ["id"]
          },
        ]
      }
      kuechenplan_snapshots: {
        Row: {
          archived_at: string | null
          created_at: string
          id: string
          is_current: boolean
          period: string | null
          sheet_name: string
          source_hash: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          id?: string
          is_current?: boolean
          period?: string | null
          sheet_name?: string
          source_hash: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          id?: string
          is_current?: boolean
          period?: string | null
          sheet_name?: string
          source_hash?: string
        }
        Relationships: []
      }
      reservation_requests: {
        Row: {
          contact: string
          created_at: string
          full_name: string
          id: string
          language: string
          notes: string | null
          party_size: number
          reservation_date: string
          reservation_time: string
          staff_notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          contact: string
          created_at?: string
          full_name: string
          id?: string
          language?: string
          notes?: string | null
          party_size: number
          reservation_date: string
          reservation_time: string
          staff_notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          contact?: string
          created_at?: string
          full_name?: string
          id?: string
          language?: string
          notes?: string | null
          party_size?: number
          reservation_date?: string
          reservation_time?: string
          staff_notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff_user: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
    },
  },
} as const
