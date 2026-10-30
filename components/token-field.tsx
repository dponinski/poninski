"use client";

import { useEffect, useRef } from "react";
import { useInspect } from "./inspect";

function readVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function hexToRgb(hex: string): [number, number, number] {
  const raw = hex.replace("#", "");
  const value = Number.parseInt(raw, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function mix(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ] as const;
}

export function TokenField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0.72, y: 0.38, active: false });
  const schedulePaint = useRef<() => void>(() => undefined);
  const { inspect } = useInspect();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    const paint = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const resting = hexToRgb(readVar("--color-resting-muted") || "#9D9D9D");
      const active = hexToRgb(readVar("--color-active-muted") || "#72D8E5");
      const deep = hexToRgb(readVar("--color-active-strong") || "#006572");
      const radius = Number.parseFloat(readVar("--radius-xs") || "4");
      const gap = 6;
      const cols = Math.max(10, Math.floor(rect.width / 28));
      const rows = Math.max(8, Math.floor(rect.height / 28));
      const cellW = (rect.width - gap * (cols + 1)) / cols;
      const cellH = (rect.height - gap * (rows + 1)) / rows;
      const px = pointer.current.x * rect.width;
      const py = pointer.current.y * rect.height;
      const reach = reduced ? 0 : Math.max(rect.width, rect.height) * 0.42;

      context.clearRect(0, 0, rect.width, rect.height);

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const cx = gap + x * (cellW + gap) + cellW / 2;
          const cy = gap + y * (cellH + gap) + cellH / 2;
          const dist = Math.hypot(cx - px, cy - py);
          const t = reduced ? 0.12 : Math.max(0, 1 - dist / reach) ** 1.6;
          const rgb = mix(resting, active, t);
          context.fillStyle = `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
          const left = gap + x * (cellW + gap);
          const top = gap + y * (cellH + gap);
          context.beginPath();
          context.roundRect(left, top, cellW, cellH, radius);
          context.fill();
        }
      }

      if (!reduced && pointer.current.active) {
        context.strokeStyle = `rgb(${deep[0]} ${deep[1]} ${deep[2]})`;
        context.lineWidth = 1.5;
        context.beginPath();
        context.arc(px, py, 14, 0, Math.PI * 2);
        context.stroke();
      }
    };

    schedulePaint.current = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        paint();
      });
    };

    const resizeObserver = new ResizeObserver(schedulePaint.current);
    resizeObserver.observe(canvas);
    schedulePaint.current();

    return () => {
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      schedulePaint.current = () => undefined;
    };
  }, []);

  return (
    <div
      className="field-wrap"
      onPointerEnter={() =>
        inspect({
          label: "Activation field",
          tokens: [
            "--color-resting-muted",
            "--color-active-muted",
            "--color-active-strong",
            "--radius-xs",
          ],
        })
      }
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
          active: true,
        };
        schedulePaint.current();
      }}
      onPointerLeave={() => {
        pointer.current.active = false;
        schedulePaint.current();
      }}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="field-meta">
        <span className="chip">resting → active</span>
        <span className="chip">pointer as token</span>
      </div>
    </div>
  );
}
