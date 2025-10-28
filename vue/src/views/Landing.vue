<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-primary/5 via-background to-primary-glow/5 overflow-hidden"
    >
      <DecorativeCircle
        :size="400"
        :position="{ top: '-200px', right: '-100px' }"
        color="glow"
        :opacity="0.15"
      />
      <DecorativeCircle
        :size="300"
        :position="{ bottom: '-150px', left: '-50px' }"
        color="primary"
        :opacity="0.1"
      />

      <div
        class="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32"
      >
        <div class="text-center max-w-3xl mx-auto">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Manage Tickets with
            <span
              class="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"
            >
              Confidence
            </span>
          </h1>
          <p
            class="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            TicketFlow helps teams track, prioritize, and resolve issues faster.
            Say goodbye to scattered tickets and hello to streamlined workflows.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/signup">
              <Button size="lg" class="w-full sm:w-auto text-lg px-8">
                Get Started Free
              </Button>
            </RouterLink>
            <RouterLink to="/login">
              <Button
                size="lg"
                variant="outline"
                class="w-full sm:w-auto text-lg px-8"
              >
                Login
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>

      <WaveBackground />
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-background relative">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need to manage tickets
          </h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make ticket management effortless and
            efficient.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div
              class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4"
            >
              <component
                :is="feature.icon"
                class="w-6 h-6 text-primary-foreground"
              />
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-muted-foreground">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-20 bg-gradient-to-br from-primary/5 to-primary-glow/5 relative"
    >
      <DecorativeCircle
        :size="250"
        :position="{ top: '20%', right: '10%' }"
        color="primary"
        :opacity="0.08"
      />

      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="bg-card border rounded-2xl p-8 sm:p-12 text-center shadow-lg"
        >
          <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to streamline your workflow?
          </h2>
          <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join teams who trust TicketFlow to manage their tickets efficiently.
          </p>
          <RouterLink to="/signup">
            <Button size="lg" class="text-lg px-8"> Start Free Today </Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { Button } from "@/components/ui/button";
import WaveBackground from "@/components/WaveBackground.vue";
import DecorativeCircle from "@/components/DecorativeCircle.vue";
import { CheckCircle2, Zap, Shield, BarChart3 } from "lucide-vue-next";

const features = [
  {
    icon: CheckCircle2,
    title: "Easy Tracking",
    description:
      "Track all your tickets in one centralized dashboard with real-time updates.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Create, update, and resolve tickets instantly with our optimized workflow.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your data is protected with enterprise-grade security and backup systems.",
  },
  {
    icon: BarChart3,
    title: "Insightful Analytics",
    description:
      "Get detailed insights into ticket trends and team performance metrics.",
  },
];
</script>
