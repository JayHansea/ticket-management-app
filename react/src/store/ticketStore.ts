// ticketStore from react

import { create } from "zustand";
import type { Ticket, TicketState } from "@/types";
import { useAuthStore } from "@/store/authStore";

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
