"use client";

/*
 * 차트 규칙 (dataviz 가이드 기준)
 * - 막대는 하나의 기준선에서 자라고, 끝만 둥글게
 * - 색은 역할로만: 현재(기준)는 회색, 단계는 하늘색→코발트의 명도 순서, 지금 고른 것은 코발트
 * - 값 글자는 막대 색이 아니라 본문 글자색
 * - 격자선은 실선 헤어라인
 */

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { Fragment, useState } from "react";
import { CountUp, EASE, NumBadge, PlusList, Reveal, cx } from "@/components/ui/primitives";
import { LEVERS, SCENARIOS } from "@/slides/data";

const grow = (axis: "x" | "y"): Variants => ({
  hidden: axis === "y" ? { scaleY: 0 } : { scaleX: 0 },
  show: (delay: number = 0.4) => ({
    ...(axis === "y" ? { scaleY: 1 } : { scaleX: 1 }),
    transition: { duration: 0.8, ease: EASE, delay },
  }),
});

const fadeAt: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: (delay: number = 0.6) => ({ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay } }),
};

const swap = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

/* ------------------------------------------------------------------ */
/* 6개월 시나리오 — 막대를 고르면 오른쪽 카드에 조건이 나온다                  */
/* ------------------------------------------------------------------ */

const SCENARIO_FILL = ["#d1d3d4", "#a8d9f2", "#36a9e1", "#1d71b8"];

export function ScenarioExplorer() {
  const [sel, setSel] = useState(2);
  const H = 330;
  const MAX = 230;
  const s = SCENARIOS[sel];
  const refBottom = (100 / MAX) * H;

  return (
    <div className="grid h-full grid-cols-[minmax(0,1fr)_540px] gap-[28px]">
      <Reveal className="card flex flex-col px-[36px] pb-[24px] pt-[26px]">
        <div className="flex items-center justify-between text-[16px] font-semibold text-ink-3">
          <span>월 매출 · 현재 = 100</span>
          <span>막대를 누르면 조건이 바뀝니다</span>
        </div>
        <div className="relative mt-[10px] grid flex-1 grid-cols-4">
          <div className="pointer-events-none absolute inset-x-0 top-0" style={{ height: H + 70 }}>
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-line" />
            <div className="absolute inset-x-0 h-px bg-line" style={{ bottom: refBottom }} />
          </div>
          {SCENARIOS.map((sc, i) => {
            const active = i === sel;
            return (
              <button
                key={sc.name}
                type="button"
                onClick={() => setSel(i)}
                onMouseEnter={() => setSel(i)}
                aria-pressed={active}
                className="group relative flex cursor-pointer flex-col items-center"
              >
                <motion.span
                  className="absolute inset-x-[10px] -top-[6px] bottom-[-8px] rounded-[22px] bg-cream-2"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                />
                <div className="relative flex w-full flex-col items-center justify-end" style={{ height: H + 70 }}>
                  <motion.div className="mb-[10px]" variants={fadeAt} custom={0.55 + i * 0.15}>
                    <CountUp
                      value={sc.value}
                      delay={0.5 + i * 0.15}
                      className={cx("font-display text-[48px] font-bold tracking-[-0.04em]", active ? "text-cobalt" : "text-ink")}
                    />
                  </motion.div>
                  <motion.div
                    className="w-[96px] rounded-t-[14px] transition-[filter] group-hover:brightness-105"
                    style={{ height: (sc.value / MAX) * H, background: SCENARIO_FILL[i], originY: 1 }}
                    variants={grow("y")}
                    custom={0.4 + i * 0.15}
                  />
                </div>
                <motion.div className="relative mt-[16px] text-center" variants={fadeAt} custom={0.7 + i * 0.15}>
                  <div className={cx("text-[27px] font-bold", active ? "text-ink" : "text-ink-2")}>{sc.name}</div>
                  <div className={cx("mt-[2px] font-display text-[22px] font-bold", i === 0 ? "text-ink-3" : "text-cobalt")}>{sc.mult}</div>
                </motion.div>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="card-dark flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/15 px-[30px] pb-[16px] pt-[22px]">
          <span className="text-[20px] font-bold text-white/70">고른 시나리오</span>
          <Check className="size-[24px]" strokeWidth={2.4} />
        </div>
        <div className="flex-1 px-[30px] pb-[26px] pt-[22px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={sel} {...swap}>
              <div className="flex items-baseline gap-[14px]">
                <span className="text-[34px] font-bold">{s.name}</span>
                <span className="font-display text-[56px] font-bold leading-none tracking-[-0.04em] text-azure-2">{s.value}</span>
                <span className="font-display text-[24px] font-bold text-white/80">{s.mult}</span>
              </div>
              <p className="mt-[14px] text-[21px] leading-[1.55] text-white/90">{s.when}</p>
              {s.includes && (
                <div className="mt-[22px]">
                  <div className="text-[15px] font-bold text-white/60">이 시나리오에 넣은 레버</div>
                  <div className="mt-[10px] flex flex-wrap gap-[8px]">
                    {s.includes.map((x, j) => (
                      <span
                        key={x}
                        className={cx(
                          "rounded-full px-[14px] py-[6px] text-[17px] font-semibold",
                          j >= 3 ? "bg-azure text-char" : "bg-white/12 text-white ring-1 ring-inset ring-white/20",
                        )}
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                  {sel === 2 && <div className="mt-[10px] text-[14px] text-white/55">하늘색 = 보수 시나리오에 더한 레버</div>}
                </div>
              )}
              {s.conditions && (
                <div className="mt-[20px]">
                  <div className="text-[15px] font-bold text-white/60">셋 중 둘 이상이 맞아야 2배에 닿습니다</div>
                  <PlusList dark className="mt-[12px]" itemClassName="text-[18.5px]" items={s.conditions} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 성장 레버 7개 — 100에서 156까지 쌓이는 폭포 차트 + 고른 레버의 설명          */
/* ------------------------------------------------------------------ */

export function LeverWaterfall() {
  const [active, setActive] = useState(0);
  const H = 400;
  const MAX = 168;
  const unit = H / MAX;
  const BAR = 72;
  const slots = LEVERS.length + 2;

  type Bar = { key: string; from: number; to: number; kind: "start" | "lever" | "end"; text: string; lever?: number };
  const bars: Bar[] = [{ key: "start", from: 0, to: 100, kind: "start", text: "100" }];
  let level = 100;
  LEVERS.forEach((l, i) => {
    bars.push({ key: l.no, from: level, to: level + l.v, kind: "lever", text: `+${l.v}`, lever: i });
    level += l.v;
  });
  bars.push({ key: "end", from: 0, to: level, kind: "end", text: String(level) });

  const delayOf = (i: number) => (i === 0 ? 0.3 : i === bars.length - 1 ? 0.55 + LEVERS.length * 0.1 + 0.1 : 0.55 + (i - 1) * 0.1);
  const center = (i: number) => `${((i + 0.5) / slots) * 100}%`;
  const lever = LEVERS[active];
  const cumulative = 100 + LEVERS.slice(0, active + 1).reduce((a, l) => a + l.v, 0);

  return (
    <div className="grid h-full grid-cols-[minmax(0,1fr)_500px] gap-[28px]">
      <Reveal className="card flex flex-col px-[30px] pb-[18px] pt-[24px]">
        <div className="flex items-center justify-between text-[16px] font-semibold text-ink-3">
          <span>기본 시나리오 · 레버별 6개월 기여</span>
          <span>레버를 누르면 오른쪽에 할 일과 근거가 나옵니다</span>
        </div>
        <div className="relative mt-[8px]" style={{ height: H + 64 }}>
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-line" />
          <div className="absolute inset-x-0 h-px bg-line" style={{ bottom: 100 * unit }} />
          <div className="absolute inset-x-0 h-px bg-line" style={{ bottom: 156 * unit }} />

          {bars.map((b, i) => {
            const isActive = b.kind === "lever" && b.lever === active;
            const fill = b.kind === "start" ? "#d1d3d4" : b.kind === "end" ? "#1d71b8" : isActive ? "#1d71b8" : "#36a9e1";
            return (
              <Fragment key={b.key}>
                {b.kind === "lever" && (
                  <motion.div
                    className="absolute bottom-[-6px] top-0 rounded-[16px] bg-cream-2"
                    style={{ left: `calc(${center(i)} - ${BAR / 2 + 14}px)`, width: BAR + 28 }}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                  />
                )}
                <motion.div
                  className="absolute"
                  style={{
                    left: center(i),
                    marginLeft: -BAR / 2,
                    width: BAR,
                    bottom: b.from * unit,
                    height: Math.max((b.to - b.from) * unit, 3),
                    background: fill,
                    borderRadius: b.kind === "lever" ? 8 : "12px 12px 0 0",
                    originY: 1,
                    transition: "background-color 0.25s",
                  }}
                  variants={grow("y")}
                  custom={delayOf(i)}
                />
                {i < bars.length - 1 && (
                  <motion.div
                    className="absolute h-[1.5px] bg-ink-4"
                    style={{
                      left: `calc(${center(i)} + ${BAR / 2}px)`,
                      width: `calc(${100 / slots}% - ${BAR}px)`,
                      bottom: b.to * unit - 0.75,
                    }}
                    variants={fadeAt}
                    custom={delayOf(i + 1)}
                  />
                )}
                <motion.div
                  className="absolute -translate-x-1/2 text-center"
                  style={{ left: center(i), bottom: b.to * unit + 10 }}
                  variants={fadeAt}
                  custom={delayOf(i) + 0.35}
                >
                  {b.kind === "end" ? (
                    <div className="leading-none">
                      <div className="mb-[6px] text-[17px] font-bold text-cobalt">약 1.6배</div>
                      <div className="font-display text-[44px] font-bold tracking-[-0.04em] text-cobalt">{b.text}</div>
                    </div>
                  ) : (
                    <span
                      className={cx(
                        "font-display font-bold tracking-[-0.03em]",
                        b.kind === "start" ? "text-[42px] text-ink-2" : cx("text-[30px]", isActive ? "text-cobalt" : "text-ink"),
                      )}
                    >
                      {b.text}
                    </span>
                  )}
                </motion.div>
                {b.kind === "lever" && (
                  <button
                    type="button"
                    aria-label={`${LEVERS[b.lever!].no} ${LEVERS[b.lever!].name} 자세히`}
                    aria-pressed={isActive}
                    onClick={() => setActive(b.lever!)}
                    onMouseEnter={() => setActive(b.lever!)}
                    className="absolute bottom-0 top-0 z-10 cursor-pointer"
                    style={{ left: `calc(${center(i)} - ${BAR / 2 + 14}px)`, width: BAR + 28 }}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
        <div className="mt-[14px] grid" style={{ gridTemplateColumns: `repeat(${slots}, minmax(0, 1fr))` }}>
          {bars.map((b, i) => {
            const isActive = b.kind === "lever" && b.lever === active;
            return (
              <motion.div key={b.key} className="flex flex-col items-center px-[4px] text-center" variants={fadeAt} custom={delayOf(i) + 0.2}>
                {b.kind === "lever" ? (
                  <button
                    type="button"
                    onClick={() => setActive(b.lever!)}
                    onMouseEnter={() => setActive(b.lever!)}
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <NumBadge no={LEVERS[b.lever!].no} size={30} tone={isActive ? "cobalt" : "azure"} />
                    <span className={cx("mt-[6px] text-[17.5px] font-semibold leading-[1.3]", isActive ? "text-ink" : "text-ink-2")}>
                      {LEVERS[b.lever!].name}
                    </span>
                  </button>
                ) : (
                  <>
                    <div className={cx("text-[21px] font-bold", b.kind === "end" ? "text-cobalt" : "text-ink-2")}>
                      {b.kind === "end" ? "6개월 뒤" : "현재"}
                    </div>
                    {b.kind === "end" && <div className="mt-[2px] text-[16px] font-semibold text-ink-3">기본 시나리오</div>}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="card-dark flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/15 px-[30px] pb-[16px] pt-[22px]">
          <span className="text-[20px] font-bold text-white/70">고른 레버</span>
          <span className="font-display text-[18px] font-bold text-white/60">누적 {cumulative}</span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active} {...swap} className="flex flex-1 flex-col px-[30px] pb-[26px] pt-[22px]">
            <div className="flex items-center gap-[14px]">
              <NumBadge no={lever.no} size={40} tone="white" />
              <span className="text-[30px] font-bold leading-tight">{lever.name}</span>
            </div>
            <div className="mt-[16px] font-display text-[64px] font-bold leading-none tracking-[-0.04em] text-azure-2">+{lever.v}</div>
            <div className="mt-[22px] text-[15px] font-bold text-white/60">무엇을 하나</div>
            <p className="mt-[6px] text-[20px] leading-[1.55] text-white/95">{lever.what}</p>
            <div className="mt-[18px] text-[15px] font-bold text-white/60">근거</div>
            <p className="mt-[6px] text-[18px] leading-[1.55] text-white/80 [&>span]:bg-white/12 [&>span]:text-white/90 [&>span]:ring-white/20">
              {lever.why}
            </p>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 가로 비교 막대                                                        */
/* ------------------------------------------------------------------ */

export interface CompareRow {
  label: string;
  value: number;
  display: string;
  tone: "focus" | "context" | "light";
}

export function CompareBars({ rows, max, delay = 0.5 }: { rows: CompareRow[]; max: number; delay?: number }) {
  const fill = { focus: "#1d71b8", context: "#d1d3d4", light: "#a8d9f2" } as const;
  return (
    <div className="space-y-[16px]">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between gap-[12px]">
            <span className="text-[18.5px] font-semibold text-ink-2">{r.label}</span>
            <span className="font-display text-[24px] font-bold text-ink">{r.display}</span>
          </div>
          <div className="mt-[8px] h-[18px] overflow-hidden rounded-full bg-pebble-2">
            <motion.div
              className="h-full rounded-full"
              style={{ width: `${Math.max((r.value / max) * 100, 1.6)}%`, background: fill[r.tone], originX: 0 }}
              variants={grow("x")}
              custom={delay + i * 0.15}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 커넥트 매출 비중 — 보통 4~15%, 도전 조건은 15% 가까이                      */
/* ------------------------------------------------------------------ */

export function ConnectRange() {
  const MAX = 20;
  const pct = (v: number) => `${(v / MAX) * 100}%`;
  return (
    <div className="pt-[6px]">
      <div className="relative h-[16px] rounded-full bg-pebble-2">
        <motion.div
          className="absolute inset-y-0 rounded-full bg-azure-3"
          style={{ left: pct(4), width: pct(11), originX: 0 }}
          variants={grow("x")}
          custom={0.9}
        />
        <motion.div
          className="absolute -top-[7px] h-[30px] w-[5px] -translate-x-1/2 rounded-full bg-cobalt"
          style={{ left: pct(15) }}
          variants={fadeAt}
          custom={1.3}
        />
      </div>
      <div className="relative mt-[8px] h-[22px] text-[15px] font-semibold text-ink-3">
        <span className="absolute left-0">0%</span>
        <span className="absolute -translate-x-1/2" style={{ left: pct(4) }}>
          4%
        </span>
        <span className="absolute -translate-x-1/2 font-bold text-cobalt" style={{ left: pct(15) }}>
          15%
        </span>
        <span className="absolute right-0">20%</span>
      </div>
      <div className="mt-[8px] flex flex-wrap items-center gap-x-[16px] gap-y-[4px] text-[15px] text-ink-3">
        <span className="flex items-center gap-[6px]">
          <span className="h-[10px] w-[18px] rounded-full bg-azure-3" />
          커넥트 매출 비중(네이버 집계, 보통)
        </span>
        <span className="flex items-center gap-[6px]">
          <span className="h-[12px] w-[4px] rounded-full bg-cobalt" />
          도전 조건
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 수익률 두 줄 — 매출 대비 비용 막대                                      */
/* ------------------------------------------------------------------ */

export function CostBar({
  segments,
  total,
  delay = 0.6,
}: {
  segments: Array<{ label: string; value: number; inside?: boolean }>;
  total: number;
  delay?: number;
}) {
  const fills = ["#313234", "#55575b", "#7d7f83"];
  return (
    <div className="flex h-[50px] gap-[2px]">
      {segments.map((s, i) => (
        <motion.div
          key={s.label}
          className={cx(
            "flex h-full items-center justify-center text-[17px] font-bold whitespace-nowrap text-white",
            i === 0 && "rounded-l-[10px]",
            i === segments.length - 1 && "rounded-r-[10px]",
          )}
          style={{ width: `${(s.value / total) * 100}%`, background: fills[i % fills.length], originX: 0 }}
          variants={grow("x")}
          custom={delay + i * 0.18}
        >
          {s.inside && s.label}
        </motion.div>
      ))}
    </div>
  );
}

export function RevenueBar({ label, delay = 0.45 }: { label: string; delay?: number }) {
  return (
    <motion.div
      className="flex h-[50px] items-center rounded-[10px] bg-azure px-[18px] text-[17px] font-bold text-char"
      style={{ originX: 0 }}
      variants={grow("x")}
      custom={delay}
    >
      {label}
    </motion.div>
  );
}
