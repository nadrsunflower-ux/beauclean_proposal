"use client";

import { motion } from "framer-motion";
import { Camera, Gift, Handshake, Megaphone, Monitor, ShoppingBag, Store } from "lucide-react";
import { usePackage } from "@/components/deck/selection";
import { Segmented } from "@/components/ui/interactive";
import { Card, DarkCard, Hl, IconCircle, Reveal, cx } from "@/components/ui/primitives";
import { SlideLayout } from "@/components/ui/SlideLayout";
import type { PackageId } from "./data";

/* ------------------------------------------------------------------ */
/* 07-1 권한 — 고른 패키지에 필요한 권한만 켜진다                             */
/* ------------------------------------------------------------------ */

type Need = "all" | "growth" | "full" | "optional";

const NEED_LABEL: Record<Need, string> = {
  all: "전체",
  growth: "그로스 · 풀 그로스",
  full: "풀 그로스",
  optional: "선택",
};

const PERMS: Array<{ icon: typeof Store; what: string; note?: string; why: string; need: Need; key?: boolean }> = [
  { icon: Store, what: "스마트스토어 판매자센터 매니저 초대", why: "매출·유입·리뷰·재구매 숫자 확인. 저장·발송은 승인 후에만", need: "all" },
  { icon: Camera, what: "인스타그램 @beaucleanskin 업로드 권한, 유튜브 채널 관리자", why: "영상 업로드, 영상별 성과 확인", need: "all" },
  { icon: Megaphone, what: "네이버 검색광고 계정 구성원 초대", note: "대행권 이관 없이", why: "광고 운영. 이관하지 않아야 5% 비즈쿠폰이 유지됩니다", need: "growth", key: true },
  { icon: Handshake, what: "브랜드커넥트(쇼핑 커넥트) 화면 접근", why: "커넥트 사용료·창작자 판매 확인", need: "growth" },
  { icon: ShoppingBag, what: "쿠팡 Wing 부계정 + 광고센터 열람", why: "상품 정비, 광고, 리뷰 이벤트, 행사 신청, 링크별 매출", need: "full" },
  { icon: Monitor, what: "자사몰 부운영자", why: "재고·가격을 스토어와 맞춰 보기", need: "optional" },
];

const needed = (need: Need, pkg: PackageId) =>
  need === "all" || (need === "growth" && pkg !== "start") || (need === "full" && pkg === "full");

/** 상태만 보여 주는 스위치 (누를 수 없음) */
function SwitchView({ on }: { on: boolean }) {
  return (
    <span aria-hidden className={cx("relative inline-block h-[34px] w-[58px] shrink-0 rounded-full transition-colors duration-300", on ? "bg-azure" : "bg-pebble")}>
      <motion.span
        className="absolute top-[3px] size-[28px] rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.22)]"
        initial={false}
        animate={{ left: on ? 27 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
      />
    </span>
  );
}

const PERM_COLS = "grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_190px_120px]";

export function StartPermissions() {
  const [pkg, setPkg] = usePackage();
  const count = PERMS.filter((p) => needed(p.need, pkg)).length;
  return (
    <SlideLayout
      section="start"
      eyebrow="권한"
      compact
      title={
        <>
          시작 회의 때 화면을 함께 보며 <Hl>권한 초대를 30분 안에</Hl> 끝냅니다
        </>
      }
      sub={
        <>
          패키지를 고르면 필요한 권한만 켜집니다 · 지금 <b className="text-ink">{count}개</b> · 계약이 끝나는 날 모두 돌려드립니다
        </>
      }
      aside={
        <Segmented<PackageId>
          label="패키지 고르기"
          value={pkg}
          onChange={setPkg}
          options={[
            { value: "start", label: "스타트" },
            { value: "growth", label: "그로스" },
            { value: "full", label: "풀 그로스" },
          ]}
        />
      }
    >
      <Card className="flex h-full flex-col overflow-hidden">
        <div className={cx("grid items-center gap-[24px] bg-cream-2 px-[30px] py-[12px] text-[16px] font-bold text-ink-3", PERM_COLS)}>
          <span>무엇</span>
          <span>왜</span>
          <span className="text-center">해당 패키지</span>
          <span className="text-center">필요</span>
        </div>
        <div className="flex flex-1 flex-col">
          {PERMS.map((p) => {
            const on = needed(p.need, pkg);
            return (
              <Reveal
                key={p.what}
                y={8}
                className={cx(
                  "grid flex-1 items-center gap-[24px] border-b border-line px-[30px] py-[8px] transition-opacity duration-300 last:border-b-0",
                  PERM_COLS,
                  !on && "opacity-45",
                )}
              >
                <span className="flex items-center gap-[16px]">
                  <IconCircle icon={p.icon} size={46} tone={p.key ? "cobalt" : "soft"} />
                  <span className="text-[19.5px] font-bold leading-[1.4] text-ink">
                    {p.what}
                    {p.note && (
                      <span className="ml-[8px] inline-block rounded-full bg-cobalt px-[10px] py-[1px] align-middle text-[14px] font-bold text-white">{p.note}</span>
                    )}
                  </span>
                </span>
                <span className={cx("text-[18px] leading-[1.45]", p.key ? "font-semibold text-cobalt" : "text-ink-2")}>{p.why}</span>
                <span className="flex justify-center">
                  <span
                    className={cx(
                      "rounded-full px-[14px] py-[4px] text-[15px] font-bold whitespace-nowrap",
                      p.need === "all" ? "bg-char text-white" : p.need === "optional" ? "bg-cream-2 text-ink-3" : "bg-azure-5 text-cobalt ring-1 ring-inset ring-azure-4",
                    )}
                  >
                    {NEED_LABEL[p.need]}
                  </span>
                </span>
                <span className="flex justify-center">
                  {p.need === "optional" ? <span className="text-[15px] font-bold text-ink-3">원하면</span> : <SwitchView on={on} />}
                </span>
              </Reveal>
            );
          })}
        </div>
      </Card>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 07-2 자료 + 협찬 제품                                                  */
/* ------------------------------------------------------------------ */

const DOCS: Array<{ doc: string; use: string }> = [
  { doc: "원가표: 상품·옵션별 매입가, 포장비, 택배 단가, 쿠팡 입고·보관비", use: "2팩·대용량 가격, 무료배송 기준, 손익분기 ROAS" },
  { doc: "최근 12개월 채널별 월 매출·주문 수, 상품별 매출 상위 20", use: "목표를 실제 금액으로 다시 계산" },
  { doc: "재구매율(90일), 정기구독 수, 마케팅 메시지 발송 이력", use: "재구매 레버 설계" },
  { doc: "최근 3개월 광고비·ROAS(네이버·쿠팡)", use: "광고 시작점" },
  { doc: "쿠팡 판매 방식(직매입 / 로켓그로스 / 판매자 배송)과 판매자명", use: "행사 대상 여부, 가격을 누가 정하는지" },
  { doc: "재고·입고 예정일(특히 품절 사이즈), 최소 발주량", use: "옵션 정리, 새 구성" },
  { doc: "제품 정보: 소재 혼용률, 평량(g), 멸균 방식·시험기관·날짜(시험성적서), 사이즈별 실측 cm", use: "상세 첫 화면, 영상 문구" },
  { doc: "제품 사진·영상 원본, 고객 문의 상위 유형", use: "영상·상세 소재" },
];

export function StartMaterials() {
  const [pkg] = usePackage();
  /* 협찬 제품은 시딩에만 쓴다. 시딩은 그로스부터 들어간다 */
  const sponsor: Array<{ ids: PackageId[]; head: string; qty: string; body: string }> = [
    { ids: ["growth", "full"], head: "그로스 · 풀 그로스", qty: "약 20세트", body: "시딩용. 여성 팬티 2팩 또는 남녀 1팩씩" },
    { ids: ["start"], head: "스타트", qty: "없음", body: "시딩이 들어 있지 않은 패키지입니다" },
  ];
  return (
    <SlideLayout
      section="start"
      eyebrow="자료 · 협찬 제품"
      compact
      title={
        <>
          자료는 <Hl>1번 원가표</Hl>가 가장 먼저 필요합니다
        </>
      }
      sub="원가표가 있어야 묶음 가격·무료배송 기준·광고 손익분기를 정할 수 있습니다"
    >
      <div className="grid h-full grid-cols-[1fr_440px] gap-[24px]">
        <Card className="flex flex-col overflow-hidden">
          <div className="grid grid-cols-[52px_minmax(0,1.35fr)_minmax(0,1fr)] gap-[20px] bg-cream-2 px-[28px] py-[12px] text-[16px] font-bold text-ink-3">
            <span className="text-center">순서</span>
            <span>자료</span>
            <span>어디에 쓰나</span>
          </div>
          <div className="flex flex-1 flex-col">
            {DOCS.map((d, i) => (
              <Reveal
                key={d.doc}
                y={8}
                className={cx(
                  "grid flex-1 grid-cols-[52px_minmax(0,1.35fr)_minmax(0,1fr)] items-center gap-[20px] border-b border-line px-[28px] py-[6px] last:border-b-0",
                  i === 0 && "bg-azure-5",
                )}
              >
                <span
                  className={cx(
                    "mx-auto grid size-[36px] place-items-center rounded-full font-display text-[18px] font-bold",
                    i === 0 ? "bg-cobalt text-white" : "bg-pebble-2 text-ink-2",
                  )}
                >
                  {i + 1}
                </span>
                <span className={cx("text-[18px] leading-[1.45]", i === 0 ? "font-bold text-ink" : "font-semibold text-ink")}>
                  {d.doc}
                  {i === 0 && <span className="ml-[8px] inline-block rounded-full bg-cobalt px-[9px] py-[1px] align-middle text-[13px] font-bold text-white">가장 먼저</span>}
                </span>
                <span className="text-[17px] leading-[1.45] text-ink-2">{d.use}</span>
              </Reveal>
            ))}
          </div>
        </Card>

        <DarkCard title="협찬 제품 (매월)" className="h-full" bodyClassName="flex flex-col gap-[12px]">
          <p className="text-[16.5px] leading-[1.5] text-white/70">인플루언서 시딩에 보내는 제품입니다. 지금 고른 패키지가 밝게 표시됩니다.</p>
          {sponsor.map((x) => {
            const on = x.ids.includes(pkg);
            return (
              <div
                key={x.head}
                className={cx("flex flex-1 flex-col justify-center rounded-[18px] px-[22px] py-[14px] transition-colors duration-300", on ? "bg-azure text-char" : "bg-white/8")}
              >
                <div className={cx("flex items-center gap-[8px] text-[17px] font-bold", on ? "text-char" : "text-azure-2")}>
                  <Gift className="size-[18px]" strokeWidth={2.3} />
                  {x.head}
                  {on && <span className="ml-auto rounded-full bg-char px-[10px] py-[1px] text-[13px] text-white">고른 패키지</span>}
                </div>
                <div className="mt-[2px] font-display text-[44px] font-extrabold tracking-[-0.03em]">{x.qty}</div>
                <p className={cx("text-[17px] leading-[1.45]", on ? "text-char/80" : "text-white/75")}>{x.body}</p>
              </div>
            );
          })}
        </DarkCard>
      </div>
    </SlideLayout>
  );
}
