import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTicketStore } from "@/store/ticketStore";
import { useAuthStore } from "@/store/authStore";
import { TicketIcon, TrendingUp, CheckCircle2, Clock } from "lucide-react";

const Dashboard = () => {
  const { tickets, loadTickets } = useTicketStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      loadTickets();
    }
  }, [user, loadTickets]);

  const stats = {
    total: tickets.length,
    open: tickets.filter((t: { status: string }) => t.status === "open").length,
    inProgress: tickets.filter(
      (t: { status: string }) => t.status === "in_progress"
    ).length,
    closed: tickets.filter((t: { status: string }) => t.status === "closed")
      .length,
  };

  const statsCards = [
    {
      title: "Total Tickets",
      value: stats.total,
      icon: TicketIcon,
      color: "from-primary to-primary-glow",
    },
    {
      title: "Open",
      value: stats.open,
      icon: TrendingUp,
      color: "from-status-open to-status-open",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      color: "from-status-progress to-status-progress",
    },
    {
      title: "Resolved",
      value: stats.closed,
      icon: CheckCircle2,
      color: "from-status-closed to-status-closed",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Here's an overview of your ticket management
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statsCards.map((stat, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-muted-foreground font-medium">
                  {stat.title}
                </h3>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link to="/tickets">
                  <Button className="w-full justify-start" size="lg">
                    <TicketIcon className="w-5 h-5 mr-2" />
                    Manage All Tickets
                  </Button>
                </Link>
                <Link to="/tickets?action=create">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="lg"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Create New Ticket
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Need Help?
              </h2>
              <p className="text-muted-foreground mb-6">
                Explore our documentation to get the most out of TicketFlow.
                Learn about advanced features, best practices, and tips for
                efficient ticket management.
              </p>
              <Button variant="outline">View Documentation</Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
