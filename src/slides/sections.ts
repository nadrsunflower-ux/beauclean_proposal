import type { ComponentType } from "react";

export type SectionId =
  | "opportunity"
  | "goal"
  | "work"
  | "ops"
  | "report"
  | "pricing"
  | "start"
  | "terms";

export interface Section {
  id: SectionId;
  no: string;
  /** 상단 탭에 쓰는 짧은 이름 */
  label: string;
  /** 제안서 원문의 장 제목 */
  title: string;
  /** 목차 설명 */
  desc: string;
}

export const SECTIONS: Section[] = [
  { id: "opportunity", no: "01", label: "기회", title: "뷰클린의 기회", desc: "이미 가진 자산과\n더 넓힐 수 있는 곳" },
  { id: "goal", no: "02", label: "목표", title: "목표와 성장 레버", desc: "6개월 매출 목표와\n7개 성장 레버" },
  { id: "work", no: "03", label: "하는 일", title: "우리가 하는 일", desc: "7개 서비스의\n수량과 결과물" },
  { id: "ops", no: "04", label: "운영", title: "운영 방식", desc: "요일별 루틴과\n첫 4주 일정" },
  { id: "report", no: "05", label: "리포트", title: "데이터 수집과 리포트", desc: "무엇을 재고\n어떻게 보고하는지" },
  { id: "pricing", no: "06", label: "가격", title: "가격", desc: "단품 가격과\n패키지 3단" },
  { id: "start", no: "07", label: "시작 준비", title: "시작하려면 필요한 것", desc: "권한 · 자료 ·\n협찬 제품" },
  { id: "terms", no: "08", label: "계약", title: "계약 조건", desc: "계약 조건과\n하지 않는 일" },
];

export const sectionById = (id: SectionId) => SECTIONS.find((s) => s.id === id)!;

export interface SlideDef {
  id: string;
  /** 접근성·전체 보기용 제목 */
  title: string;
  section?: SectionId;
  Component: ComponentType;
}

/** 머리줄 가운데에 보이는 지금 위치 */
export const headerLabel = (slide: SlideDef) => {
  if (!slide.section) return "스마트스토어 매출 성장 제안";
  const s = sectionById(slide.section);
  return `${s.no}  ${s.title}`;
};
