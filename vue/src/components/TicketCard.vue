<template>
  <Card class="p-5 hover:shadow-lg transition-shadow">
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <Badge :class="status.className">{{ status.label }}</Badge>
          <Badge
            v-if="ticket.priority"
            variant="outline"
            :class="priorityConfig[ticket.priority]"
          >
            {{ ticket.priority }}
          </Badge>
        </div>

        <h3 class="font-semibold text-lg text-foreground">
          {{ ticket.title }}
        </h3>
      </div>

      <div class="flex gap-2">
        <Button variant="ghost" size="sm" @click="() => onEdit(ticket)">
          <Pencil class="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" @click="() => onDelete(ticket.id)">
          <Trash2 class="w-4 h-4 text-destructive" />
        </Button>
      </div>
    </div>

    <p
      v-if="ticket.description"
      class="text-muted-foreground text-sm mb-3 line-clamp-2"
    >
      {{ ticket.description }}
    </p>

    <div class="flex items-center gap-2 text-xs text-muted-foreground">
      <Clock class="w-3.5 h-3.5" />
      <span>
        Updated
        {{
          formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })
        }}
      </span>
    </div>
  </Card>
</template>

<script setup lang="ts">
import type { Ticket } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Clock } from "lucide-vue-next";
import { formatDistanceToNow } from "date-fns";
import { computed } from "vue";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

const props = defineProps<TicketCardProps>();

const statusConfig = {
  open: {
    label: "Open",
    className:
      "bg-status-open text-status-open-foreground hover:bg-status-open",
  },
  in_progress: {
    label: "In Progress",
    className:
      "bg-status-progress text-status-progress-foreground hover:bg-status-progress",
  },
  closed: {
    label: "Closed",
    className:
      "bg-status-closed text-status-closed-foreground hover:bg-status-closed",
  },
};

const priorityConfig = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-status-progress/20 text-status-progress-foreground",
  high: "bg-destructive/20 text-destructive-foreground",
};

const status = computed(() => statusConfig[props.ticket.status]);
const onEdit = props.onEdit;
const onDelete = props.onDelete;
const ticket = props.ticket;
</script>
