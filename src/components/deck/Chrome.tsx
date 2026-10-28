"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize } from "lucide-react";
import type { ReactNode } from "react";
import { EASE, GLMark, cx } from "@/components/ui/primitives";
import { SECTIONS, type SectionId } from "@/slides/sections";

export const STAGE_W = 1920;
export const STAGE_H = 1080;
export const HEADER_H = 76;
export const FOOTER_H = 64;

/** 슬라이드 본문이 그려지는 영역 */
export const CONTENT_BOX = { left: 0, right: 0, top: HEADER_H, bottom: FOOTER_H } as const;

export function Backdrop() {
  return <div className="pointer-events-none absolute inset-0 bg-cream" />;
}

/* ------------------------------------------------------------------ */
/* 머리줄: 문서 이름 · 지금 장 · 쪽수. 밑줄이 진행 막대를 겸한다.           */
/* ------------------------------------------------------------------ */

export function Header({
  label,
  index,
  total,
  isStatic,
}: {
  label: string;
  index: number;
  total: number;
  isStatic?: boolean;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="absolute inset-x-0 top-0" style={{ height: HEADER_H }}>
      <div className="flex h-full items-center px-[64px] pb-[2px]">
        <div className="flex w-[520px] items-center gap-[12px]">
          <GLMark className="size-[24px] text-cobalt" />
          <span className="text-[15px] font-bold tracking-[0.16em] text-ink">GL AI STUDIO</span>
          <span className="text-[15px] font-medium text-ink-4">×</span>
          <span className="text-[15px] font-bold tracking-[0.16em] text-ink-2">BEAUCLEAN</span>
        </div>
        <div className="relative flex-1 text-center">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={label}
              className="inline-block text-[16px] font-semibold text-ink-2"
              initial={isStatic ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="w-[520px] text-right font-display text-[18px] text-ink-2">
          <span className="num">{pad(index + 1)}</span>
          <span className="font-bold text-ink">({total})</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-rule/70" />
      <motion.div
        className="absolute bottom-[-1px] left-0 h-[3px] bg-cobalt"
        initial={false}
        animate={{ width: `${((index + 1) / total) * 100}%` }}
        transition={{ duration: isStatic ? 0 : 0.5, ease: EASE }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 바닥: 8개 장이 아래에서 올라온 폴더 탭 + 이동 버튼                       */
/* ------------------------------------------------------------------ */

function IconButton({ label, onClick, disabled, children }: { label: string; onClick?: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-[38px] cursor-pointer place-items-center rounded-full text-ink-2 transition-colors hover:bg-beige hover:text-cobalt disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

export function Footer({
  section,
  onSection,
  index,
  total,
  onPrev,
  onNext,
  onOverview,
  onFullscreen,
  isStatic,
}: {
  section?: SectionId;
  onSection?: (id: SectionId) => void;
  index: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
  onOverview?: () => void;
  onFullscreen?: () => void;
  isStatic?: boolean;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0" style={{ height: FOOTER_H }}>
      <nav aria-label="장 이동" className="absolute bottom-0 left-[64px] flex items-end">
        {SECTIONS.map((s, i) => {
          const active = s.id === section;
          return (
            <motion.button
              key={s.id}
              type="button"
              disabled={isStatic}
              onClick={() => onSection?.(s.id)}
              aria-current={active ? "true" : undefined}
              className={cx(
                "tab-shape group relative -ml-[16px] w-[168px] cursor-pointer text-left first:ml-0 disabled:cursor-default",
                active ? "bg-cobalt text-white" : "bg-beige text-ink-2 hover:bg-azure-4 hover:text-cobalt",
              )}
              style={{ zIndex: active ? 30 : 20 - i }}
              initial={false}
              animate={{ height: active ? 50 : 40 }}
              transition={{ duration: isStatic ? 0 : 0.3, ease: EASE }}
            >
              <span className="flex h-full items-center gap-[8px] pl-[20px] pr-[40px] text-[15px] whitespace-nowrap">
                <span className={cx("font-display font-bold", active ? "text-azure-3" : "text-ink-3 group-hover:text-cobalt")}>{s.no}</span>
                <span className="font-semibold">{s.label}</span>
              </span>
            </motion.button>
          );
        })}
      </nav>
      {!isStatic && (
        <div className="absolute bottom-[12px] right-[56px] flex items-center gap-[2px]">
          <IconButton label="전체 보기 (G)" onClick={onOverview}>
            <LayoutGrid className="size-[19px]" strokeWidth={2.1} />
          </IconButton>
          <IconButton label="이전 (←)" onClick={onPrev} disabled={index === 0}>
            <ChevronLeft className="size-[21px]" strokeWidth={2.3} />
          </IconButton>
          <IconButton label="다음 (→)" onClick={onNext} disabled={index === total - 1}>
            <ChevronRight className="size-[21px]" strokeWidth={2.3} />
          </IconButton>
          <IconButton label="전체 화면 (F)" onClick={onFullscreen}>
            <Maximize className="size-[18px]" strokeWidth={2.1} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
