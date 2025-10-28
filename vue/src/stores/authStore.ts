import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, Ticket } from "@/types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  const checkAuth = () => {
    const storedToken = localStorage.getItem("ticketapp_session");
    const userStr = localStorage.getItem("ticketapp_user");

    if (storedToken && userStr) {
      try {
        user.value = JSON.parse(userStr);
        token.value = storedToken;
      } catch (error) {
        localStorage.removeItem("ticketapp_session");
        localStorage.removeItem("ticketapp_user");
      }
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
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

      const sessionUser: User = {
        id: storedUser.id,
        email: storedUser.email,
        name: storedUser.name,
      };

      const newToken = `token_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("ticketapp_session", newToken);
      localStorage.setItem("ticketapp_user", JSON.stringify(sessionUser));

      user.value = sessionUser;
      token.value = newToken;

      return { success: true };
    } catch (error) {
      console.error("Login processing error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; error?: string }> => {
    await delay(500);

    if (localStorage.getItem(`user_${email}`)) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    const newUser: User = {
      id: `user_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
    };

    localStorage.setItem(
      `user_${email}`,
      JSON.stringify({ ...newUser, password })
    );

    const newToken = `token_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("ticketapp_session", newToken);
    localStorage.setItem("ticketapp_user", JSON.stringify(newUser));

    const demoTickets: Omit<Ticket, "id" | "createdAt" | "updatedAt">[] = [
      {
        title: "Fix login page responsive design",
        description:
          "The login page doesn't display correctly on mobile devices.",
        status: "open",
        priority: "high",
        userId: newUser.id,
      },
      {
        title: "Update dashboard statistics",
        description: "Add more detailed analytics to the dashboard.",
        status: "in_progress",
        priority: "medium",
        userId: newUser.id,
      },
    ];

    const existingTicketsStr = localStorage.getItem("ticketapp_tickets");
    const existingTickets = existingTicketsStr
      ? JSON.parse(existingTicketsStr)
      : [];

    const newTicketsWithIds = demoTickets.map((ticket) => ({
      ...ticket,
      id: `ticket_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const allTickets = [...existingTickets, ...newTicketsWithIds];
    localStorage.setItem("ticketapp_tickets", JSON.stringify(allTickets));

    user.value = newUser;
    token.value = newToken;

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    localStorage.removeItem("ticketapp_user");
    user.value = null;
    token.value = null;
  };

  return {
    user,
    token,
    isAuthenticated,
    checkAuth,
    login,
    signup,
    logout,
  };
});
