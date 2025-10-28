<template>
  <header
    class="w-full border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50"
  >
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div
            class="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center transition-transform group-hover:scale-105"
          >
            <TicketIcon class="w-5 h-5 text-primary-foreground" />
          </div>
          <span class="font-bold text-xl text-foreground">TicketFlow</span>
        </RouterLink>

        <!-- Navigation -->
        <nav class="flex items-center gap-4">
          <!-- Authenticated User -->
          <template v-if="isAuthenticated">
            <!-- Desktop Navigation -->
            <div class="hidden sm:flex items-center gap-4">
              <RouterLink to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </RouterLink>

              <RouterLink to="/tickets">
                <Button variant="ghost">Tickets</Button>
              </RouterLink>

              <div
                class="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
              >
                <span>{{ user?.name }}</span>
              </div>

              <Button variant="outline" size="sm" @click="handleLogout">
                <LogOut class="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            <!-- Mobile Navigation -->
            <div class="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon">
                    <Menu class="h-5 w-5" />
                    <span class="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    Hi, {{ user?.name || "User" }}!
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <RouterLink to="/dashboard">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </RouterLink>
                  <RouterLink to="/tickets">
                    <DropdownMenuItem>Tickets</DropdownMenuItem>
                  </RouterLink>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    class="text-destructive"
                    @click="handleLogout"
                  >
                    <LogOut class="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </template>

          <!-- Guest -->
          <template v-else>
            <template v-if="!isLanding">
              <RouterLink to="/login">
                <Button variant="ghost">Login</Button>
              </RouterLink>
              <RouterLink to="/signup">
                <Button>Get Started</Button>
              </RouterLink>
            </template>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { TicketIcon, LogOut, Menu } from "lucide-vue-next";

const route = useRoute();
const authStore = useAuthStore();

const { isAuthenticated, logout, user } = authStore;
const isLanding = route.path === "/";

const handleLogout = () => {
  logout();
};
</script>
