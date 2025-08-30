export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      applicants: {
        Row: {
          can_offer: string | null;
          collaboration_interests: string[] | null;
          company_name: string | null;
          company_stage: Database["public"]["Enums"]["company_stage"] | null;
          created_at: string;
          description: string | null;
          founded_date: string | null;
          funding_status: string | null;
          id: string;
          ideal_neighbors: string | null;
          images: string[] | null;
          industry: string | null;
          linkedin: string | null;
          looking_for: string | null;
          tech_stack: string[] | null;
          team_size: number | null;
          updated_at: string;
          website: string | null;
        };
        Insert: {
          can_offer?: string | null;
          collaboration_interests?: string[] | null;
          company_name?: string | null;
          company_stage?: Database["public"]["Enums"]["company_stage"] | null;
          created_at?: string;
          description?: string | null;
          founded_date?: string | null;
          funding_status?: string | null;
          id: string;
          ideal_neighbors?: string | null;
          images?: string[] | null;
          industry?: string | null;
          linkedin?: string | null;
          looking_for?: string | null;
          tech_stack?: string[] | null;
          team_size?: number | null;
          updated_at?: string;
          website?: string | null;
        };
        Update: {
          can_offer?: string | null;
          collaboration_interests?: string[] | null;
          company_name?: string | null;
          company_stage?: Database["public"]["Enums"]["company_stage"] | null;
          created_at?: string;
          description?: string | null;
          founded_date?: string | null;
          funding_status?: string | null;
          id?: string;
          ideal_neighbors?: string | null;
          images?: string[] | null;
          industry?: string | null;
          linkedin?: string | null;
          looking_for?: string | null;
          tech_stack?: string[] | null;
          team_size?: number | null;
          updated_at?: string;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "applicants_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      applications: {
        Row: {
          applicant_id: string;
          created_at: string;
          id: string;
          interested_spaces: string[] | null;
          match_reasons: Json | null;
          match_score: number | null;
          notes: string | null;
          provider_id: string;
          reviewed_at: string | null;
          status: Database["public"]["Enums"]["application_status"];
          submitted_at: string;
          updated_at: string;
        };
        Insert: {
          applicant_id: string;
          created_at?: string;
          id?: string;
          interested_spaces?: string[] | null;
          match_reasons?: Json | null;
          match_score?: number | null;
          notes?: string | null;
          provider_id: string;
          reviewed_at?: string | null;
          status?: Database["public"]["Enums"]["application_status"];
          submitted_at?: string;
          updated_at?: string;
        };
        Update: {
          applicant_id?: string;
          created_at?: string;
          id?: string;
          interested_spaces?: string[] | null;
          match_reasons?: Json | null;
          match_score?: number | null;
          notes?: string | null;
          provider_id?: string;
          reviewed_at?: string | null;
          status?: Database["public"]["Enums"]["application_status"];
          submitted_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "applications_applicant_id_fkey";
            columns: ["applicant_id"];
            isOneToOne: false;
            referencedRelation: "applicants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_provider_id_fkey";
            columns: ["provider_id"];
            isOneToOne: false;
            referencedRelation: "space_providers";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
        };
        Relationships: [];
      };
      space_providers: {
        Row: {
          atmosphere_images: string[] | null;
          company_name: string;
          created_at: string;
          description: string | null;
          founded_year: number | null;
          id: string;
          industry_focus: string[] | null;
          logo_url: string | null;
          looking_for: string[] | null;
          offers: string[] | null;
          profile_id: string;
          projects: Json | null;
          tagline: string | null;
          team_size: number | null;
          updated_at: string;
          values: string[] | null;
        };
        Insert: {
          atmosphere_images?: string[] | null;
          company_name?: string;
          created_at?: string;
          description?: string | null;
          founded_year?: number | null;
          id?: string;
          industry_focus?: string[] | null;
          logo_url?: string | null;
          looking_for?: string[] | null;
          offers?: string[] | null;
          profile_id: string;
          projects?: Json | null;
          tagline?: string | null;
          team_size?: number | null;
          updated_at?: string;
          values?: string[] | null;
        };
        Update: {
          atmosphere_images?: string[] | null;
          company_name?: string;
          created_at?: string;
          description?: string | null;
          founded_year?: number | null;
          id?: string;
          industry_focus?: string[] | null;
          logo_url?: string | null;
          looking_for?: string[] | null;
          offers?: string[] | null;
          profile_id?: string;
          projects?: Json | null;
          tagline?: string | null;
          team_size?: number | null;
          updated_at?: string;
          values?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "space_providers_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      spaces: {
        Row: {
          amenities: Json | null;
          available_from: string | null;
          capacity: number | null;
          created_at: string;
          description: string | null;
          id: string;
          images: string[] | null;
          location: Json | null;
          monthly_price: number | null;
          name: string;
          provider_id: string;
          size_sqm: number | null;
          type: Database["public"]["Enums"]["space_type"];
          updated_at: string;
        };
        Insert: {
          amenities?: Json | null;
          available_from?: string | null;
          capacity?: number | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: string[] | null;
          location?: Json | null;
          monthly_price?: number | null;
          name: string;
          provider_id: string;
          size_sqm?: number | null;
          type: Database["public"]["Enums"]["space_type"];
          updated_at?: string;
        };
        Update: {
          amenities?: Json | null;
          available_from?: string | null;
          capacity?: number | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: string[] | null;
          location?: Json | null;
          monthly_price?: number | null;
          name?: string;
          provider_id?: string;
          size_sqm?: number | null;
          type?: Database["public"]["Enums"]["space_type"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "spaces_provider_id_fkey";
            columns: ["provider_id"];
            isOneToOne: false;
            referencedRelation: "space_providers";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      calculate_match_score: {
        Args: {
          applicant_row: unknown;
          provider_row: unknown;
        };
        Returns: number;
      };
    };
    Enums: {
      application_status: "pending" | "reviewed" | "shortlisted" | "accepted" | "rejected";
      company_stage: "idea" | "mvp" | "growth" | "scale";
      space_type: "office" | "coworking" | "workshop" | "meeting_room";
      user_role: "space_provider" | "applicant" | "admin";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
