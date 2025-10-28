<template>
  <form @submit.prevent="onSubmitForm" class="space-y-5">
    <!-- Title -->
    <div class="space-y-2">
      <Label for="title"> Title <span class="text-destructive">*</span> </Label>
      <Input
        id="title"
        placeholder="Enter ticket title"
        v-model="values.title"
        :class="{ 'border-destructive': errors.title }"
      />
      <p v-if="errors.title" class="text-sm text-destructive">
        {{ errors.title }}
      </p>
    </div>

    <!-- Description -->
    <div class="space-y-2">
      <Label for="description">Description</Label>
      <Textarea
        id="description"
        placeholder="Enter ticket description (optional)"
        rows="4"
        v-model="values.description"
        :class="{ 'border-destructive': errors.description }"
      />
      <p v-if="errors.description" class="text-sm text-destructive">
        {{ errors.description }}
      </p>
    </div>

    <!-- Status and Priority -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Status -->
      <div class="space-y-2">
        <Label for="status">
          Status <span class="text-destructive">*</span>
        </Label>
        <Select v-model="values.status">
          <SelectTrigger :class="{ 'border-destructive': errors.status }">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <p v-if="errors.status" class="text-sm text-destructive">
          {{ errors.status }}
        </p>
      </div>

      <!-- Priority -->
      <div class="space-y-2">
        <Label for="priority">Priority</Label>
        <Select v-model="values.priority">
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 pt-2">
      <Button type="submit" :disabled="isLoading" class="flex-1">
        {{ ticket ? "Update Ticket" : "Create Ticket" }}
      </Button>
      <Button
        type="button"
        variant="outline"
        @click="onCancel"
        :disabled="isLoading"
      >
        Cancel
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { Ticket } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TicketFormProps {
  ticket?: Ticket;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}
const props = defineProps<TicketFormProps>();

const ticketSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: yup
    .string()
    .max(500, "Description must be less than 500 characters"),
  status: yup
    .string()
    .oneOf(["open", "in_progress", "closed"], "Invalid status")
    .required("Status is required"),
  priority: yup.string().oneOf(["low", "medium", "high"], "Invalid priority"),
});

const { handleSubmit, errors, values } = useForm({
  validationSchema: ticketSchema,
  initialValues: {
    title: props.ticket?.title || "",
    description: props.ticket?.description || "",
    status: props.ticket?.status || "open",
    priority: props.ticket?.priority || "medium",
  },
});

const onSubmitForm = handleSubmit((formData) => {
  props.onSubmit(formData);
});

const onCancel = () => {
  props.onCancel();
};

const isLoading = props.isLoading ?? false;
const ticket = props.ticket;
</script>
