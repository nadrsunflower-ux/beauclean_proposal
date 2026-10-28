"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell, CalendarCheck, Camera, CirclePlay, KeyRound, ShoppingBag, Star, Store, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { useDeck } from "@/components/deck/context";
import { CountUp, EASE, EV_DOT, Folder, Group, Hl, Reveal, SlideRoot, cx, type EvidenceKind } from "@/components/ui/primitives";
import { SECTIONS } from "./sections";

/* ------------------------------------------------------------------ */
/* 표지                                                                 */
/* 겹친 폴더 3개 = 넓힐 세 방향(쿠팡·새 검색어·더 큰 장바구니)                */
/* 다크 카드 = 이미 쌓아 둔 신뢰                                           */
/* ------------------------------------------------------------------ */

/** 끌어서 옮겨 볼 수 있고 놓으면 제자리로 돌아오는 기울어진 카드 */
function TiltCard({ rotate, className, children }: { rotate: number; className?: string; children: ReactNode }) {
  const { isStatic } = useDeck();
  return (
    <Reveal className={cx("absolute z-30", className)} y={30} data-no-swipe>
      <motion.div
        className="cursor-grab active:cursor-grabbing"
        style={{ rotate }}
        drag={!isStatic}
        dragSnapToOrigin
        dragElastic={0.6}
        whileHover={isStatic ? undefined : { rotate: 0, scale: 1.03 }}
        whileDrag={{ scale: 1.06, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {children}
      </motion.div>
    </Reveal>
  );
}

const COVER_TAB =
  "tab-shape absolute flex h-[58px] cursor-pointer items-center gap-[12px] pl-[26px] pr-[52px] text-[22px] font-bold whitespace-nowrap transition-transform duration-300 hover:-translate-y-[8px]";

function CoverFolders() {
  const { goTo, isStatic } = useDeck();
  const layers = [
    { top: 0, bg: "bg-cobalt-3", left: 36, label: "쿠팡", target: "opportunity-2" },
    { top: 62, bg: "bg-cobalt", left: 270, label: "새 검색어", target: "opportunity-2" },
  ];
  return (
    <motion.div
      className="absolute bottom-0 right-[64px] h-[640px] w-[800px]"
      initial="rest"
      animate="rest"
      whileHover={isStatic ? undefined : "hover"}
    >
      {layers.map((l) => (
        <div key={l.label} className="absolute inset-x-0 bottom-0" style={{ top: l.top }}>
          <button type="button" onClick={() => goTo(l.target)} className={cx(COVER_TAB, l.bg, "text-white")} style={{ left: l.left, top: 0 }}>
            {l.label}
            <ArrowRight className="size-[22px] opacity-80" strokeWidth={2.2} />
          </button>
          <div className={cx("absolute inset-x-0 bottom-0 top-[56px] rounded-[0_30px_0_0]", l.bg)} />
        </div>
      ))}
      {/* 폴더 안 문서: 폴더에 마우스를 올리면 올라온다 */}
      <motion.div
        className="absolute left-[44px] right-[44px] top-[128px] h-[300px] rounded-[18px] bg-white px-[34px] pt-[18px]"
        variants={{ rest: { y: 0, rotate: -1.5 }, hover: { y: -70, rotate: 0 } }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="text-[15px] font-bold tracking-[0.2em] text-ink-3">GROWTH PROPOSAL · 2026</div>
        <div className="mt-[14px] h-px bg-line" />
        <div className="mt-[16px] space-y-[10px]">
          {[86, 72, 80, 58].map((w, i) => (
            <div key={i} className="h-[10px] rounded-full bg-pebble-2" style={{ width: `${w}%` }} />
          ))}
        </div>
      </motion.div>
      {/* 앞 폴더 */}
      <div className="absolute inset-x-0 bottom-0 top-[124px]">
        <button type="button" onClick={() => goTo("opportunity-3")} className={cx(COVER_TAB, "bg-azure text-char")} style={{ left: 470, top: 0 }}>
          더 큰 장바구니
          <ArrowRight className="size-[22px] opacity-80" strokeWidth={2.2} />
        </button>
        <div className="absolute inset-x-0 bottom-0 top-[56px] rounded-[30px_0_0_0] bg-azure px-[48px] pt-[54px] text-char">
          <div className="font-display text-[26px] font-bold tracking-[-0.02em]">6개월 계획</div>
          <div className="mt-[6px] font-display text-[64px] font-extrabold leading-[1.05] tracking-[-0.045em]">
            월 매출 <span className="text-white">1.6</span>배
          </div>
          <div className="mt-[8px] text-[24px] font-bold">도전 목표 2배</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Cover() {
  return (
    <SlideRoot className="overflow-hidden">
      <div className="absolute left-[64px] top-[54px] w-[1000px]">
        <Reveal className="flex items-center gap-[14px] text-[26px] font-bold text-cobalt">
          GL AI 스튜디오 <span className="text-ink-4">×</span> 뷰클린
        </Reveal>
        <Reveal className="mt-[14px]">
          <h1 className="font-display text-[136px] font-extrabold leading-[1.04] tracking-[-0.055em] text-ink">
            스마트스토어
            <br />
            매출 성장 제안
          </h1>
        </Reveal>
        <Reveal className="mt-[34px] text-[27px] font-semibold leading-[1.5] text-ink-2">
          이미 쌓은 리뷰 1만 4천여 건과 관심고객 1만 7천여 명을
          <br />
          <b className="text-ink">쿠팡 · 새 검색어 · 더 큰 장바구니</b>로 넓히는 6개월 계획
        </Reveal>
        <Reveal className="mt-[40px] flex gap-[48px]">
          {[
            { tag: "FOR", name: "뷰클린(BEAUCLEAN)", org: "주식회사 엠에스티코리아" },
            { tag: "FROM", name: "GL AI 스튜디오", org: "커머스 성장팀" },
          ].map((p) => (
            <div key={p.tag}>
              <div className="font-display text-[16px] font-bold tracking-[0.24em] text-cobalt">{p.tag}</div>
              <div className="mt-[4px] text-[24px] font-bold text-ink">{p.name}</div>
              <div className="text-[18px] text-ink-3">{p.org}</div>
            </div>
          ))}
          <div>
            <div className="font-display text-[16px] font-bold tracking-[0.24em] text-cobalt">DATE</div>
            <div className="mt-[4px] font-display text-[24px] font-bold text-ink">2026.10.28</div>
          </div>
        </Reveal>
      </div>

      <Reveal className="absolute inset-0" y={40}>
        <CoverFolders />
      </Reveal>

      <TiltCard rotate={-6} className="left-[930px] top-[700px]">
        <div className="card-dark w-[400px] px-[26px] pb-[20px] pt-[16px]">
          <div className="flex items-center justify-between border-b border-white/15 pb-[10px] text-[19px] font-bold">
            이미 쌓은 신뢰
            <span className="text-[20px]">✓</span>
          </div>
          <div className="mt-[12px] space-y-[8px]">
            <div className="flex items-center gap-[12px]">
              <Star className="size-[22px] text-azure-2" strokeWidth={2.2} />
              <span className="text-[19px] text-white/80">리뷰</span>
              <CountUp value={14851} className="ml-auto font-display text-[30px] font-bold" />
              <span className="text-[17px] text-white/70">건</span>
            </div>
            <div className="flex items-center gap-[12px]">
              <Bell className="size-[22px] text-azure-2" strokeWidth={2.2} />
              <span className="text-[19px] text-white/80">관심고객</span>
              <CountUp value={17114} className="ml-auto font-display text-[30px] font-bold" />
              <span className="text-[17px] text-white/70">명</span>
            </div>
          </div>
        </div>
      </TiltCard>

      <TiltCard rotate={6} className="right-[90px] top-[26px]">
        <div className="card-dark w-[330px] px-[26px] pb-[18px] pt-[16px]">
          <div className="flex items-center justify-between border-b border-white/15 pb-[10px] text-[19px] font-bold">
            채널
            <span className="text-[20px]">✓</span>
          </div>
          <div className="mt-[12px] grid grid-cols-2 gap-x-[12px] gap-y-[10px]">
            {[
              { icon: Store, label: "스마트스토어" },
              { icon: ShoppingBag, label: "쿠팡" },
              { icon: Camera, label: "인스타그램" },
              { icon: CirclePlay, label: "유튜브" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-[8px] text-[17px] text-white/90">
                <Icon className="size-[19px] text-azure-2" strokeWidth={2.2} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>

      <Reveal className="absolute bottom-[26px] left-[64px] flex items-center gap-[18px] text-[15px] font-medium text-ink-3">
        <span>
          <Kbd>→</Kbd> <Kbd>Space</Kbd> 다음 장
        </span>
        <span>
          <Kbd>G</Kbd> 전체 보기
        </span>
        <span>
          <Kbd>F</Kbd> 전체 화면
        </span>
        <span className="text-ink-4">·</span>
        <span>카드는 끌어 볼 수 있고, 폴더 탭을 누르면 그 내용으로 갑니다</span>
      </Reveal>
    </SlideRoot>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="mx-[2px] inline-grid min-w-[26px] place-items-center rounded-[7px] bg-white px-[7px] py-[1px] font-sans text-[14px] font-bold text-ink-2 ring-1 ring-line">
      {children}
    </kbd>
  );
}

/* ------------------------------------------------------------------ */
/* 한 장 요약 — 가진 것 → 하는 일 → 목표. 뒤쪽 탭은 자세한 장으로 이동         */
/* ------------------------------------------------------------------ */

function SummaryColumn({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col rounded-[24px] bg-white px-[30px] pb-[26px] pt-[24px] text-ink">
      <span className="font-display text-[17px] font-bold tracking-[0.2em] text-cobalt">{step}</span>
      <h3 className="mt-[6px] text-[30px] font-extrabold tracking-[-0.03em]">{title}</h3>
      <div className="mt-[18px] flex flex-1 flex-col justify-between">{children}</div>
    </div>
  );
}

function AssetRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-between gap-[16px] border-b border-line last:border-b-0">
      <span className="shrink-0 text-[19px] font-semibold text-ink-3">{label}</span>
      <span className="text-right text-[22px] font-bold text-ink">{children}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center">
      <span className="grid size-[44px] place-items-center rounded-full bg-white/15 text-white">
        <ArrowRight className="size-[24px]" strokeWidth={2.4} />
      </span>
    </div>
  );
}

export function ExecSummary() {
  const { goTo } = useDeck();
  return (
    <SlideRoot className="flex flex-col px-[64px] pb-[22px] pt-[30px]">
      <Reveal className="flex items-center gap-[12px] text-[17px] font-semibold text-ink-3">
        <span className="font-display text-[18px] font-bold text-cobalt">00</span>
        <span className="h-[2px] w-[28px] bg-azure" />한 장 요약
      </Reveal>
      <Reveal className="mt-[12px]">
        <h2 className="font-display text-[50px] font-extrabold leading-[1.2] tracking-[-0.035em] text-ink">
          이미 가진 신뢰를 더 넓게 써서, 6개월 뒤 월 매출 <Hl>기본 1.6배 · 도전 2배</Hl>
        </h2>
      </Reveal>

      <Folder
        className="mt-[30px] min-h-0 flex-1"
        tone="cobalt"
        tabWidth={290}
        tabs={[
          { label: "한 장 요약" },
          { label: "01 기회", onClick: () => goTo("opportunity-1"), title: "뷰클린의 기회로 이동" },
          { label: "02 목표", onClick: () => goTo("goal-1"), title: "목표와 성장 레버로 이동" },
          { label: "03 하는 일", onClick: () => goTo("work-1"), title: "우리가 하는 일로 이동" },
        ]}
        bodyClassName="flex flex-col px-[30px] pb-[24px] pt-[30px]"
      >
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-[14px]">
          <SummaryColumn step="HAVE" title="지금 가진 것">
            <AssetRow label="리뷰">
              <span className="font-display">14,851</span>건 · 평점 4.64~4.96
            </AssetRow>
            <AssetRow label="관심고객">
              <span className="font-display">17,114</span>명 (알림받기)
            </AssetRow>
            <AssetRow label="스토어">9년 차 프리미엄 등급</AssetRow>
            <AssetRow label="상품 구성">타올 10규격 · 팬티 남녀 · 파마보</AssetRow>
          </SummaryColumn>
          <FlowArrow />
          <SummaryColumn step="DO" title="우리가 하는 일">
            <div className="flex flex-1 flex-col justify-center rounded-[18px] bg-cream-2 px-[22px] py-[16px]">
              <div className="text-[23px] font-bold">성장 레버 7개</div>
              <p className="mt-[8px] text-[19px] leading-[1.6] text-ink-2">
                쿠팡 · 네이버 광고 정비 · 외부 유입 · 리뷰·재구매 · 객단가 · 출산·산모 새 칸 · 원장님(B2B) 구성
              </p>
            </div>
            <div className="mt-[14px] flex flex-1 flex-col justify-center rounded-[18px] bg-cream-2 px-[22px] py-[16px]">
              <div className="text-[23px] font-bold">서비스 7개, 매주 정해진 수량</div>
              <p className="mt-[8px] text-[19px] leading-[1.6] text-ink-2">
                AI 숏폼 주 2편 · 인플루언서 시딩 주 5명 · 광고 주 2회 점검 · 매달 숫자로 보고
              </p>
            </div>
          </SummaryColumn>
          <FlowArrow />
          <SummaryColumn step="GOAL" title="6개월 목표">
            <div className="grid flex-1 grid-cols-2 gap-[12px]">
              {[
                { k: "기본", v: 1.6, d: "현재 100 → 156" },
                { k: "도전", v: 2, d: "세 조건 중 둘 이상" },
              ].map((x, i) => (
                <div key={x.k} className={cx("flex flex-col items-center justify-center rounded-[20px] px-[16px] py-[18px] text-center", i === 0 ? "bg-azure text-char" : "bg-cream-2")}>
                  <div className="text-[19px] font-bold">{x.k}</div>
                  <div className="mt-[6px] font-display text-[76px] font-extrabold leading-none tracking-[-0.045em]">
                    <CountUp value={x.v} decimals={x.v % 1 ? 1 : 0} delay={0.6} />
                    <span className="ml-[2px] text-[30px]">배</span>
                  </div>
                  <div className={cx("mt-[8px] text-[16px] font-semibold", i === 0 ? "text-char/80" : "text-ink-3")}>{x.d}</div>
                </div>
              ))}
            </div>
            <p className="pt-[16px] text-[19px] leading-[1.55] text-ink-2">
              현재 월 매출을 100으로 놓고 근거가 있는 레버만 더한 값입니다. <b className="text-ink">30·60·90일</b>마다 숫자로 점검합니다.
            </p>
          </SummaryColumn>
        </div>
        <div className="mt-[20px] flex items-center justify-between rounded-[20px] bg-cobalt-2 px-[30px] py-[16px] text-[20px] font-semibold text-white">
          {[
            { icon: KeyRound, text: "시작은 원가표 한 장 + 권한 초대 30분" },
            { icon: CalendarCheck, text: "월 단위 계약 · 최소 기간·위약금 없음" },
            { icon: Wallet, text: "패키지 월 150만 · 270만 · 350만 원 (부가세 별도)" },
          ].map(({ icon: Icon, text }, i) => (
            <span key={text} className="flex items-center gap-[10px]">
              {i > 0 && <span className="mr-[22px] h-[22px] w-px bg-white/30" />}
              <Icon className="size-[22px] text-azure-2" strokeWidth={2.2} />
              {text}
            </span>
          ))}
        </div>
      </Folder>
    </SlideRoot>
  );
}

/* ------------------------------------------------------------------ */
/* 목차 — 폴더 탭 목록. 누르면 그 장으로                                    */
/* ------------------------------------------------------------------ */

const LEGEND: Array<[EvidenceKind, string]> = [
  ["확인", "원문 확인"],
  ["영상", "판매자 영상"],
  ["가정", "계획용 값"],
  ["미확인", "시작 전 확인 필요"],
];

export function Contents() {
  const { goTo, pages, total } = useDeck();
  return (
    <SlideRoot className="flex gap-[64px] px-[64px] pb-[26px] pt-[40px]">
      <div className="flex w-[560px] shrink-0 flex-col">
        <Reveal>
          <h2 className="font-display text-[150px] font-extrabold leading-[0.95] tracking-[-0.06em] text-ink">목차</h2>
        </Reveal>
        <Reveal className="mt-[24px] text-[26px] font-semibold leading-[1.5] text-ink-2">
          8개 장, {total}장.
          <br />
          탭을 누르면 그 장으로 바로 갑니다.
        </Reveal>
        <Reveal className="mt-auto rounded-[24px] bg-beige px-[28px] py-[24px]">
          <div className="text-[19px] font-bold text-ink">근거 표시 읽는 법</div>
          <p className="mt-[6px] text-[16.5px] leading-[1.55] text-ink-2">숫자 옆 신호등 점은 그 숫자를 어디서 가져왔는지 알려 줍니다.</p>
          <div className="mt-[14px] grid grid-cols-2 gap-x-[16px] gap-y-[10px]">
            {LEGEND.map(([k, d]) => (
              <div key={k} className="flex items-center gap-[10px] text-[17px]">
                <span className={cx("size-[14px] rounded-full", EV_DOT[k])} />
                <b className="text-ink">{k}</b>
                <span className="text-ink-2">{d}</span>
              </div>
            ))}
          </div>
          <p className="mt-[14px] text-[15px] leading-[1.5] text-ink-3">2026-10-28 화면 관찰값 · 네이버·쿠팡 공식 발표 · 공개된 판매자 사례 기준</p>
        </Reveal>
      </div>

      <Group className="flex min-w-0 flex-1 flex-col justify-center gap-[10px]" gap={0.05}>
        {SECTIONS.map((s, i) => {
          const range = pages[s.id];
          return (
            <motion.button
              key={s.id}
              type="button"
              onClick={() => goTo(`${s.id}-1`)}
              className="tab-shape group relative flex h-[92px] cursor-pointer items-center gap-[28px] bg-white pl-[34px] pr-[90px] text-left transition-colors duration-300 hover:bg-azure"
              style={{ marginLeft: i * 10 }}
              variants={{
                hidden: { opacity: 0, x: 40 },
                show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              whileHover={{ x: 18 }}
            >
              <span className="w-[66px] font-display text-[44px] font-bold tracking-[-0.04em] text-cobalt transition-colors group-hover:text-char">
                {s.no}
              </span>
              <span className="w-[300px] text-[29px] font-bold text-ink">{s.title}</span>
              <span className="flex-1 text-[18.5px] leading-[1.4] text-ink-2 transition-colors group-hover:text-char">{s.desc.replace("\n", " ")}</span>
              {range && (
                <span className="shrink-0 font-display text-[17px] font-bold text-ink-3 transition-colors group-hover:text-char">
                  {range[0] === range[1] ? `${range[0]}쪽` : `${range[0]}–${range[1]}쪽`}
                </span>
              )}
              <ArrowRight className="size-[26px] shrink-0 text-ink-3 transition-colors group-hover:text-char" strokeWidth={2.2} />
            </motion.button>
          );
        })}
      </Group>
    </SlideRoot>
  );
}
