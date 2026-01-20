export type Field = {
  name: string;
  type: string;
  options?: string[];
};

export type FormSchema = {
  id: string;
  name: string;
  type: string;
  role?: string[];
  fields: Field[];
};

export type DashboardLayout = {
  id: string;
  name: string;
  columns: number;
  areas: string[]; // e.g. ["a", "b", "c"]
};

export type WidgetDefinition = {
  id: string;
  name: string;
  type: string; // "bar", "line", "pie", "stat", etc.
  config?: any; // keep flexible for now
};

export type UserProfile = {
  id: string;
  name: string;
  department: string;
  role: string;
  start: string;
};