"use client";

import { motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { usePackage } from "@/components/deck/selection";
import { Card, Chip, CountUp, EASE, Hl, Reveal, cx } from "@/components/ui/primitives";
import { SlideLayout } from "@/components/ui/SlideLayout";
import { PACKAGES, type PackageId } from "./data";

/* ------------------------------------------------------------------ */
/* 06-1 단품 가격                                                         */
/* ------------------------------------------------------------------ */

const UNIT_PRICES: Array<{ name: string; base?: boolean; unit: string; incl: string; price: number; cost: string }> = [
  { name: "AI 숏폼 콘텐츠", base: true, unit: "월 8편", incl: "제작, 인스타그램·유튜브 업로드, 월간 성과 리포트, 월 1회 30분 리뷰", price: 150, cost: "—" },
  { name: "인플루언서 시딩", unit: "월 20명 (주 5명)", incl: "발굴·섭외·발송 관리·게시 확인·2차 활용 정리", price: 60, cost: "1인당 제품·배송 포함 10만 원 이내, 사전 승인" },
  { name: "네이버 광고 운영", unit: "월", incl: "쇼핑검색·파워링크·ADVoost, 주 2회 점검, 직접 운영 혜택(5% 비즈쿠폰) 유지", price: 50, cost: "광고비" },
  { name: "쿠팡 운영·광고", unit: "월", incl: "상품 정비, 광고, 리뷰 이벤트, 무료노출 프로모션 신청, 성과 추적 링크", price: 50, cost: "광고비, 리뷰 이벤트 비용, 할인액" },
  { name: "스마트스토어 최적화 세팅", unit: "1회", incl: "대표 3개 상품: 상품명·태그·옵션·묶음/무료배송 구조·상세 첫 화면·리뷰 정책", price: 80, cost: "—" },
  { name: "리뷰·재구매 관리", unit: "월", incl: "리뷰 답글 주 3회, 리뷰 이벤트, 알림받기 쿠폰, 마케팅 메시지 월 2회", price: 30, cost: "리뷰 적립금, 쿠폰 할인액" },
  { name: "주간 경쟁사·시장 동향 리포트", unit: "월 (매주 1회)", incl: "경쟁 상품 10개·검색어 30개·행사·정책 변경", price: 30, cost: "—" },
];

const PRICE_COLS = "grid-cols-[316px_168px_minmax(0,1fr)_132px_minmax(0,290px)]";

export function PricingUnits() {
  return (
    <SlideLayout
      section="pricing"
      eyebrow="단품 가격"
      compact
      title={
        <>
          모든 금액은 <Hl>제안가 · 부가세 별도</Hl>입니다
        </>
      }
      sub="광고비·제품비·배송비 같은 실비는 대행료와 따로이며, 광고비는 뷰클린 계정에서 직접 결제합니다"
      foot={
        <>
          시딩 실비: 제품만 보낼 때는 1인당 제품(예: 팬티 2팩)과 택배비만 듭니다. 상한 10만 원은 소액 원고료나 세트 구성이 붙을 때를 위한 것으로, 쓰기 전에
          매번 승인받습니다.
        </>
      }
    >
      <Card className="flex h-full flex-col overflow-hidden">
        <div className={cx("grid items-center gap-[20px] bg-cream-2 px-[30px] py-[11px] text-[15px] font-bold text-ink-3", PRICE_COLS)}>
          <span>상품</span>
          <span>단위</span>
          <span>포함</span>
          <span className="text-right">제안가</span>
          <span>실비 (별도)</span>
        </div>
        <div className="flex flex-1 flex-col">
          {UNIT_PRICES.map((p) => (
            <Reveal
              key={p.name}
              y={8}
              className={cx(
                "grid flex-1 items-center gap-[20px] border-b border-line px-[30px] transition-colors hover:bg-azure-5",
                PRICE_COLS,
                p.base && "bg-cream-2/60",
              )}
            >
              <span className="flex items-center gap-[8px] text-[19.5px] font-bold text-ink">
                {p.name}
                {p.base && <span className="rounded-[6px] bg-char px-[7px] py-[1px] text-[12px] font-bold text-white">기본</span>}
              </span>
              <span className="text-[16.5px] font-semibold text-ink-3">{p.unit}</span>
              <span className="text-[16.5px] leading-[1.4] text-ink-2">{p.incl}</span>
              <span className="text-right font-display text-[26px] font-bold tracking-[-0.02em] text-ink">
                {p.price}
                <span className="ml-[2px] font-sans text-[15px] font-bold text-ink-3">만 원</span>
              </span>
              <span className={cx("text-[15.5px] leading-[1.4]", p.cost === "—" ? "text-ink-4" : "text-ink-2")}>{p.cost}</span>
            </Reveal>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-[16px] bg-char px-[30px] py-[13px] text-[16.5px] leading-[1.45] text-white/85">
          <p>
            <b className="text-white">스마트스토어 최적화 세팅</b>(1회 80만 원)은 어느 패키지에든 더할 수 있습니다.
          </p>
          <p>
            패키지는 <b className="text-white">월 단위로 올리거나 내릴 수 있습니다</b>(다음 달부터 적용).
          </p>
        </div>
      </Card>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 06-2 패키지 3단 — 패키지는 서비스를 묶은 폴더                              */
/* ------------------------------------------------------------------ */

export function PricingPackages() {
  const [sel, setSel] = usePackage();
  return (
    <SlideLayout
      section="pricing"
      eyebrow="패키지 3단"
      title={
        <>
          패키지는 <Hl>3단</Hl>, 월 단위로 올리거나 내릴 수 있습니다
        </>
      }
      sub="월 · 제안가 · 부가세 별도 · 고른 패키지는 다음 장의 구성 비교와 필요한 권한에도 이어집니다"
      foot="실비(광고비·제품·배송비·리뷰 이벤트 비용)는 모든 패키지에서 별도입니다. 협찬 제품(시딩용)은 그로스·풀 그로스 모두 월 약 20세트가 듭니다. 패키지 변경은 다음 달부터 적용됩니다."
    >
      <div className="grid h-full grid-cols-3 gap-[26px]">
        {PACKAGES.map((p, i) => {
          const on = p.id === sel;
          return (
            <Reveal key={p.id} className="flex h-full flex-col">
              <button type="button" onClick={() => setSel(p.id)} aria-pressed={on} className="group flex h-full cursor-pointer flex-col text-left">
                {/* 폴더 탭 */}
                <motion.div
                  className={cx("tab-shape h-[54px] w-[270px] shrink-0 transition-colors duration-300", on ? "bg-cobalt text-white" : "bg-beige text-ink-2 group-hover:bg-azure-4")}
                  initial={false}
                  animate={{ y: on ? 0 : 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <span className="flex h-full items-center gap-[10px] pl-[26px] font-display text-[17px] font-bold tracking-[0.2em]">{p.en}</span>
                </motion.div>
                <motion.div
                  className={cx(
                    "relative flex flex-1 flex-col rounded-[0_28px_28px_28px] px-[38px] pb-[28px] pt-[28px] transition-colors duration-300",
                    on ? "bg-cobalt text-white" : "bg-white text-ink ring-[1.5px] ring-inset ring-line group-hover:ring-azure-3",
                  )}
                  initial={false}
                  animate={{ y: on ? 0 : 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <div className="text-[30px] font-bold">{p.name}</div>
                  <div className="mt-[10px] flex items-baseline gap-[6px]">
                    <CountUp value={p.price} delay={0.45 + i * 0.12} className="font-display text-[88px] font-extrabold leading-none tracking-[-0.05em]" />
                    <span className="text-[26px] font-bold">만 원</span>
                    <span className={cx("text-[19px] font-semibold", on ? "text-white/70" : "text-ink-3")}>/월</span>
                  </div>
                  <div className="mt-[10px] flex h-[32px] items-center gap-[10px] text-[17px]">
                    {p.list > p.price ? (
                      <>
                        <span className={cx("line-through", on ? "text-white/60" : "text-ink-3")}>단품 합계 {p.list}만 원</span>
                        <span className={cx("rounded-full px-[11px] py-[2px] font-bold", on ? "bg-azure text-char" : "bg-cobalt text-white")}>{p.save}</span>
                      </>
                    ) : (
                      <span className={on ? "text-white/70" : "text-ink-3"}>단품 합계 150만 원 · {p.save}</span>
                    )}
                  </div>
                  <div className={cx("my-[20px] h-px", on ? "bg-white/25" : "bg-line")} />
                  <ul className="space-y-[14px]">
                    {p.plus && (
                      <li className="flex items-center gap-[10px] text-[22px] font-bold">
                        <Plus className={cx("size-[21px]", on ? "text-azure-2" : "text-cobalt")} strokeWidth={3} />
                        {p.plus}
                      </li>
                    )}
                    {p.items.map((it) => (
                      <li key={it} className={cx("flex items-center gap-[10px] text-[22px]", on ? "text-white/95" : "text-ink-2")}>
                        <Check className={cx("size-[21px] shrink-0", on ? "text-azure-2" : "text-cobalt")} strokeWidth={3} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className={cx("mt-auto rounded-[18px] px-[20px] py-[15px] text-[19px] font-semibold leading-[1.5]", on ? "bg-white/12" : "bg-cream-2 text-ink")}>
                    <span className={cx("mr-[8px] text-[15px] font-bold", on ? "text-azure-2" : "text-cobalt")}>이럴 때</span>
                    {p.when}
                  </div>
                </motion.div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 06-3 패키지 구성 비교 — 열을 누르면 그 패키지가 강조된다                    */
/* ------------------------------------------------------------------ */

const MATRIX: Array<{ name: string; s: boolean; g: boolean; f: boolean; price: number }> = [
  { name: "AI 숏폼 콘텐츠 월 8편 + 월간 성과 리포트", s: true, g: true, f: true, price: 150 },
  { name: "인플루언서 시딩 월 20명", s: false, g: true, f: true, price: 60 },
  { name: "네이버 광고 운영", s: false, g: true, f: true, price: 50 },
  { name: "주간 경쟁사·시장 동향 리포트", s: false, g: true, f: true, price: 30 },
  { name: "쿠팡 운영·광고", s: false, g: false, f: true, price: 50 },
  { name: "리뷰·재구매 관리", s: false, g: false, f: true, price: 30 },
];

const MATRIX_COLS = "grid-cols-[minmax(0,1fr)_210px_210px_210px_140px]";
const COL_KEYS: Array<{ id: PackageId; label: string; key: "s" | "g" | "f" }> = [
  { id: "start", label: "스타트", key: "s" },
  { id: "growth", label: "그로스", key: "g" },
  { id: "full", label: "풀 그로스", key: "f" },
];

function Dot({ on, active }: { on: boolean; active: boolean }) {
  return on ? (
    <span
      className={cx(
        "mx-auto grid size-[34px] place-items-center rounded-full transition-colors duration-300",
        active ? "bg-cobalt text-white" : "bg-azure-4 text-cobalt",
      )}
    >
      <Check className="size-[19px]" strokeWidth={3.2} />
    </span>
  ) : (
    <span className="mx-auto grid size-[34px] place-items-center text-ink-4">
      <Minus className="size-[18px]" strokeWidth={3} />
    </span>
  );
}

export function PricingCompare() {
  const [sel, setSel] = usePackage();
  const totals = { start: "150만", growth: "270만", full: "350만" } as const;
  const lists = { start: null, growth: "290만", full: "370만" } as const;
  return (
    <SlideLayout
      section="pricing"
      eyebrow="패키지 구성 비교"
      compact
      title={
        <>
          패키지별로 <Hl>무엇이 들어가는지</Hl> 비교합니다
        </>
      }
      sub="패키지 이름을 누르면 그 열이 강조됩니다"
    >
      <Card className="relative flex h-full flex-col overflow-hidden">
        {/* 고른 열의 바탕 */}
        <motion.div
          className="pointer-events-none absolute bottom-0 top-0 w-[210px] bg-azure-5"
          initial={false}
          animate={{ right: 34 + 140 + 16 + (2 - COL_KEYS.findIndex((c) => c.id === sel)) * (210 + 16) }}
          transition={{ type: "spring", stiffness: 380, damping: 36 }}
        />
        <div className={cx("relative grid items-center gap-[16px] bg-cream-2/70 px-[34px] py-[12px] text-[18px] font-bold text-ink-3", MATRIX_COLS)}>
          <span>항목</span>
          {COL_KEYS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSel(c.id)}
              aria-pressed={sel === c.id}
              className={cx(
                "mx-auto cursor-pointer rounded-full px-[18px] py-[6px] transition-colors",
                sel === c.id ? "bg-cobalt text-white" : "hover:bg-white hover:text-cobalt",
              )}
            >
              {c.label}
            </button>
          ))}
          <span className="text-right">단품가</span>
        </div>
        <div className="relative flex flex-1 flex-col">
          {MATRIX.map((m) => (
            <Reveal key={m.name} y={8} className={cx("relative grid flex-1 items-center gap-[16px] border-b border-line px-[34px] py-[6px]", MATRIX_COLS)}>
              <span className={cx("text-[21px] font-semibold transition-colors", m[COL_KEYS.find((c) => c.id === sel)!.key] ? "text-ink" : "text-ink-4")}>{m.name}</span>
              {COL_KEYS.map((c) => (
                <Dot key={c.id} on={m[c.key]} active={sel === c.id} />
              ))}
              <span className="text-right font-display text-[22px] font-bold text-ink-2">{m.price}만</span>
            </Reveal>
          ))}
        </div>
        <div className={cx("relative grid items-center gap-[16px] bg-char px-[34px] py-[16px] text-white", MATRIX_COLS)}>
          <span className="text-[19px] font-bold">단품 합계 → 패키지 제안가</span>
          {COL_KEYS.map((c) => (
            <span key={c.id} className={cx("text-center font-display text-[26px] font-bold transition-colors", sel === c.id ? "text-azure-2" : "text-white")}>
              {lists[c.id] && <span className="mr-[6px] text-[17px] font-semibold text-white/50 line-through">{lists[c.id]}</span>}
              {totals[c.id]}
            </span>
          ))}
          <span />
        </div>
        <div className="relative flex items-center gap-[12px] px-[34px] py-[12px] text-[17px] text-ink-2">
          <Chip tone="azure">모든 패키지에 더할 수 있음</Chip>
          스마트스토어 최적화 세팅 1회 80만 원
        </div>
      </Card>
    </SlideLayout>
  );
}
