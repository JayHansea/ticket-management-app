<template>
  <footer class="w-full border-t bg-secondary/30 mt-auto">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Section -->
        <div>
          <h3 class="font-semibold text-foreground mb-3 text-center md:text-left">
            TicketFlow
          </h3>
          <p class="text-sm text-muted-foreground text-center md:text-left">
            Modern ticket management made simple. Track, manage, and resolve
            issues efficiently.
          </p>
        </div>

        <!-- Right Section -->
        <div class="flex w-full justify-center md:justify-end md:items-start items-center">
          <div>
            <h4 class="font-semibold text-foreground mb-3 text-center md:text-left">
              Connect
            </h4>
            <div class="flex flex-1 gap-3">
              <a
                href="https://github.com/jayhansea"
                class="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                aria-label="GitHub"
                target="_blank"
              >
                <Github class="w-5 h-5 text-muted-foreground" />
              </a>

              <a
                href="https://x.com/Jayhansea"
                class="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                aria-label="Twitter"
                target="_blank"
              >
                <Twitter class="w-5 h-5 text-muted-foreground" />
              </a>

              <a
                href="https://www.linkedin.com/in/tochukwu-ezeokafor/"
                class="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
                target="_blank"
              >
                <Linkedin class="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {{ currentYear }} TicketFlow. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Github, Twitter, Linkedin } from "lucide-vue-next";
import { ref } from "vue";

const currentYear = new Date().getFullYear();
</script>
