import { create } from "zustand";
import type { Ticket, TicketState } from "@/types";
import { useAuthStore } from "@/store/authStore";

// Initialize with some demo tickets
// const demoTickets: Ticket[] = [
//   {
//     id: "1",
//     title: "Fix login page responsive design",
//     description: "The login page doesn't display correctly on mobile devices.",
//     status: "open",
//     priority: "high",
//     createdAt: new Date(Date.now() - 86400000).toISOString(),
//     updatedAt: new Date(Date.now() - 86400000).toISOString(),
//   },
//   {
//     id: "2",
//     title: "Update dashboard statistics",
//     description: "Add more detailed analytics to the dashboard.",
//     status: "in_progress",
//     priority: "medium",
//     createdAt: new Date(Date.now() - 172800000).toISOString(),
//     updatedAt: new Date(Date.now() - 3600000).toISOString(),
//   },
//   {
//     id: "3",
//     title: "Setup email notifications",
//     description: "Configure automated email notifications for ticket updates.",
//     status: "closed",
//     priority: "low",
//     createdAt: new Date(Date.now() - 259200000).toISOString(),
//     updatedAt: new Date(Date.now() - 7200000).toISOString(),
//   },
// ];

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],

  loadTickets: () => {
    const { user } = useAuthStore.getState();
    if (!user) {
      set({ tickets: [] });
      return;
    }

    const storedTickets = localStorage.getItem("ticketapp_tickets");
    if (storedTickets) {
      const allTickets = JSON.parse(storedTickets);
      const userTickets = allTickets.filter(
        (ticket: Ticket) => ticket.userId === user.id
      );
      set({ tickets: userTickets });
    } else {
      set({ tickets: [] });
    }
  },

  addTicket: (ticketData) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const newTicket: Ticket = {
      ...ticketData,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const allTicketsStr = localStorage.getItem("ticketapp_tickets");
    const allTickets = allTicketsStr ? JSON.parse(allTicketsStr) : [];
    const updatedAllTickets = [...allTickets, newTicket];
    localStorage.setItem(
      "ticketapp_tickets",
      JSON.stringify(updatedAllTickets)
    );

    set({ tickets: [...get().tickets, newTicket] });
  },

  updateTicket: (id, updates) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const updatedUserTickets = get().tickets.map((ticket) =>
      ticket.id === id
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    );
    set({ tickets: updatedUserTickets });

    const allTicketsStr = localStorage.getItem("ticketapp_tickets");
    const allTickets = allTicketsStr ? JSON.parse(allTicketsStr) : [];
    const updatedAllTickets = allTickets.map((ticket: Ticket) =>
      ticket.id === id
        ? updatedUserTickets.find((t) => t.id === id) || ticket
        : ticket
    );
    localStorage.setItem(
      "ticketapp_tickets",
      JSON.stringify(updatedAllTickets)
    );
  },

  deleteTicket: (id) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const updatedUserTickets = get().tickets.filter(
      (ticket) => ticket.id !== id
    );
    set({ tickets: updatedUserTickets });

    const allTicketsStr = localStorage.getItem("ticketapp_tickets");
    const allTickets = allTicketsStr ? JSON.parse(allTicketsStr) : [];
    const updatedAllTickets = allTickets.filter(
      (ticket: Ticket) => ticket.id !== id
    );
    localStorage.setItem(
      "ticketapp_tickets",
      JSON.stringify(updatedAllTickets)
    );
  },

  getTicketById: (id) => {
    return get().tickets.find((ticket) => ticket.id === id);
  },
}));
