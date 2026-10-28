import type { ReactNode } from "react";
import { Ev } from "@/components/ui/primitives";

/** 6개월 시나리오 — 현재 월 매출을 100으로 놓은 계획값 */
export const SCENARIOS: Array<{
  name: string;
  value: number;
  mult: string;
  when: string;
  includes?: string[];
  conditions?: string[];
}> = [
  { name: "현재", value: 100, mult: "기준", when: "지금의 월 매출을 100으로 놓았습니다." },
  {
    name: "보수",
    value: 120,
    mult: "1.2배",
    when: "광고 정비·쿠팡 기본기·리뷰 장치만 효과를 낼 때",
    includes: ["광고 정비", "쿠팡 기본기", "리뷰 장치"],
  },
  {
    name: "기본",
    value: 156,
    mult: "약 1.6배",
    when: "위에 더해 묶음 구성·출산 상품·외부 유입이 계획대로 붙을 때",
    includes: ["광고 정비", "쿠팡 기본기", "리뷰 장치", "묶음 구성", "출산 상품", "외부 유입"],
  },
  {
    name: "도전",
    value: 218,
    mult: "약 2.2배",
    when: "아래 세 조건 중 둘 이상이 맞을 때",
    conditions: [
      "쿠팡 매출이 지금의 4~5배로 자란다",
      "인플루언서·숏폼·쇼핑 커넥트 매출이 전체의 15% 가까이 된다",
      "재구매율이 높게 나와, 광고를 키워도 이익이 남는다",
    ],
  },
];

/** 성장 레버 7개 — 기본 시나리오의 6개월 기여 */
export const LEVERS: Array<{ no: string; name: string; v: number; what: string; why: ReactNode }> = [
  {
    no: "①",
    name: "쿠팡",
    v: 20,
    what: "리뷰 100개 만들기, 검색어 20개·옵션 정리, 네이버와 가격 맞추기, 광고, 새 구성 추가",
    why: (
      <>
        쿠팡 발표: 7월 와우 행사 매출 +124%(전년 같은 행사 대비), 검색어 15개 이상 등록 시 노출 1.8배 <Ev k="확인" />
      </>
    ),
  },
  {
    no: "②",
    name: "네이버 광고 정비",
    v: 12,
    what: "쇼핑검색·파워링크 구조 정리, 제외 검색어, 콘텐츠 지면",
    why: (
      <>
        네이버 발표: 쇼핑검색 단독 대비 광고 4종 조합 거래액 +57.2% <Ev k="확인" />. 이미 켜 둔 광고가 있어 그 절반 아래로 반영
      </>
    ),
  },
  {
    no: "③",
    name: "외부 유입",
    v: 6,
    what: "AI 숏폼 영상, 인플루언서 시딩, 쇼핑 커넥트",
    why: (
      <>
        커넥트 거래액 비중 4~15% <Ev k="확인" />
      </>
    ),
  },
  {
    no: "④",
    name: "리뷰·재구매",
    v: 5,
    what: "리뷰 이벤트, 알림받기 쿠폰, 마케팅 메시지, 정기구독 회차 할인",
    why: (
      <>
        네이버 발표: 리뷰가 한 달에 2배가 되면 매출 최대 +9.6% <Ev k="확인" />
      </>
    ),
  },
  {
    no: "⑤",
    name: "객단가",
    v: 5,
    what: "2팩 무료배송, 남녀 세트, 대용량 계단(100·300·500·1,000장)",
    why: (
      <>
        대용량 1,000장 구성도 실제 구매가 일어남(동종 판매자 관찰) <Ev k="확인" />
      </>
    ),
  },
  {
    no: "⑥",
    name: "출산·산모 새 칸",
    v: 5,
    what: "산모용 구성 상품 + 출산 검색어 광고",
    why: (
      <>
        1면 경쟁 리뷰 25~272개 <Ev k="확인" />. 검색량은 시작 후 측정
      </>
    ),
  },
  {
    no: "⑦",
    name: "원장님(B2B) 구성",
    v: 3,
    what: "샘플팩 → 대용량 정기구독, 샵 위생 세트",
    why: (
      <>
        원장님들은 &lsquo;네일재료·왁싱재료&rsquo;처럼 &lsquo;재료&rsquo;로 검색 <Ev k="확인" />
      </>
    ),
  },
];

/** 패키지 3단 */
export type PackageId = "start" | "growth" | "full";

export const PACKAGES: Array<{
  id: PackageId;
  en: string;
  name: string;
  price: number;
  list: number;
  save: string;
  plus: string | null;
  items: string[];
  when: string;
}> = [
  {
    id: "start",
    en: "START",
    name: "스타트",
    price: 150,
    list: 150,
    save: "기본 상품 그대로",
    plus: null,
    items: ["AI 숏폼 콘텐츠 월 8편", "인스타그램·유튜브 업로드", "월간 성과 리포트 + 월 1회 리뷰"],
    when: "콘텐츠부터 시작해 반응을 보고 싶을 때",
  },
  {
    id: "growth",
    en: "GROWTH",
    name: "그로스",
    price: 270,
    list: 290,
    save: "20만 원 할인 (약 7%)",
    plus: "스타트 전부",
    items: ["인플루언서 시딩 월 20명", "네이버 광고 운영", "주간 경쟁사·시장 동향 리포트"],
    when: "네이버 매출을 콘텐츠·인플루언서·광고로 함께 키울 때",
  },
  {
    id: "full",
    en: "FULL GROWTH",
    name: "풀 그로스",
    price: 350,
    list: 370,
    save: "20만 원 할인 (약 5%)",
    plus: "그로스 전부",
    items: ["쿠팡 운영·광고", "리뷰·재구매 관리"],
    when: "쿠팡까지 두 채널을 같이 키워 2배에 도전할 때",
  },
];
