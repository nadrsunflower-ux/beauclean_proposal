"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useId, type CSSProperties, type ReactNode } from "react";
import { cx } from "./primitives";

/*
 * 제안서의 계산 규칙을 직접 바꿔 보는 조작부.
 * 마우스로 조작한 뒤에는 포커스를 풀어, 화살표 키가 다시 장 넘김에 쓰이게 한다.
 */
const releaseFocus = (e: { currentTarget: HTMLElement; pointerType?: string }) => {
  if (e.pointerType !== "touch") e.currentTarget.blur();
};

/** iOS 스위치 */
export function Toggle({
  checked,
  onChange,
  label,
  size = "md",
  dark,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  size?: "md" | "lg";
  dark?: boolean;
}) {
  const w = size === "lg" ? 76 : 60;
  const h = size === "lg" ? 44 : 36;
  const k = h - 6;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      onPointerUp={releaseFocus}
      className={cx(
        "relative shrink-0 cursor-pointer rounded-full transition-colors duration-300",
        checked ? "bg-azure" : dark ? "bg-white/25" : "bg-pebble",
      )}
      style={{ width: w, height: h }}
    >
      <motion.span
        className="absolute top-[3px] rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.25)]"
        style={{ width: k, height: k }}
        initial={false}
        animate={{ left: checked ? w - k - 3 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
      />
    </button>
  );
}

/** iOS 슬라이더 */
export function RangeSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  fill = "#36a9e1",
  track = "#e4e5e5",
  className,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  label: string;
  fill?: string;
  track?: string;
  className?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      data-no-swipe
      aria-label={label}
      className={cx("ios-range", className)}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      onPointerUp={releaseFocus}
      style={{ "--range-pct": `${pct}%`, "--range-fill": fill, "--range-track": track } as CSSProperties}
    />
  );
}

/** − 값 + */
export function Stepper({
  value,
  onChange,
  min,
  max,
  step,
  label,
  format,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  format: (v: number) => ReactNode;
}) {
  const btn =
    "grid size-[34px] cursor-pointer place-items-center rounded-full bg-white text-ink ring-1 ring-inset ring-line transition-colors hover:bg-azure-5 hover:text-cobalt disabled:cursor-default disabled:opacity-35";
  return (
    <div className="inline-flex items-center gap-[10px]" role="group" aria-label={label}>
      <button type="button" className={btn} aria-label={`${label} 줄이기`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - step))} onPointerUp={releaseFocus}>
        <Minus className="size-[16px]" strokeWidth={2.6} />
      </button>
      <span className="min-w-[72px] text-center font-display text-[24px] font-bold text-cobalt">{format(value)}</span>
      <button type="button" className={btn} aria-label={`${label} 늘리기`} disabled={value >= max} onClick={() => onChange(Math.min(max, value + step))} onPointerUp={releaseFocus}>
        <Plus className="size-[16px]" strokeWidth={2.6} />
      </button>
    </div>
  );
}

/** iOS 세그먼트 컨트롤 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: Array<{ value: T; label: ReactNode }>;
  value: T;
  onChange: (v: T) => void;
  label: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div role="radiogroup" aria-label={label} className={cx("inline-flex rounded-full bg-beige p-[5px]", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            onPointerUp={releaseFocus}
            className={cx(
              "relative cursor-pointer rounded-full px-[22px] py-[9px] text-[18px] font-bold transition-colors",
              active ? "text-white" : "text-ink-2 hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                className="absolute inset-0 rounded-full bg-cobalt"
                transition={{ type: "spring", stiffness: 480, damping: 38 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
