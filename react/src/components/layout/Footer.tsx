import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-secondary/30 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-center md:text-left">
              TicketFlow
            </h3>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Modern ticket management made simple. Track, manage, and resolve
              issues efficiently.
            </p>
          </div>

          <div className="flex w-full justify-center md:justify-end md:items-start items-center">
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-center md:text-left">
                Connect
              </h4>
              <div className="flex flex-1 gap-3">
                <a
                  href="https://github.com/jayhansea"
                  className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                  target="_blank"
                >
                  <Github className="w-5 h-5 text-muted-foreground" />
                </a>
                <a
                  href="https://x.com/Jayhansea"
                  className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                  target="_blank"
                >
                  <Twitter className="w-5 h-5 text-muted-foreground" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tochukwu-ezeokafor/"
                  className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} TicketFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
