interface DecorativeCircleProps {
  size?: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  color?: "primary" | "glow" | "accent";
  opacity?: number;
  blur?: boolean;
}

export const DecorativeCircle = ({
  size = 300,
  position,
  color = "primary",
  opacity = 0.1,
  blur = true,
}: DecorativeCircleProps) => {
  const colorMap = {
    primary: "hsl(var(--primary))",
    glow: "hsl(var(--primary-glow))",
    accent: "hsl(var(--accent))",
  };

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: colorMap[color],
        opacity,
        filter: blur ? "blur(80px)" : "none",
        ...position,
      }}
    />
  );
};
