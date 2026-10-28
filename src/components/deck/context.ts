"use client";

import { createContext, useContext } from "react";
import type { SectionId } from "@/slides/sections";

export interface DeckApi {
  /** 슬라이드 번호(0부터)로 이동 */
  go: (index: number) => void;
  /** 슬라이드 id로 이동 */
  goTo: (slideId: string) => void;
  /** 장별 첫·끝 쪽 번호 (1부터) */
  pages: Partial<Record<SectionId, [number, number]>>;
  /** 전체 장 수 */
  total: number;
  /** true면 애니메이션 없이 최종 상태로 그린다 (전체 보기용) */
  isStatic: boolean;
}

export const DeckContext = createContext<DeckApi>({
  go: () => {},
  goTo: () => {},
  pages: {},
  total: 0,
  isStatic: false,
});

export const useDeck = () => useContext(DeckContext);
