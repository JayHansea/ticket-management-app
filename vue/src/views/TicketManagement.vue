<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TicketCard from "@/components/TicketCard.vue";
import TicketForm from "@/components/TicketForm.vue";
import { useTicketStore } from "@/stores/ticketStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search } from "lucide-vue-next";
import { toast } from "vue-sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Ticket } from "@/types";

const router = useRouter();
const route = useRoute();
const ticketStore = useTicketStore();

const isFormOpen = ref(false);
const editingTicket = ref<Ticket | undefined>(undefined);
const deletingTicketId = ref<string | null>(null);
const searchQuery = ref("");
const statusFilter = ref("all");

onMounted(() => {
  ticketStore.loadTickets();
});

const handleCreate = () => {
  editingTicket.value = undefined;
  isFormOpen.value = true;
};

watch(
  () => route.query.action,
  (action) => {
    if (action === "create") {
      handleCreate();
      router.replace({ query: {} });
    }
  },
  { immediate: true }
);

const handleEdit = (ticket: Ticket) => {
  editingTicket.value = ticket;
  isFormOpen.value = true;
};

const handleDelete = (id: string) => {
  deletingTicketId.value = id;
};

const confirmDelete = () => {
  if (deletingTicketId.value) {
    ticketStore.deleteTicket(deletingTicketId.value);
    toast.success("Ticket deleted successfully");
    deletingTicketId.value = null;
  }
};

const handleSubmit = (data: any) => {
  if (editingTicket.value) {
    ticketStore.updateTicket(editingTicket.value.id, data);
    toast.success("Ticket updated successfully");
  } else {
    ticketStore.addTicket(data);
    toast.success("Ticket created successfully");
  }
  isFormOpen.value = false;
  editingTicket.value = undefined;
};

const filteredTickets = computed(() => {
  return ticketStore.tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.description
        ?.toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      statusFilter.value === "all" || ticket.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main
      class="flex-1 bg-gradient-to-br from-background via-primary/5 to-background"
    >
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 class="text-4xl font-bold text-foreground mb-2">
              Ticket Management
            </h1>
            <p class="text-muted-foreground">
              Create, view, edit, and manage all your tickets
            </p>
          </div>
          <Button @click="handleCreate" size="lg">
            <Plus class="w-5 h-5 mr-2" />
            New Ticket
          </Button>
        </div>

        <!-- Filters -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="relative flex-1">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
            />
            <Input
              placeholder="Search tickets..."
              v-model="searchQuery"
              class="pl-10"
            />
          </div>

          <Select v-model="statusFilter">
            <SelectTrigger class="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Ticket Grid -->
        <template v-if="filteredTickets.length === 0">
          <div class="text-center py-16">
            <div
              class="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center"
            >
              <Search class="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-2">
              No tickets found
            </h3>
            <p class="text-muted-foreground mb-6">
              {{
                searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first ticket"
              }}
            </p>
            <Button
              v-if="!searchQuery && statusFilter === 'all'"
              @click="handleCreate"
            >
              <Plus class="w-4 h-4 mr-2" />
              Create First Ticket
            </Button>
          </div>
        </template>

        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TicketCard
              v-for="ticket in filteredTickets"
              :key="ticket.id"
              :ticket="ticket"
              @edit="handleEdit"
              @delete="handleDelete"
            />
          </div>
        </template>
      </div>
    </main>

    <!-- Create / Edit Dialog -->
    <Dialog :open="isFormOpen" @update:open="isFormOpen = $event">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {{ editingTicket ? "Edit Ticket" : "Create New Ticket" }}
          </DialogTitle>
        </DialogHeader>
        <TicketForm
          :ticket="editingTicket"
          @submit="handleSubmit"
          @cancel="
            () => {
              isFormOpen = false;
              editingTicket = undefined;
            }
          "
        />
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation -->
    <AlertDialog
      :open="!!deletingTicketId"
      @update:open="deletingTicketId = null"
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            @click="confirmDelete"
            class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <Footer />
  </div>
</template>
