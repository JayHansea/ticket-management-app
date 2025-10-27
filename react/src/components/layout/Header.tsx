import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import { Ticket as TicketIcon, LogOut, Menu } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuthStore();
  const isLanding = location.pathname === "/";

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center transition-transform group-hover:scale-105">
              <TicketIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">
              TicketFlow
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Desktop Navigation (hidden on mobile) */}
                <div className="hidden sm:flex items-center gap-4">
                  <Link to="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link to="/tickets">
                    <Button variant="ghost">Tickets</Button>
                  </Link>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                    <span>{user?.name}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>

                {/* Mobile Navigation (visible on mobile) */}
                <div className="sm:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        Hi, {user?.name || "User"}!
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link to="/dashboard">
                        <DropdownMenuItem>Dashboard</DropdownMenuItem>
                      </Link>
                      <Link to="/tickets">
                        <DropdownMenuItem>Tickets</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-destructive"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                {!isLanding && (
                  <>
                    <Link to="/login">
                      <Button variant="ghost">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button>Get Started</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
