<template>
  <div class="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
    <svg
      class="relative block w-full h-24 sm:h-32"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="'hsl(var(--primary))'" />
          <stop offset="100%" :stop-color="'hsl(var(--primary-glow))'" />
        </linearGradient>
      </defs>

      <path
        d="M0,64 C240,96 360,96 600,64 C840,32 960,32 1200,64 L1200,120 L0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.3"
      />
      <path
        d="M0,80 C240,48 360,48 600,80 C840,112 960,112 1200,80 L1200,120 L0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.5"
      />
      <path
        d="M0,96 C240,64 360,64 600,96 C840,128 960,128 1200,96 L1200,120 L0,120 Z"
        :fill="'hsl(var(--background))'"
      />
    </svg>
  </div>
</template>

<script setup></script>
