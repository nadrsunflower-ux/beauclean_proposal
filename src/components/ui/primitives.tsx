"use client";

import { animate, motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check, PackageCheck, Plus } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useDeck } from "@/components/deck/context";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/* 등장 애니메이션                                                      */
/* ------------------------------------------------------------------ */

const rootVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

/** 슬라이드 최상위. 안쪽 Reveal들이 순서대로 나타난다. */
export function SlideRoot({ className, children, style }: { className?: string; children: ReactNode; style?: CSSProperties }) {
  const { isStatic } = useDeck();
  return (
    <motion.div
      className={cx("absolute inset-0", className)}
      style={style}
      variants={rootVariants}
      initial={isStatic ? false : "hidden"}
      animate="show"
    >
      {children}
    </motion.div>
  );
}

const riseVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
});

type RevealProps = HTMLMotionProps<"div"> & { y?: number };

/** 부모의 순서에 맞춰 아래에서 떠오르며 나타난다 */
export function Reveal({ y = 18, ...rest }: RevealProps) {
  return <motion.div variants={riseVariants(y)} {...rest} />;
}

/** 자식들을 자기 차례가 왔을 때 다시 순서대로 보여 준다 */
export function Group({ gap = 0.06, delay = 0, ...rest }: HTMLMotionProps<"div"> & { gap?: number; delay?: number }) {
  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    />
  );
}

const fmtNum = (v: number, decimals: number) =>
  v.toLocaleString("ko-KR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** 0에서 목표 숫자까지 올라가는 숫자. 값이 바뀌면 이전 값에서 이어서 움직인다. */
export function CountUp({
  value,
  decimals = 0,
  duration = 1.1,
  delay = 0.3,
  className,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(0);
  const first = useRef(true);
  const reduce = useReducedMotion();
  const { isStatic } = useDeck();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isStatic || reduce) {
      el.textContent = fmtNum(value, decimals);
      last.current = value;
      return;
    }
    const controls = animate(last.current, value, {
      duration: first.current ? duration : 0.45,
      delay: first.current ? delay : 0,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = fmtNum(v, decimals);
        last.current = v;
      },
    });
    first.current = false;
    return () => controls.stop();
  }, [value, decimals, duration, delay, isStatic, reduce]);

  return (
    <span ref={ref} className={className}>
      {isStatic ? fmtNum(value, decimals) : "0"}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 글자 요소                                                            */
/* ------------------------------------------------------------------ */

/** 제목 속 강조 */
export function Hl({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("text-cobalt", className)}>{children}</span>;
}

export type EvidenceKind = "확인" | "영상" | "가정" | "미확인";

/** 근거 표시: 신호등 점으로 상태를 읽는다 — 확인(초록) · 영상(노랑) · 가정(회색) · 미확인(빨강) */
export const EV_DOT: Record<EvidenceKind, string> = {
  확인: "bg-go",
  영상: "bg-wait",
  가정: "bg-ink-4",
  미확인: "bg-stop",
};

export function Ev({ k, dark, className }: { k: EvidenceKind; dark?: boolean; className?: string }) {
  return (
    <span
      className={cx(
        "mx-[4px] inline-flex -translate-y-[0.08em] items-center gap-[5px] rounded-full px-[8px] align-middle text-[0.72em] font-bold leading-[1.6] tracking-normal whitespace-nowrap",
        dark ? "bg-white/12 text-white/90 ring-1 ring-inset ring-white/20" : "bg-white text-ink-2 ring-1 ring-inset ring-line",
        className,
      )}
    >
      <span className={cx("size-[0.62em] rounded-full", EV_DOT[k])} />
      {k}
    </span>
  );
}

/** 작은 라벨 칩 */
export function Chip({
  children,
  tone = "beige",
  className,
}: {
  children: ReactNode;
  tone?: "beige" | "outline" | "cobalt" | "char" | "azure" | "white";
  className?: string;
}) {
  const tones = {
    beige: "bg-beige text-ink-2",
    outline: "bg-white text-ink-2 ring-1 ring-inset ring-line",
    cobalt: "bg-cobalt text-white",
    char: "bg-char text-white",
    azure: "bg-azure-5 text-cobalt ring-1 ring-inset ring-azure-4",
    white: "bg-white text-cobalt",
  } as const;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-[6px] rounded-full px-[14px] py-[5px] text-[16px] font-bold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 카드                                                                 */
/* ------------------------------------------------------------------ */

/** 흰 종이 카드. interactive면 올려 둘 때 살짝 떠오른다. */
export function Card({ className, interactive, ...rest }: RevealProps & { interactive?: boolean }) {
  return (
    <Reveal
      className={cx(
        "card",
        interactive && "transition-[transform,border-color] duration-300 hover:-translate-y-[4px] hover:border-azure-2",
        className,
      )}
      {...rest}
    />
  );
}

/** 차콜 UI 카드 — 제목 줄 오른쪽에 체크. 결론·조건·승인처럼 '확정된 것'에 쓴다. */
export function DarkCard({
  title,
  right,
  check = true,
  className,
  bodyClassName,
  children,
  ...rest
}: Omit<RevealProps, "title" | "children"> & {
  title: ReactNode;
  right?: ReactNode;
  check?: boolean;
  bodyClassName?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className={cx("card-dark flex flex-col", className)} {...rest}>
      <div className="flex items-center justify-between gap-[16px] border-b border-white/15 px-[28px] pb-[14px] pt-[18px]">
        <div className="text-[22px] font-bold tracking-[-0.02em]">{title}</div>
        {right ?? (check && <Check className="size-[24px] shrink-0 text-white" strokeWidth={2.4} />)}
      </div>
      <div className={cx("flex-1 px-[28px] pb-[22px] pt-[16px]", bodyClassName)}>{children}</div>
    </Reveal>
  );
}

/** 동그라미 + 표시 목록 (다크 카드·베이지 카드 안에서) */
export function PlusList({
  items,
  dark,
  className,
  itemClassName,
}: {
  items: ReactNode[];
  dark?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={cx("space-y-[12px]", className)}>
      {items.map((item, i) => (
        <li key={i} className={cx("flex gap-[12px] text-[19px] leading-[1.5]", dark ? "text-white/92" : "text-ink-2", itemClassName)}>
          <span
            className={cx(
              "mt-[0.16em] grid size-[22px] shrink-0 place-items-center rounded-full ring-[1.5px]",
              dark ? "ring-white/80 text-white" : "ring-ink-3 text-ink-2",
            )}
          >
            <Plus className="size-[14px]" strokeWidth={2.6} />
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** 점 목록 */
export function Bullets({ items, className, itemClassName }: { items: ReactNode[]; className?: string; itemClassName?: string }) {
  return (
    <ul className={cx("space-y-[12px]", className)}>
      {items.map((item, i) => (
        <li key={i} className={cx("flex gap-[12px] text-[20px] leading-[1.5] text-ink-2", itemClassName)}>
          <span className="mt-[0.6em] size-[8px] shrink-0 rounded-full bg-azure" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* 원형 요소                                                            */
/* ------------------------------------------------------------------ */

const CIRCLE_TONE = {
  pebble: "bg-pebble text-ink",
  white: "bg-white text-cobalt ring-1 ring-inset ring-line",
  cobalt: "bg-cobalt text-white",
  azure: "bg-azure text-white",
  sky: "bg-azure text-char",
  char: "bg-char text-white",
  soft: "bg-azure-5 text-cobalt ring-1 ring-inset ring-azure-4",
} as const;

/** 아이콘 원 */
export function IconCircle({
  icon: Icon,
  size = 56,
  tone = "pebble",
  className,
}: {
  icon: LucideIcon;
  size?: number;
  tone?: keyof typeof CIRCLE_TONE;
  className?: string;
}) {
  return (
    <span
      className={cx("inline-grid shrink-0 place-items-center rounded-full", CIRCLE_TONE[tone], className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Icon style={{ width: Math.round(size * 0.46), height: Math.round(size * 0.46) }} strokeWidth={1.9} />
    </span>
  );
}

/** 근거 숫자를 담는 큰 원 */
export function StatCircle({
  value,
  label,
  size = 220,
  tone = "pebble",
  className,
  valueClassName,
}: {
  value: ReactNode;
  label: ReactNode;
  size?: number;
  tone?: keyof typeof CIRCLE_TONE;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div
      className={cx("flex shrink-0 flex-col items-center justify-center rounded-full text-center", CIRCLE_TONE[tone], className)}
      style={{ width: size, height: size }}
    >
      <div className={cx("font-display font-bold leading-none tracking-[-0.04em]", valueClassName)} style={{ fontSize: size * 0.24 }}>
        {value}
      </div>
      <div className="mt-[10px] max-w-[78%] text-[17px] font-semibold leading-[1.35] opacity-80">{label}</div>
    </div>
  );
}

const CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩";

/** ①~⑩을 읽기 쉬운 원형 번호로 */
export function NumBadge({
  no,
  size = 28,
  tone = "cobalt",
  className,
}: {
  no: string | number;
  size?: number;
  tone?: "cobalt" | "outline" | "char" | "azure" | "white";
  className?: string;
}) {
  const n = typeof no === "number" ? no : CIRCLED.indexOf(no) + 1 || no;
  const tones = {
    cobalt: "bg-cobalt text-white",
    outline: "bg-white text-ink ring-[1.5px] ring-inset ring-ink-3",
    char: "bg-char text-white",
    azure: "bg-azure-5 text-cobalt ring-1 ring-inset ring-azure-3",
    white: "bg-white text-cobalt",
  } as const;
  return (
    <span
      className={cx("inline-grid shrink-0 place-items-center rounded-full font-display font-bold leading-none", tones[tone], className)}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.5) }}
    >
      {n}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 폴더 · 창                                                            */
/* ------------------------------------------------------------------ */

export interface FolderTab {
  label: ReactNode;
  onClick?: () => void;
  title?: string;
}

/* 앞면 탭 글자는 대비를 위해 하늘색 위에서는 차콜, 파란색 위에서는 흰색 */
const FOLDER_TONE = {
  azure: { body: "bg-azure", front: "bg-azure text-char", back: [["bg-cobalt", "text-white"], ["bg-cobalt-2", "text-white"], ["bg-cobalt-3", "text-white"]] },
  cobalt: { body: "bg-cobalt", front: "bg-cobalt text-white", back: [["bg-cobalt-2", "text-white"], ["bg-cobalt-3", "text-white"], ["bg-[#0e3a61]", "text-white"]] },
  paper: { body: "bg-white", front: "bg-white text-cobalt", back: [["bg-azure-4", "text-cobalt"], ["bg-beige", "text-ink-2"], ["bg-pebble-2", "text-ink-2"]] },
  beige: { body: "bg-beige", front: "bg-beige text-ink", back: [["bg-azure-4", "text-cobalt"], ["bg-pebble-2", "text-ink-2"], ["bg-azure-3", "text-cobalt"]] },
} as const;

function TabLabel({ label }: { label: ReactNode }) {
  return (
    <span className="flex h-full items-center gap-[14px] pl-[26px] pr-[56px] text-[18px] font-bold whitespace-nowrap">
      {label}
      <svg width="40" height="10" viewBox="0 0 40 10" aria-hidden className="shrink-0 opacity-80">
        <path d="M0 5h37M33 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

/**
 * 폴더. 첫 탭이 앞면에 붙고, 나머지 탭은 뒤쪽 폴더로 한 칸씩 올라가며 겹쳐 보인다.
 * 탭은 장·패키지처럼 실제로 구분되는 묶음에만 쓰고, onClick이 있으면 그 묶음으로 이동한다.
 */
export function Folder({
  tabs,
  tone = "azure",
  className,
  bodyClassName,
  children,
  tabWidth = 300,
  step = 14,
  ...rest
}: Omit<RevealProps, "children"> & {
  tabs: FolderTab[];
  tone?: keyof typeof FOLDER_TONE;
  bodyClassName?: string;
  children: ReactNode;
  tabWidth?: number;
  step?: number;
}) {
  const t = FOLDER_TONE[tone];
  const [front, ...back] = tabs;
  const order = back.map((_, i) => back.length - 1 - i);
  return (
    <Reveal className={cx("relative flex flex-col", className)} {...rest}>
      <div className="relative shrink-0" style={{ height: 54 + step * back.length }}>
        {order.map((i) => {
          const tab = back[i];
          const [bg, fg] = t.back[i % t.back.length];
          const clickable = Boolean(tab.onClick);
          return (
            <div key={i}>
              <div className={cx("absolute inset-x-0 bottom-0 rounded-tr-[28px]", bg)} style={{ height: step * (i + 1) + 1 }} />
              <button
                type="button"
                disabled={!clickable}
                onClick={tab.onClick}
                title={tab.title}
                className={cx(
                  "tab-shape absolute transition-transform duration-300 disabled:cursor-default",
                  bg,
                  fg,
                  clickable && "cursor-pointer hover:-translate-y-[6px]",
                )}
                style={{ left: (tabWidth - 34) * (i + 1), bottom: step * (i + 1), width: tabWidth, height: 50 }}
              >
                <TabLabel label={tab.label} />
              </button>
            </div>
          );
        })}
        <div className={cx("tab-shape absolute bottom-0 left-0", t.front)} style={{ width: tabWidth, height: 54 }}>
          <TabLabel label={front.label} />
        </div>
      </div>
      <div
        className={cx(
          "relative min-h-0 flex-1",
          back.length ? "rounded-[0_0_28px_28px]" : "rounded-[0_28px_28px_28px]",
          t.body,
          bodyClassName,
        )}
      >
        {children}
      </div>
    </Reveal>
  );
}

/** 브라우저 창 틀 — 실제 화면(상세페이지·대시보드)을 보여 줄 때만 */
export function BrowserFrame({
  title,
  right,
  className,
  bodyClassName,
  children,
}: {
  title?: ReactNode;
  right?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("flex flex-col overflow-hidden rounded-[22px] bg-white ring-[1.5px] ring-line", className)}>
      <div className="flex h-[46px] shrink-0 items-center gap-[8px] border-b border-line bg-cream-2 px-[18px]">
        <span className="size-[12px] rounded-full bg-stop" />
        <span className="size-[12px] rounded-full bg-wait" />
        <span className="size-[12px] rounded-full bg-go" />
        {title && <span className="ml-[14px] text-[15px] font-semibold text-ink-3">{title}</span>}
        {right && <span className="ml-auto">{right}</span>}
      </div>
      <div className={cx("min-h-0 flex-1", bodyClassName)}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 결론 · 결과물                                                         */
/* ------------------------------------------------------------------ */

/** '기회' 한 줄 — 카드 맨 아래 결론 */
export function Opp({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("flex items-start gap-[14px] rounded-[18px] bg-char px-[20px] py-[15px] text-white", className)}>
      <span className="mt-[2px] shrink-0 rounded-full bg-azure px-[12px] py-[2px] text-[15px] font-bold text-white">기회</span>
      <p className="text-[20px] font-semibold leading-[1.45]">{children}</p>
    </div>
  );
}

/** 뷰클린이 받는 결과물 */
export function Deliverable({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("rounded-[18px] bg-beige px-[22px] py-[15px]", className)}>
      <div className="flex items-center gap-[8px] text-[16px] font-bold text-ink">
        <PackageCheck className="size-[19px] text-cobalt" strokeWidth={2.2} />
        뷰클린이 받는 결과물
      </div>
      <p className="mt-[5px] text-[19.5px] leading-[1.5] text-ink-2">{children}</p>
    </div>
  );
}

/** 서비스 상세 장의 상품 이름 + 주기 */
export function ServiceTag({ no, name, meta }: { no: string; name: string; meta: string[] }) {
  return (
    <span className="inline-flex items-center gap-[12px]">
      <span className="inline-flex items-center gap-[10px] text-[22px] font-bold text-ink">
        <NumBadge no={no} size={30} />
        {name}
      </span>
      {meta.map((m) => (
        <Chip key={m} tone="outline" className="text-[16.5px]">
          {m}
        </Chip>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 로고                                                                 */
/* ------------------------------------------------------------------ */

/** GL AI STUDIO 심볼 (제안서 PDF 표지의 벡터) */
export function GLMark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 22.84 22.84" className={className} style={style} aria-hidden>
      <path d="M11.42 0A11.42 11.42 0 0 0 11.42 22.84Z" fill="currentColor" />
      <path
        d="M12.69 11.42H22.84C22.84 12.51 22.69 13.58 22.38 14.63C22.08 15.67 21.63 16.65 21.04 17.57C20.46 18.49 19.75 19.31 18.93 20.03C18.11 20.74 17.2 21.33 16.21 21.79V14.99C16.21 14.52 16.12 14.06 15.95 13.62C15.77 13.19 15.51 12.8 15.18 12.47C14.85 12.13 14.47 11.87 14.04 11.69C13.61 11.51 13.16 11.42 12.69 11.42Z"
        fill="currentColor"
      />
    </svg>
  );
}
