import type { Ticket } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

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

export const TicketCard = ({ ticket, onEdit, onDelete }: TicketCardProps) => {
  const status = statusConfig[ticket.status];

  return (
    <Card className="p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={status.className}>{status.label}</Badge>
            {ticket.priority && (
              <Badge
                variant="outline"
                className={priorityConfig[ticket.priority]}
              >
                {ticket.priority}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg text-foreground">
            {ticket.title}
          </h3>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(ticket)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(ticket.id)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>

      {ticket.description && (
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {ticket.description}
        </p>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-3.5 h-3.5" />
        <span>
          Updated{" "}
          {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
        </span>
      </div>
    </Card>
  );
};
