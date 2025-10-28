<template>
  <div class="absolute rounded-full pointer-events-none" :style="circleStyle" />
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Position {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

interface DecorativeCircleProps {
  size?: number;
  position: Position;
  color?: "primary" | "glow" | "accent";
  opacity?: number;
  blur?: boolean;
}

const props = withDefaults(defineProps<DecorativeCircleProps>(), {
  size: 300,
  color: "primary",
  opacity: 0.1,
  blur: true,
});

const colorMap = {
  primary: "hsl(var(--primary))",
  glow: "hsl(var(--primary-glow))",
  accent: "hsl(var(--accent))",
};

const circleStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  background: colorMap[props.color],
  opacity: props.opacity,
  filter: props.blur ? "blur(80px)" : "none",
  ...props.position,
}));
</script>
