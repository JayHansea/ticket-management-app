<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main
      class="flex-1 bg-gradient-to-br from-background via-primary/5 to-background"
    >
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Greeting -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-foreground mb-2">
            Welcome back, {{ user?.name }}! 👋
          </h1>
          <p class="text-lg text-muted-foreground">
            Here's an overview of your ticket management
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card
            v-for="(stat, index) in statsCards"
            :key="index"
            class="p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br"
                :class="stat.color"
              >
                <component :is="stat.icon" class="w-6 h-6 text-white" />
              </div>
              <span class="text-3xl font-bold text-foreground">
                {{ stat.value }}
              </span>
            </div>
            <h3 class="text-muted-foreground font-medium">
              {{ stat.title }}
            </h3>
          </Card>
        </div>

        <!-- Bottom Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Quick Actions -->
          <Card class="p-8">
            <h2 class="text-2xl font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <div class="space-y-3">
              <RouterLink to="/tickets">
                <Button class="w-full justify-start" size="lg">
                  <TicketIcon class="w-5 h-5 mr-2" />
                  Manage All Tickets
                </Button>
              </RouterLink>

              <RouterLink to="/tickets?action=create">
                <Button
                  variant="outline"
                  class="w-full justify-start"
                  size="lg"
                >
                  <TrendingUp class="w-5 h-5 mr-2" />
                  Create New Ticket
                </Button>
              </RouterLink>
            </div>
          </Card>

          <!-- Help Section -->
          <Card
            class="p-8 bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20"
          >
            <h2 class="text-2xl font-bold text-foreground mb-4">Need Help?</h2>
            <p class="text-muted-foreground mb-6">
              Explore our documentation to get the most out of TicketFlow. Learn
              about advanced features, best practices, and tips for efficient
              ticket management.
            </p>
            <Button variant="outline">View Documentation</Button>
          </Card>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TicketIcon, TrendingUp, CheckCircle2, Clock } from "lucide-vue-next";

import { useTicketStore } from "@/stores/ticketStore";
import { useAuthStore } from "@/stores/authStore";

const ticketStore = useTicketStore();
const authStore = useAuthStore();

const { tickets, loadTickets } = ticketStore;
const { user } = authStore;

onMounted(() => {
  if (user) {
    loadTickets();
  }
});

const stats = computed(() => ({
  total: tickets.length,
  open: tickets.filter((t) => t.status === "open").length,
  inProgress: tickets.filter((t) => t.status === "in_progress").length,
  closed: tickets.filter((t) => t.status === "closed").length,
}));

const statsCards = computed(() => [
  {
    title: "Total Tickets",
    value: stats.value.total,
    icon: TicketIcon,
    color: "from-primary to-primary-glow",
  },
  {
    title: "Open",
    value: stats.value.open,
    icon: TrendingUp,
    color: "from-status-open to-status-open",
  },
  {
    title: "In Progress",
    value: stats.value.inProgress,
    icon: Clock,
    color: "from-status-progress to-status-progress",
  },
  {
    title: "Resolved",
    value: stats.value.closed,
    icon: CheckCircle2,
    color: "from-status-closed to-status-closed",
  },
]);
</script>
