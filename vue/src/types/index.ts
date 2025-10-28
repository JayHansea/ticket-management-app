export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: TicketStatus;
  priority?: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface TicketState {
  tickets: Ticket[];
  loadTickets: () => void;
  addTicket: (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">) => void;
  updateTicket: (id: string, updates: Partial<Omit<Ticket, "id">>) => void;
  deleteTicket: (id: string) => void;
  getTicketById: (id: string) => Ticket | undefined;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => void;
}
