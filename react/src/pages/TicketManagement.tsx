import { useEffect, useState, type SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TicketCard } from "@/components/TicketCard";
import { TicketForm } from "@/components/TicketForm";
import { useTicketStore } from "@/store/ticketStore";
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
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Ticket } from "@/types";

const TicketManagement = () => {
  const { tickets, loadTickets, addTicket, updateTicket, deleteTicket } =
    useTicketStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | undefined>(
    undefined
  );
  const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleCreate = () => {
    setEditingTicket(undefined);
    setIsFormOpen(true);
  };

  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "create") {
      handleCreate();
      searchParams.delete("action");
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, setSearchParams]);

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingTicketId(id);
  };

  const confirmDelete = () => {
    if (deletingTicketId) {
      deleteTicket(deletingTicketId);
      toast.success("Ticket deleted successfully");
      setDeletingTicketId(null);
    }
  };

  const handleSubmit = (data: any) => {
    if (editingTicket) {
      updateTicket(editingTicket.id, data);
      toast.success("Ticket updated successfully");
    } else {
      addTicket(data);
      toast.success("Ticket created successfully");
    }
    setIsFormOpen(false);
    setEditingTicket(undefined);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Ticket Management
              </h1>
              <p className="text-muted-foreground">
                Create, view, edit, and manage all your tickets
              </p>
            </div>
            <Button onClick={handleCreate} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              New Ticket
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setSearchQuery(e.target.value)
                }
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
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

          {filteredTickets.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No tickets found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first ticket"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Button onClick={handleCreate}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Ticket
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTicket ? "Edit Ticket" : "Create New Ticket"}
            </DialogTitle>
          </DialogHeader>
          <TicketForm
            ticket={editingTicket}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingTicket(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingTicketId}
        onOpenChange={() => setDeletingTicketId(null)}
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
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default TicketManagement;
