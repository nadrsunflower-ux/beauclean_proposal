"use client";

import type { ReactNode } from "react";
import { sectionById, type SectionId } from "@/slides/sections";
import { Reveal, SlideRoot, cx } from "./primitives";

interface SlideLayoutProps {
  section?: SectionId;
  /** 이 장의 작은 주제 (예: 이미 가진 자산) */
  eyebrow?: string;
  /** 이 장에서 전하려는 한 문장 */
  title: ReactNode;
  sub?: ReactNode;
  /** 제목 줄 오른쪽에 둘 요소 (조작부·요약 숫자 등) */
  aside?: ReactNode;
  /** 표가 많은 장은 제목을 줄여 본문 공간을 확보한다 */
  compact?: boolean;
  /** 장 아래쪽 출처·근거 메모 */
  foot?: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
}

/** 본문 장의 공통 틀: 작은 주제 → 핵심 문장 → 본문 → 출처 */
export function SlideLayout({ section, eyebrow, title, sub, aside, compact, foot, children, bodyClassName }: SlideLayoutProps) {
  const no = section ? sectionById(section).no : null;
  return (
    <SlideRoot className="flex flex-col px-[64px] pb-[18px] pt-[30px]">
      <div className="flex items-end justify-between gap-[40px]">
        <div className="min-w-0">
          {eyebrow && (
            <Reveal className="flex items-center gap-[12px] text-[17px] font-semibold text-ink-3">
              {no && <span className="font-display text-[18px] font-bold text-cobalt">{no}</span>}
              <span className="h-[2px] w-[28px] bg-azure" />
              {eyebrow}
            </Reveal>
          )}
          <Reveal
            className={cx(
              "font-display font-extrabold tracking-[-0.035em] text-ink",
              compact ? "mt-[10px] text-[42px] leading-[1.22]" : "mt-[12px] text-[50px] leading-[1.2]",
            )}
          >
            <h2>{title}</h2>
          </Reveal>
          {sub && <Reveal className={cx("text-ink-2", compact ? "mt-[8px] text-[20px]" : "mt-[12px] text-[22px]")}>{sub}</Reveal>}
        </div>
        {aside && <Reveal className="shrink-0">{aside}</Reveal>}
      </div>
      <div className={cx("relative min-h-0 flex-1", compact ? "mt-[24px]" : "mt-[28px]", bodyClassName)}>{children}</div>
      {foot && <Reveal className="mt-[12px] text-[15px] leading-[1.5] text-ink-3">{foot}</Reveal>}
    </SlideRoot>
  );
}
