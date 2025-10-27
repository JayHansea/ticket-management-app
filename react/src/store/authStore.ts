import { create } from "zustand";
import type { AuthState, User, Ticket } from "@/types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  checkAuth: () => {
    const token = localStorage.getItem("ticketapp_session");
    const userStr = localStorage.getItem("ticketapp_user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true });
      } catch (error) {
        localStorage.removeItem("ticketapp_session");
        localStorage.removeItem("ticketapp_user");
      }
    }
  },

  // --- CORRECTED LOGIN FUNCTION ---
  login: async (email: string, password: string) => {
    await delay(500);

    const storedUserStr = localStorage.getItem(`user_${email}`);
    if (!storedUserStr) {
      return { success: false, error: "Invalid credentials" };
    }

    try {
      const storedUser = JSON.parse(storedUserStr);
      if (storedUser.password !== password) {
        return { success: false, error: "Invalid credentials" };
      }

      // Use the PERSISTENT ID from storage, DO NOT generate a new one.
      const user: User = {
        id: storedUser.id,
        email: storedUser.email,
        name: storedUser.name,
      };

      const token = `token_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("ticketapp_session", token);
      localStorage.setItem("ticketapp_user", JSON.stringify(user));

      set({ user, token, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      console.error("Login processing error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  },

  // --- CORRECTED SIGNUP FUNCTION ---
  signup: async (email: string, password: string, name: string) => {
    await delay(500);

    const existingUser = localStorage.getItem(`user_${email}`);
    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    // Create the user object with a persistent ID FIRST.
    const user: User = {
      id: `user_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
    };

    // Store the full user object (including the persistent ID) with the password.
    localStorage.setItem(
      `user_${email}`,
      JSON.stringify({ ...user, password })
    );

    // Now, create the session token
    const token = `token_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("ticketapp_session", token);
    localStorage.setItem("ticketapp_user", JSON.stringify(user)); // Session user doesn't need password

    // Create demo tickets using the new user's persistent ID
    const demoTicketsForNewUser: Omit<
      Ticket,
      "id" | "createdAt" | "updatedAt"
    >[] = [
      {
        title: "Fix login page responsive design",
        description:
          "The login page doesn't display correctly on mobile devices.",
        status: "open",
        priority: "high",
        userId: user.id, // Use the persistent ID
      },
      {
        title: "Update dashboard statistics",
        description: "Add more detailed analytics to the dashboard.",
        status: "in_progress",
        priority: "medium",
        userId: user.id, // Use the persistent ID
      },
    ];

    const existingTicketsStr = localStorage.getItem("ticketapp_tickets");
    const existingTickets = existingTicketsStr
      ? JSON.parse(existingTicketsStr)
      : [];

    const newTicketsWithIds = demoTicketsForNewUser.map((ticket) => ({
      ...ticket,
      id: `ticket_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const allTickets = [...existingTickets, ...newTicketsWithIds];
    localStorage.setItem("ticketapp_tickets", JSON.stringify(allTickets));

    set({ user, token, isAuthenticated: true });
    return { success: true };
  },

  logout: () => {
    localStorage.removeItem("ticketapp_session");
    localStorage.removeItem("ticketapp_user");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
