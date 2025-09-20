export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  catalog: {
    Tables: {
      course: {
        Row: {
          code: string;
          name: string;
          degree: string | null;
          ects_total: number | null;
          duration_semesters: number | null;
          plan_version: string;
          institution: string | null;
          school: string | null;
          language: string | null;
          summary: string | null;
        };
        Insert: Database["catalog"]["Tables"]["course"]["Row"];
        Update: Partial<Database["catalog"]["Tables"]["course"]["Row"]>;
        Relationships: [];
      };
      course_content: {
        Row: {
          course_code: string;
          content_md: string;
        };
        Insert: Database["catalog"]["Tables"]["course_content"]["Row"];
        Update: Partial<Database["catalog"]["Tables"]["course_content"]["Row"]>;
        Relationships: [];
      };
      uc: {
        Row: {
          code: string;
          course_code: string;
          name: string;
          description: string | null;
          ects: number | null;
          semester: number | null;
          language: string | null;
          prerequisites: string[] | null;
        };
        Insert: Database["catalog"]["Tables"]["uc"]["Row"];
        Update: Partial<Database["catalog"]["Tables"]["uc"]["Row"]>;
        Relationships: [];
      };
      uc_content: {
        Row: {
          uc_code: string;
          content_md: string;
        };
        Insert: Database["catalog"]["Tables"]["uc_content"]["Row"];
        Update: Partial<Database["catalog"]["Tables"]["uc_content"]["Row"]>;
        Relationships: [];
      };
      uc_learning_outcome: {
        Row: {
          uc_code: string;
          outcome: string;
          order: number;
        };
        Insert: Database["catalog"]["Tables"]["uc_learning_outcome"]["Row"];
        Update: Partial<Database["catalog"]["Tables"]["uc_learning_outcome"]["Row"]>;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
  mapping: {
    Tables: {
      uc_topic: {
        Row: {
          uc_code: string;
          topic_slug: string;
        };
        Insert: Database["mapping"]["Tables"]["uc_topic"]["Row"];
        Update: Partial<Database["mapping"]["Tables"]["uc_topic"]["Row"]>;
        Relationships: [];
      };
      uc_playlist: {
        Row: {
          uc_code: string;
          playlist_id: string;
          priority: number | null;
        };
        Insert: Database["mapping"]["Tables"]["uc_playlist"]["Row"];
        Update: Partial<Database["mapping"]["Tables"]["uc_playlist"]["Row"]>;
        Relationships: [];
      };
      topic_playlist: {
        Row: {
          topic_slug: string;
          playlist_id: string;
          priority: number | null;
        };
        Insert: Database["mapping"]["Tables"]["topic_playlist"]["Row"];
        Update: Partial<Database["mapping"]["Tables"]["topic_playlist"]["Row"]>;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
  subjects: {
    Tables: {
      topic: {
        Row: {
          slug: string;
          name: string;
          summary: string | null;
        };
        Insert: Database["subjects"]["Tables"]["topic"]["Row"];
        Update: Partial<Database["subjects"]["Tables"]["topic"]["Row"]>;
        Relationships: [];
      };
      topic_content: {
        Row: {
          topic_slug: string;
          content_md: string;
        };
        Insert: Database["subjects"]["Tables"]["topic_content"]["Row"];
        Update: Partial<Database["subjects"]["Tables"]["topic_content"]["Row"]>;
        Relationships: [];
      };
      topic_tag: {
        Row: {
          topic_slug: string;
          tag: string;
        };
        Insert: Database["subjects"]["Tables"]["topic_tag"]["Row"];
        Update: Partial<Database["subjects"]["Tables"]["topic_tag"]["Row"]>;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
