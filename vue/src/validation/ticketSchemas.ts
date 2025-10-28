import * as yup from "yup";

export const ticketSchema = yup.object({
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
