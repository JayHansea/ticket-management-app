// src/stores/ticketStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ticket } from "@/types";
import { useAuthStore } from "@/stores/authStore";

export const useTicketStore = defineStore("ticket", () => {
  const tickets = ref<Ticket[]>([]);
  const authStore = useAuthStore();

  const loadTickets = () => {
    const user = authStore.user;
    if (!user) {
      tickets.value = [];
      return;
    }

    const storedTickets = localStorage.getItem("ticketapp_tickets");
    if (storedTickets) {
      const allTickets: Ticket[] = JSON.parse(storedTickets);
      const userTickets = allTickets.filter(
        (ticket) => ticket.userId === user.id
      );
      tickets.value = userTickets;
    } else {
      tickets.value = [];
    }
  };

  const addTicket = (
    ticketData: Omit<Ticket, "id" | "userId" | "createdAt" | "updatedAt">
  ) => {
    const user = authStore.user;
    if (!user) return;

    const newTicket: Ticket = {
      ...ticketData,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const allTicketsStr = localStorage.getItem("ticketapp_tickets");
    const allTickets: Ticket[] = allTicketsStr ? JSON.parse(allTicketsStr) : [];

    const updatedAllTickets = [...allTickets, newTicket];
    localStorage.setItem(
      "ticketapp_tickets",
      JSON.stringify(updatedAllTickets)
    );

    tickets.value = [...tickets.value, newTicket];
  };

  const updateTicket = (id: string, updates: Partial<Omit<Ticket, "id">>) => {
    const user = authStore.user;
    if (!user) return;

    tickets.value = tickets.value.map((ticket) =>
      ticket.id === id
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    );

    const allTicketsStr = localStorage.getItem("ticketapp_tickets");
    const allTickets: Ticket[] = allTicketsStr ? JSON.parse(allTicketsStr) : [];

    const updatedAllTickets = allTickets.map((ticket) =>
      ticket.id === id
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    );

    localStorage.setItem(
      "ticketapp_tickets",
      JSON.stringify(updatedAllTickets)
    );
  };

  const deleteTicket = (id: string) => {
    const user = authStore.user;
    if (!user) return;

    tickets.value = tickets.value.filter((ticket) => ticket.id !== id);

    const allTicketsStr = localStorage.getItem("ticketapp_tickets");
    const allTickets: Ticket[] = allTicketsStr ? JSON.parse(allTicketsStr) : [];
    const updatedAllTickets = allTickets.filter((ticket) => ticket.id !== id);
    localStorage.setItem(
      "ticketapp_tickets",
      JSON.stringify(updatedAllTickets)
    );
  };

  const getTicketById = (id: string): Ticket | undefined => {
    return tickets.value.find((ticket) => ticket.id === id);
  };

  return {
    tickets,
    loadTickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
  };
});
