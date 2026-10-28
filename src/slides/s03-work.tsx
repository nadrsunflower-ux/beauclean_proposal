"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Bell,
  CalendarCheck,
  ChevronRight,
  Clapperboard,
  ClipboardList,
  Eye,
  FlaskConical,
  Gift,
  Heart,
  Link2,
  Luggage,
  Megaphone,
  MessageCircle,
  Newspaper,
  Repeat,
  Scale,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Store,
  Tags,
  Target,
  Truck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useDeck } from "@/components/deck/context";
import { RangeSlider, Segmented } from "@/components/ui/interactive";
import {
  BrowserFrame,
  Bullets,
  Card,
  Chip,
  CountUp,
  DarkCard,
  Deliverable,
  EASE,
  Ev,
  Folder,
  Hl,
  IconCircle,
  NumBadge,
  Reveal,
  ServiceTag,
  cx,
} from "@/components/ui/primitives";
import { SlideLayout } from "@/components/ui/SlideLayout";

/* ------------------------------------------------------------------ */
/* 03-1 서비스 7개 — 패키지를 고르면 들어가는 서비스만 남는다                  */
/* ------------------------------------------------------------------ */

type Tier = "start" | "growth" | "full" | "addon";
type Filter = "all" | "start" | "growth" | "full";

const TIER_LABEL: Record<Tier, string> = {
  start: "모든 패키지",
  growth: "그로스부터",
  full: "풀 그로스",
  addon: "어느 패키지에든 추가",
};

const SERVICES: Array<{ no: string; name: string; freq: string; out: string; icon: typeof Star; slide: string; tier: Tier }> = [
  { no: "①", name: "AI 숏폼 콘텐츠", freq: "주 2편 · 월 8편", out: "영상 8편 원본, 인스타그램·유튜브 업로드, 편마다 다른 스토어 링크, 월간 성과 리포트", icon: Clapperboard, slide: "work-2", tier: "start" },
  { no: "②", name: "인플루언서 시딩", freq: "주 5명 · 월 20명", out: "섭외·발송·게시 확인 목록, 게시물 링크·캡처, 2차 활용 가능 소재 목록", icon: UsersRound, slide: "work-3", tier: "growth" },
  { no: "③", name: "네이버 광고 운영", freq: "주 2회 점검", out: "주간 광고 숫자, 월간 키워드 조정 목록", icon: Megaphone, slide: "work-4", tier: "growth" },
  { no: "④", name: "쿠팡 운영·광고", freq: "주 2회 점검 + 행사 신청", out: "상품 정비안, 광고 운영, 리뷰 이벤트, 행사 신청, 영상별 쿠팡 매출", icon: ShoppingBag, slide: "work-5", tier: "full" },
  { no: "⑤", name: "스마트스토어 최적화 세팅", freq: "1회 (2~3주)", out: "대표 3개 상품의 변경 전후 비교표, 2주 뒤 구매전환율 비교", icon: Store, slide: "work-6", tier: "addon" },
  { no: "⑥", name: "리뷰·재구매 관리", freq: "답글 주 3회 · 메시지 월 2회", out: "답글, 리뷰 이벤트, 쿠폰·메시지 문안과 결과", icon: Repeat, slide: "work-7", tier: "full" },
  { no: "⑦", name: "주간 경쟁사·시장 동향 리포트", freq: "매주 월요일", out: "경쟁 상품·검색어 순위·행사·플랫폼 변경 정리", icon: Newspaper, slide: "work-7", tier: "growth" },
];

const INCLUDED: Record<Exclude<Filter, "all">, Tier[]> = {
  start: ["start"],
  growth: ["start", "growth"],
  full: ["start", "growth", "full"],
};

export function WorkOverview() {
  const { goTo } = useDeck();
  const [filter, setFilter] = useState<Filter>("all");
  const count = filter === "all" ? SERVICES.length : SERVICES.filter((s) => INCLUDED[filter].includes(s.tier)).length;
  return (
    <SlideLayout
      section="work"
      eyebrow="서비스 7개 한눈에"
      compact
      title={
        <>
          상품마다 <Hl>무엇을, 몇 건, 어떤 결과물로</Hl> 드리는지 정해 두었습니다
        </>
      }
      sub="패키지를 고르면 그 패키지에 들어가는 서비스만 남고, 카드를 누르면 자세한 장으로 갑니다"
      aside={
        <Segmented<Filter>
          label="패키지별 보기"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "전체" },
            { value: "start", label: "스타트" },
            { value: "growth", label: "그로스" },
            { value: "full", label: "풀 그로스" },
          ]}
        />
      }
    >
      <Folder
        tabs={[{ label: filter === "all" ? `서비스 ${SERVICES.length}가지` : `이 패키지 · ${count}가지` }]}
        tabWidth={300}
        tone="azure"
        className="h-full"
        bodyClassName="grid grid-cols-4 grid-rows-2 gap-[14px] p-[16px]"
      >
        {SERVICES.map((s, i) => {
          const on = filter === "all" || INCLUDED[filter].includes(s.tier);
          const addon = filter !== "all" && s.tier === "addon";
          const big = i === 0;
          return (
            <motion.button
              key={s.no}
              type="button"
              onClick={() => goTo(s.slide)}
              className={cx(
                "group flex cursor-pointer flex-col rounded-[20px] text-left",
                big ? "row-span-2 px-[30px] pb-[22px] pt-[26px]" : "px-[24px] pb-[16px] pt-[18px]",
                addon ? "bg-white/60 outline-dashed outline-2 -outline-offset-[6px] outline-cobalt/40" : "bg-white",
              )}
              initial={false}
              animate={{ opacity: on || addon ? 1 : 0.3, scale: on ? 1 : 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              whileHover={{ y: -4 }}
            >
              <div className="flex w-full items-start justify-between">
                <NumBadge no={s.no} size={big ? 44 : 34} tone={on ? "cobalt" : "outline"} />
                <IconCircle icon={s.icon} size={big ? 64 : 44} tone={big ? "cobalt" : "soft"} />
              </div>
              <h3 className={cx("font-bold leading-[1.3] text-ink", big ? "mt-[22px] text-[34px]" : "mt-[12px] text-[22px]")}>
                {s.name}
                {big && <span className="ml-[10px] inline-block -translate-y-[4px] rounded-[8px] bg-char px-[9px] py-[2px] align-middle text-[15px] font-bold text-white">기본</span>}
              </h3>
              <span
                className={cx(
                  "self-start rounded-full bg-cream-2 font-bold text-ink",
                  big ? "mt-[14px] px-[16px] py-[6px] text-[19px]" : "mt-[8px] px-[12px] py-[4px] text-[15.5px]",
                )}
              >
                {s.freq}
              </span>
              <p className={cx("leading-[1.5] text-ink-2", big ? "mt-[18px] text-[20px]" : "mt-[10px] text-[17px]")}>{s.out}</p>
              <div className="mt-auto flex items-center justify-between pt-[8px]">
                <span className={cx("font-bold", big ? "text-[16px]" : "text-[13.5px]", s.tier === "addon" ? "text-ink-3" : "text-cobalt")}>
                  {TIER_LABEL[s.tier]}
                </span>
                <ChevronRight className="size-[18px] text-ink-4 transition-colors group-hover:text-cobalt" strokeWidth={2.6} />
              </div>
            </motion.button>
          );
        })}
      </Folder>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 03-2 ① AI 숏폼 — 목록과 휴대폰 화면이 서로 가리킨다                        */
/* ------------------------------------------------------------------ */

const SHORTFORM_MARKS: Array<{ head: string; body: ReactNode }> = [
  { head: "첫 화면", body: <>&lsquo;유료광고 포함&rsquo; 표시</> },
  { head: "AI로 만든 인물 옆", body: <>&lsquo;가상인물&rsquo; 표시</> },
  { head: "끝 장면", body: <>「뷰클린 일회용 팬티」 검색 안내</> },
];

function PhoneMarker({ i, focus, setFocus, className }: { i: number; focus: number | null; setFocus: (i: number | null) => void; className: string }) {
  return (
    <button
      type="button"
      aria-label={`${i + 1}번 위치`}
      onMouseEnter={() => setFocus(i)}
      onMouseLeave={() => setFocus(null)}
      className={cx(
        "absolute z-10 grid size-[32px] cursor-pointer place-items-center rounded-full font-display text-[16px] font-bold ring-[3px] ring-white transition-transform",
        focus === i ? "scale-125 bg-azure text-char" : "bg-cobalt text-white",
        className,
      )}
    >
      {i + 1}
    </button>
  );
}

function PhoneMock({ focus, setFocus }: { focus: number | null; setFocus: (i: number | null) => void }) {
  const { isStatic } = useDeck();
  const ring = (i: number) => (focus === i ? "ring-[3px] ring-azure" : "");
  return (
    <div className="relative h-[560px] w-[288px] shrink-0 rounded-[48px] bg-char p-[10px]">
      <div className="relative h-full w-full overflow-hidden rounded-[39px] bg-[linear-gradient(172deg,#d4edf9_0%,#f3f2e5_55%,#e8e7d9_100%)]">
        <motion.div
          className="absolute inset-0"
          animate={isStatic ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute left-1/2 top-[118px] -translate-x-1/2">
            <UserRound className="size-[170px] text-azure-2" strokeWidth={1.3} />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pouch.jpg" alt="" className="absolute right-[24px] top-[300px] size-[80px] rotate-[8deg] rounded-[14px]" />
        </motion.div>
        <div className="absolute left-1/2 top-[11px] h-[24px] w-[88px] -translate-x-1/2 rounded-full bg-char" />
        <div className={cx("absolute left-[16px] top-[50px] rounded-[8px] bg-white px-[9px] py-[3px] text-[13px] font-bold text-ink", ring(0))}>유료광고 포함</div>
        <div className={cx("absolute left-[28px] top-[214px] rounded-full bg-char/80 px-[10px] py-[3px] text-[13px] font-bold text-white", ring(1))}>가상인물</div>
        <div className="absolute bottom-[120px] right-[14px] flex flex-col items-center gap-[16px] text-ink-2">
          <Heart className="size-[24px]" strokeWidth={2.2} />
          <MessageCircle className="size-[24px]" strokeWidth={2.2} />
          <Send className="size-[24px]" strokeWidth={2.2} />
        </div>
        <div className={cx("absolute inset-x-[14px] bottom-[34px] flex items-center gap-[8px] rounded-full bg-white px-[14px] py-[10px] text-[15px] font-bold text-ink", ring(2))}>
          <Search className="size-[16px] text-cobalt" strokeWidth={2.8} />
          뷰클린 일회용 팬티
        </div>
        <div className="absolute inset-x-[16px] bottom-[16px] h-[3px] overflow-hidden rounded-full bg-char/15">
          <motion.div
            className="h-full rounded-full bg-cobalt"
            initial={false}
            animate={isStatic ? { width: "62%" } : { width: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
      <PhoneMarker i={0} focus={focus} setFocus={setFocus} className="left-[150px] top-[48px]" />
      <PhoneMarker i={1} focus={focus} setFocus={setFocus} className="left-[124px] top-[211px]" />
      <PhoneMarker i={2} focus={focus} setFocus={setFocus} className="bottom-[42px] right-[-8px]" />
    </div>
  );
}

export function WorkShortform() {
  const [focus, setFocus] = useState<number | null>(null);
  return (
    <SlideLayout
      section="work"
      eyebrow="① AI 숏폼 콘텐츠"
      title={
        <>
          촬영·모델 섭외 없이, <Hl>제품이 실제로 쓰이는 장면</Hl>을 영상으로 만듭니다
        </>
      }
      sub={<ServiceTag no="①" name="AI 숏폼 콘텐츠" meta={["기본 상품", "주 2편 · 월 8편"]} />}
    >
      <div className="grid h-full grid-cols-[660px_1fr] gap-[28px]">
        <Reveal className="flex items-center gap-[30px] rounded-[24px] bg-beige px-[34px] py-[24px]">
          <PhoneMock focus={focus} setFocus={setFocus} />
          <div className="min-w-0">
            <div className="text-[17px] font-bold text-ink-2">영상마다 넣는 것</div>
            <ol className="mt-[12px] space-y-[8px]">
              {SHORTFORM_MARKS.map((m, i) => (
                <li
                  key={i}
                  onMouseEnter={() => setFocus(i)}
                  onMouseLeave={() => setFocus(null)}
                  className={cx("flex cursor-default gap-[12px] rounded-[16px] px-[12px] py-[10px] transition-colors", focus === i ? "bg-white" : "")}
                >
                  <NumBadge no={i + 1} size={30} tone={focus === i ? "azure" : "cobalt"} />
                  <span className="text-[20px] leading-[1.45] text-ink-2">
                    <span className="text-ink-3">{m.head}</span>
                    <br />
                    <b className="text-ink">{m.body}</b>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Card className="flex flex-col px-[38px] pb-[28px] pt-[28px]">
          <div className="flex flex-1 flex-col justify-center pb-[12px]">
          <div className="text-[17px] font-bold text-cobalt">무엇을 하나</div>
          <p className="mt-[8px] text-[22px] leading-[1.65] text-ink-2">
            뷰클린 제품이 실제로 쓰이는 장면을 <b className="text-ink">세로 숏폼 영상</b>으로 만듭니다. 촬영 준비나 모델 섭외가 필요 없습니다. 인스타그램
            릴스·유튜브 쇼츠에 올리고, 같은 파일을 네이버 클립용으로도 드립니다.
          </p>
          <div className="mt-[24px] text-[17px] font-bold text-cobalt">주제 예시</div>
          <div className="mt-[12px] space-y-[12px]">
            {[
              { icon: FlaskConical, head: "비교 실험", body: "순면·레이온·부직포에 물 10ml, 검은 옷 보풀 비교" },
              { icon: Luggage, head: "상황 시리즈", body: "입원 가방, 해외여행·한달살기, 골프 라운딩, 왁싱 베드, 네일 데스크" },
              { icon: Baby, head: "출산가방 한 칸 채우기", body: "", tail: "원장님의 샵 오픈 준비" },
            ].map((x) => (
              <div key={x.head} className="flex items-center gap-[16px] rounded-[18px] bg-cream-2 px-[20px] py-[14px]">
                <IconCircle icon={x.icon} size={46} tone="white" />
                <div className="text-[20px] leading-[1.45] text-ink-2">
                  <b className="mr-[8px] text-[21px] text-ink">{x.head}</b>
                  {x.body}
                  {x.tail && (
                    <>
                      <span className="mx-[6px] text-ink-4">·</span>
                      <b className="text-[21px] text-ink">{x.tail}</b>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          </div>
          <Deliverable>영상 원본 8편(소유권 뷰클린) · 업로드 · 영상마다 다른 스토어·쿠팡 링크 · 월간 성과 리포트</Deliverable>
        </Card>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 03-3 ② 인플루언서 시딩 — 과정 · 매주 하는 일 · 협찬 제품과 실비           */
/* ------------------------------------------------------------------ */

const SEEDING_STEPS = [
  { icon: Search, head: "발굴", body: "분야·팔로워·최근 반응 확인" },
  { icon: MessageCircle, head: "섭외", body: "먼저 관심 여부만 묻기" },
  { icon: Truck, head: "발송", body: "수락자 주소·옵션 확인, 발송 관리" },
  { icon: Eye, head: "게시 확인", body: "링크·캡처" },
  { icon: Repeat, head: "2차 활용", body: "반응 좋은 게시물은 2차 활용 동의" },
];

export function WorkSeeding() {
  return (
    <SlideLayout
      section="work"
      eyebrow="② 인플루언서 시딩"
      title={
        <>
          인플루언서 시딩으로 <Hl>자연스러운 사용 후기</Hl>를 쌓습니다
        </>
      }
      sub={<ServiceTag no="②" name="인플루언서 시딩" meta={["주 5명 · 월 20명"]} />}
    >
      <div className="grid h-full grid-cols-[minmax(0,1fr)_520px] gap-[26px]">
        <Folder
          tabs={[{ label: "② 시딩 · 주 5명 · 월 20명" }]}
          tabWidth={350}
          tone="cobalt"
          className="h-full"
          bodyClassName="flex flex-col px-[40px] pb-[26px] pt-[28px] text-white"
        >
          <div className="flex flex-1 flex-col justify-center pb-[14px]">
            <p className="text-[24px] leading-[1.55]">
              <b>여행·출산·입원·샵 원장</b> 분야 인스타그램 계정을 찾아, 제품을 보내고 자연스러운 사용 후기를 받습니다.
            </p>
            <div className="relative mt-[36px] grid grid-cols-5 gap-[8px]">
              <div className="absolute left-[10%] right-[10%] top-[64px] h-[2px] bg-white/35" />
              {SEEDING_STEPS.map((st, i) => (
                <Reveal key={st.head} y={10} className="relative flex flex-col items-center text-center">
                  <motion.div
                    className="relative grid size-[128px] place-items-center rounded-full bg-pebble text-char"
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <st.icon className="size-[44px]" strokeWidth={1.8} />
                    <span className="absolute -right-[2px] -top-[2px] grid size-[34px] place-items-center rounded-full bg-azure font-display text-[17px] font-bold text-char ring-[3px] ring-cobalt">
                      {i + 1}
                    </span>
                  </motion.div>
                  <span className="mt-[16px] text-[23px] font-bold">{st.head}</span>
                  <span className="mt-[6px] text-[17px] leading-[1.45] text-white/80">{st.body}</span>
                </Reveal>
              ))}
            </div>
            <div className="mt-[34px] flex items-center gap-[12px] rounded-[16px] bg-white/12 px-[20px] py-[15px] text-[20px]">
              <ShieldCheck className="size-[24px] shrink-0 text-azure-2" strokeWidth={2.2} />
              안내서 첫 줄에 협찬 표기 방법을 넣고, 빠진 게시물은 수정 요청합니다.
            </div>
          </div>
          <div className="rounded-[18px] bg-white px-[22px] py-[15px] text-ink">
            <div className="text-[16px] font-bold">뷰클린이 받는 결과물</div>
            <p className="mt-[5px] text-[19px] leading-[1.5] text-ink-2">
              주간 진행표(연락·수락·발송·게시), 게시물 링크·캡처 모음, 광고 소재로 다시 쓸 수 있는 2차 활용 목록
            </p>
          </div>
        </Folder>

        <div className="flex flex-col gap-[20px]">
          <DarkCard title="매주 이렇게 진행합니다" bodyClassName="flex flex-col justify-center gap-[14px]">
            {[
              { day: "화", task: "시딩 섭외 연락, 이번 주 5명 확정" },
              { day: "목", task: "시딩 발송·게시 확인", out: "게시 확인 목록" },
            ].map((r) => (
              <div key={r.day} className="flex items-center gap-[16px] rounded-[18px] bg-white/8 px-[18px] py-[14px]">
                <span className="grid size-[52px] shrink-0 place-items-center rounded-full bg-azure text-[24px] font-extrabold text-char">{r.day}</span>
                <span>
                  <span className="block text-[21px] font-semibold leading-[1.4]">{r.task}</span>
                  {r.out && <span className="text-[16px] text-white/65">→ {r.out}</span>}
                </span>
              </div>
            ))}
          </DarkCard>
          <Card className="flex flex-1 flex-col px-[30px] pb-[24px] pt-[24px]">
            <div className="text-[17px] font-bold text-cobalt">협찬 제품 (매월)</div>
            <div className="mt-[4px] font-display text-[46px] font-extrabold leading-[1.1] tracking-[-0.04em] text-ink">약 20세트</div>
            <p className="mt-[4px] text-[19px] text-ink-2">여성 팬티 2팩 또는 남녀 1팩씩</p>
            <div className="my-[18px] h-px bg-line" />
            <div className="text-[17px] font-bold text-cobalt">실비 (별도)</div>
            <p className="mt-[4px] text-[21px] font-bold leading-[1.4] text-ink">1인당 제품·배송 포함 10만 원 이내, 사전 승인</p>
            <p className="mt-[8px] text-[17.5px] leading-[1.55] text-ink-2">
              제품만 보낼 때는 1인당 제품(예: 팬티 2팩)과 택배비만 듭니다. 상한 10만 원은 소액 원고료나 세트 구성이 붙을 때를 위한 것으로, 쓰기 전에 매번
              승인받습니다.
            </p>
          </Card>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 03-4 ③ 네이버 광고 — 5% 비즈쿠폰을 직접 계산해 보기                        */
/* ------------------------------------------------------------------ */

function CouponCalculator() {
  const [spend, setSpend] = useState(300);
  const monthly = spend * 0.05;
  const yearly = monthly * 12;
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-baseline justify-between">
        <span className="text-[18px] font-semibold text-white/75">월 검색광고비 (유상 소진액)</span>
        <span className="font-display text-[34px] font-bold">
          {spend.toLocaleString("ko-KR")}
          <span className="text-[20px] text-white/75">만 원</span>
        </span>
      </div>
      <RangeSlider
        value={spend}
        min={100}
        max={1000}
        step={50}
        onChange={setSpend}
        label="월 검색광고비"
        fill="#36a9e1"
        track="rgba(255,255,255,0.18)"
        className="mt-[10px]"
      />
      <div className="mt-[4px] flex justify-between text-[14px] font-semibold text-white/50">
        <span>100만</span>
        <span>1,000만</span>
      </div>
      <div className="mt-[20px] grid grid-cols-2 gap-[12px]">
        <div className="rounded-[18px] bg-white/10 px-[20px] py-[16px]">
          <div className="text-[16px] font-semibold text-white/70">다음 달 비즈쿠폰</div>
          <div className="mt-[4px] font-display text-[46px] font-extrabold leading-none tracking-[-0.04em] text-azure-2">
            <CountUp value={monthly} decimals={monthly % 1 ? 1 : 0} delay={0.5} />
            <span className="text-[22px] text-white">만 원</span>
          </div>
        </div>
        <div className="rounded-[18px] bg-white/10 px-[20px] py-[16px]">
          <div className="text-[16px] font-semibold text-white/70">1년이면</div>
          <div className="mt-[4px] font-display text-[46px] font-extrabold leading-none tracking-[-0.04em]">
            <CountUp value={yearly} decimals={yearly % 1 ? 1 : 0} delay={0.6} />
            <span className="text-[22px] text-white/80">만 원</span>
          </div>
        </div>
      </div>
      <div className="mt-[10px] text-[15px] text-white/60">제안서 예시: 월 300만 원 → 월 15만 원 · 1년 180만 원</div>
    </div>
  );
}

export function WorkNaverAds() {
  const items = [
    { icon: Tags, head: "구조", body: "상품군(팬티·타올)과 검색어 크기(대표어·수확·세부)로 나누고, 4주 단위로 시험하며 키웁니다." },
    { icon: SlidersHorizontal, head: "주 2회 점검", body: "입찰가 조정, 제외 검색어 추가(이름이 같은 다른 업종·지역 검색어 등), 소재·홍보문구 교체" },
    { icon: Search, head: "새로 여는 칸", body: "산모·출산 검색어(산모 일회용 팬티, 출산가방 팬티 등), 원장님 검색어(네일재료·왁싱재료)" },
    { icon: Scale, head: "판정", body: "광고 화면 ROAS만이 아니라 스토어 전체 매출로 봅니다. ADVoost는 켜고 끈 7일씩을 비교해 남길지 정합니다." },
  ];
  return (
    <SlideLayout
      section="work"
      eyebrow="③ 네이버 광고 운영"
      title={
        <>
          네이버 광고는 <Hl>뷰클린 계정 그대로</Hl> 운영해 5% 혜택을 지킵니다
        </>
      }
      sub={<ServiceTag no="③" name="네이버 광고 운영" meta={["쇼핑검색 · 파워링크 · ADVoost", "주 2회 점검"]} />}
    >
      <div className="grid h-full grid-cols-[1fr_640px] gap-[26px]">
        <Card className="flex flex-col px-[38px] pb-[26px] pt-[26px]">
          <div className="flex flex-1 flex-col justify-around pb-[14px]">
            {items.map((x) => (
              <div key={x.head} className="flex gap-[20px]">
                <IconCircle icon={x.icon} size={56} />
                <div>
                  <div className="text-[24px] font-bold text-ink">{x.head}</div>
                  <p className="mt-[4px] text-[20.5px] leading-[1.55] text-ink-2">{x.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Deliverable>주간 광고 숫자(광고비·클릭·구매·ROAS), 월간 키워드별 올림·내림 목록</Deliverable>
        </Card>

        <Reveal className="card-dark flex flex-col px-[36px] pb-[24px] pt-[26px]">
          <div className="flex items-center justify-between border-b border-white/15 pb-[14px]">
            <span className="text-[24px] font-bold">직접 운영 혜택이 그대로 유지됩니다</span>
            <ShieldCheck className="size-[26px] text-azure-2" strokeWidth={2.2} />
          </div>
          <p className="mt-[16px] text-[19.5px] leading-[1.6] text-white/85">
            GL AI 스튜디오는 뷰클린 광고 계정에 <b className="text-white">&lsquo;구성원&rsquo;으로 초대받아</b> 운영합니다. 대행권을 옮기지 않으므로 검색광고 유상
            소진액의 <b className="text-white">5%가 매달 비즈쿠폰</b>으로 쌓입니다.
          </p>
          <div className="mt-[22px] flex flex-1 flex-col">
            <CouponCalculator />
          </div>
          <p className="mt-[14px] text-[14.5px] leading-[1.55] text-white/60">
            네이버 광고 도움말 <Ev k="확인" dark /> 파워컨텐츠·플레이스·디스플레이(ADVoost 쇼핑 포함)·GFA 소진분은 적립 대상이 아닙니다. 금액은 규정으로 계산한
            예시입니다.
          </p>
        </Reveal>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 03-5 ④ 쿠팡 — 4단계를 원으로                                            */
/* ------------------------------------------------------------------ */

const COUPANG_STEPS: Array<{ icon: typeof Star; head: string; when: string; stat: string; statLabel: string; body: string; note: ReactNode }> = [
  {
    icon: ClipboardList,
    head: "상품 정비",
    when: "먼저",
    stat: "20개",
    statLabel: "검색어 등록",
    body: "검색 옵션 전부 입력, 대표 옵션 정리, 네이버 실결제가와 가까운 가격 구조(쿠폰)",
    note: (
      <>
        쿠팡 발표: 검색어 15개 이상 등록 시 노출 1.8배 <Ev k="확인" />
      </>
    ),
  },
  {
    icon: Star,
    head: "리뷰 이벤트",
    when: "대표 옵션부터",
    stat: "99개",
    statLabel: "첫 리뷰 목표",
    body: "비용은 리뷰가 달린 만큼만 판매 정산금에서 빠집니다.",
    note: (
      <>
        건당 약 2,420원 <Ev k="영상" />
      </>
    ),
  },
  {
    icon: CalendarCheck,
    head: "무료노출·행사 신청",
    when: "매주",
    stat: "+42%",
    statLabel: "무료노출 참여 상품 평균 매출",
    body: "신청 가능한 상품을 확인해 가격·수량을 제안하고, 승인 후 신청합니다.",
    note: (
      <>
        쿠팡 발표(2025-01~10) <Ev k="확인" />
      </>
    ),
  },
  {
    icon: Target,
    head: "광고",
    when: "리뷰가 쌓인 뒤",
    stat: "2주",
    statLabel: "자동 광고로 팔리는 옵션 찾기",
    body: "이후 팔린 옵션 중심으로 매출을 최적화하고, 세부 검색어는 수동 광고로 운영합니다.",
    note: <>세부 검색어 예: 제왕절개 팬티 · 입원 준비물 팬티 · 네일샵 타올</>,
  },
];

export function WorkCoupang() {
  return (
    <SlideLayout
      section="work"
      eyebrow="④ 쿠팡 운영·광고"
      title={
        <>
          쿠팡은 <Hl>상품 정비 → 리뷰 쌓기 → 광고</Hl> 순서로 키웁니다
        </>
      }
      sub={<ServiceTag no="④" name="쿠팡 운영·광고" meta={["주 2회 점검 + 행사 신청"]} />}
      foot={
        <>
          리뷰 이벤트 단가는 판매자 화면 영상 기준 <Ev k="영상" /> · 쿠팡 공식 요금표는 시작 전 확인 <Ev k="미확인" />
        </>
      }
    >
      <div className="flex h-full flex-col gap-[18px]">
        <div className="grid min-h-0 flex-1 grid-cols-4 gap-[22px]">
          {COUPANG_STEPS.map((s, i) => (
            <Card key={s.head} interactive className="relative flex flex-col items-center px-[24px] pb-[20px] pt-[22px] text-center">
              {i < COUPANG_STEPS.length - 1 && (
                <span className="absolute -right-[20px] top-[124px] z-10 grid size-[36px] place-items-center rounded-full bg-char text-white">
                  <ArrowRight className="size-[18px]" strokeWidth={2.6} />
                </span>
              )}
              <div className="text-[16px] font-bold text-cobalt">
                {i + 1}단계 · {s.when}
              </div>
              <div className="mt-[2px] text-[25px] font-bold text-ink">{s.head}</div>
              <div className={cx("mt-[14px] grid size-[170px] shrink-0 place-items-center rounded-full", i === 3 ? "bg-azure text-char" : "bg-pebble text-ink")}>
                <div>
                  <s.icon className="mx-auto size-[28px] opacity-70" strokeWidth={1.9} />
                  <div className="mt-[4px] font-display text-[44px] font-extrabold leading-none tracking-[-0.04em]">{s.stat}</div>
                  <div className="mx-auto mt-[6px] max-w-[130px] text-[14px] font-semibold leading-[1.3] opacity-80">{s.statLabel}</div>
                </div>
              </div>
              <p className="mt-[16px] text-[19px] leading-[1.55] text-ink-2">{s.body}</p>
              <div className="mt-auto w-full rounded-[14px] bg-cream-2 px-[14px] py-[10px] text-[16px] font-semibold leading-[1.5] text-ink">{s.note}</div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-[1.25fr_1fr] gap-[22px]">
          <Card className="flex items-center gap-[18px] px-[28px] py-[16px]">
            <IconCircle icon={Link2} size={52} tone="cobalt" />
            <div>
              <div className="text-[22px] font-bold text-ink">성과 추적 링크</div>
              <p className="mt-[2px] text-[18.5px] leading-[1.5] text-ink-2">
                영상·인플루언서마다 다른 쿠팡 파트너 캠페인 링크로 어느 콘텐츠가 쿠팡 매출을 냈는지 확인합니다.
              </p>
            </div>
          </Card>
          <Reveal>
            <Deliverable className="h-full">주간 쿠팡 숫자(매출·광고비·ROAS·리뷰 수), 행사 신청 내역, 링크별 매출</Deliverable>
          </Reveal>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 03-6 ⑤ 스마트스토어 최적화 — 항목을 고르면 화면 속 위치가 켜진다             */
/* ------------------------------------------------------------------ */

type StoreKey = "name" | "tag" | "option" | "bundle" | "first" | "review";

const STORE_ROWS: Array<{ key: StoreKey; head: string; body: string }> = [
  { key: "name", head: "상품명", body: "고객이 실제로 쓰는 검색어 반영" },
  { key: "tag", head: "태그", body: "네이버가 인식하는 태그 10개로 정리" },
  { key: "option", head: "옵션", body: "판매 많은 순서로 정렬, 품절 옵션은 아래로 + 입고 예정일 표시" },
  { key: "bundle", head: "묶음·무료배송", body: "2팩 무료배송, 남녀 세트, 타올+팬티 묶음배송 그룹 — 원가표를 받은 뒤 손익을 계산해 확정" },
  { key: "first", head: "상세 첫 화면", body: "리뷰 수·평점, 사이즈 cm 실측표, \"1장 690원\" 같은 장당가, 소재·평량을 글자로, 자주 묻는 질문 5개" },
  { key: "review", head: "리뷰 정책", body: "포토 리뷰·한달 사용 리뷰 적립금, 월 1회 리뷰 이벤트 기준" },
];

function StoreMock({ active }: { active: StoreKey | null }) {
  const hl = (k: StoreKey) =>
    cx("rounded-[12px] transition-all duration-300", active === k ? "bg-azure-5 ring-[3px] ring-azure" : active ? "opacity-40" : "");
  return (
    <BrowserFrame title="상세페이지 예시" className="h-full" bodyClassName="flex flex-col gap-[10px] px-[20px] py-[16px]">
      <div className="flex gap-[16px]">
        <div className="grid size-[118px] shrink-0 place-items-center rounded-[16px] bg-cream-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pouch.jpg" alt="" className="size-[96px] rounded-[12px]" />
        </div>
        <div className={cx("min-w-0 flex-1 p-[6px]", hl("name"))}>
          <div className="text-[12px] font-bold text-cobalt">상품명</div>
          <p className="text-[15.5px] font-bold leading-[1.4] text-ink">뷰클린 일회용 팬티 여성 순면 멸균 개별포장 위생팬티 일회용속옷 입원 산후조리 여행 10매</p>
        </div>
      </div>
      <div className={cx("flex flex-wrap items-center gap-[6px] p-[6px]", hl("tag"))}>
        <span className="text-[12px] font-bold text-cobalt">태그 10개</span>
        {[52, 66, 44, 58, 70, 48].map((w, i) => (
          <span key={i} className="h-[16px] rounded-full bg-pebble-2" style={{ width: w }} />
        ))}
      </div>
      <div className={cx("p-[6px]", hl("first"))}>
        <div className="flex items-center gap-[8px]">
          <Star className="size-[16px] fill-wait text-wait" />
          <span className="font-display text-[17px] font-bold text-ink">4.89</span>
          <span className="text-[14px] text-ink-3">리뷰 4,418</span>
          <span className="ml-auto rounded-full bg-cobalt px-[11px] py-[2px] text-[14px] font-bold text-white">1장 690원</span>
        </div>
        <div className="mt-[8px] grid grid-cols-3 gap-[6px]">
          {["사이즈 cm 실측표", "소재·평량", "자주 묻는 질문 5"].map((t) => (
            <span key={t} className="rounded-[8px] bg-cream-2 px-[8px] py-[6px] text-center text-[12.5px] font-bold text-ink-2">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className={cx("p-[6px]", hl("option"))}>
        <div className="text-[12px] font-bold text-cobalt">옵션 · 판매 많은 순</div>
        {[
          { w: "62%", sold: false },
          { w: "48%", sold: false },
          { w: "40%", sold: true },
        ].map((o, i) => (
          <div key={i} className="mt-[5px] flex items-center gap-[8px] rounded-[8px] bg-cream-2 px-[10px] py-[6px]">
            <span className="h-[8px] rounded-full bg-pebble" style={{ width: o.w }} />
            {o.sold && <span className="ml-auto text-[12px] font-bold text-stop">품절 · 입고 예정일</span>}
          </div>
        ))}
      </div>
      <div className={cx("flex flex-wrap gap-[6px] p-[6px]", hl("bundle"))}>
        {["2팩 무료배송", "남녀 세트", "타올+팬티 묶음"].map((t) => (
          <span key={t} className="rounded-full bg-azure-5 px-[10px] py-[3px] text-[13px] font-bold text-cobalt ring-1 ring-azure-4">
            {t}
          </span>
        ))}
      </div>
      <div className={cx("flex items-center gap-[8px] p-[6px]", hl("review"))}>
        <Gift className="size-[16px] text-cobalt" />
        <span className="text-[13.5px] font-bold text-ink-2">포토 리뷰 · 한달 사용 리뷰 적립금</span>
      </div>
    </BrowserFrame>
  );
}

export function WorkSmartstore() {
  const [active, setActive] = useState<StoreKey | null>(null);
  return (
    <SlideLayout
      section="work"
      eyebrow="⑤ 스마트스토어 최적화"
      title={
        <>
          대표 3개 상품을 <Hl>상품명부터 상세 첫 화면까지</Hl> 한 번에 정비합니다
        </>
      }
      sub={<ServiceTag no="⑤" name="스마트스토어 최적화" meta={["1회 세팅 · 2~3주", "대표 3개 상품"]} />}
    >
      <div className="grid h-full grid-cols-[1fr_540px] gap-[26px]">
        <Card className="flex flex-col px-[34px] pb-[24px] pt-[22px]">
          <div className="flex flex-wrap items-center gap-[10px]">
            <span className="text-[18px] font-bold text-ink-3">대상</span>
            {["여성 일회용 팬티", "30x30 타올", "70x30 타올"].map((t) => (
              <Chip key={t} tone="cobalt">
                {t}
              </Chip>
            ))}
            <span className="ml-auto text-[15px] font-semibold text-ink-3">항목에 마우스를 올리면 화면 속 위치가 켜집니다</span>
          </div>
          <div className="mt-[12px] flex flex-1 flex-col" onMouseLeave={() => setActive(null)}>
            {STORE_ROWS.map((r) => (
              <div
                key={r.key}
                onMouseEnter={() => setActive(r.key)}
                className={cx(
                  "grid flex-1 cursor-default grid-cols-[170px_1fr] items-center gap-[18px] rounded-[14px] px-[14px] py-[6px] transition-colors",
                  active === r.key ? "bg-azure-5" : "",
                )}
              >
                <span className={cx("text-[21px] font-bold", active === r.key ? "text-cobalt" : "text-ink")}>{r.head}</span>
                <span className="text-[19.5px] leading-[1.5] text-ink-2">{r.body}</span>
              </div>
            ))}
          </div>
          <Deliverable className="mt-[10px]">변경 전후 비교표, 바꾼 날부터 2주 동안의 상품 구매전환율 비교</Deliverable>
        </Card>
        <Reveal className="h-full">
          <StoreMock active={active} />
        </Reveal>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 03-7 ⑥ 리뷰·재구매 + ⑦ 주간 경쟁사·시장 동향 리포트                         */
/* ------------------------------------------------------------------ */

function ServiceHead({ no, name, meta }: { no: string; name: string; meta: string }) {
  return (
    <div className="flex items-center gap-[12px]">
      <NumBadge no={no} size={34} />
      <h3 className="text-[28px] font-bold text-ink">{name}</h3>
      <Chip tone="outline" className="ml-auto text-[16px]">
        {meta}
      </Chip>
    </div>
  );
}

export function WorkReviewReport() {
  return (
    <SlideLayout
      section="work"
      eyebrow="⑥ 리뷰·재구매 · ⑦ 주간 리포트"
      title={
        <>
          <Hl>재구매는 메시지로</Hl> 늘리고, <Hl>시장 변화는 매주</Hl> 정리합니다
        </>
      }
    >
      <div className="grid h-full grid-cols-2 gap-[26px]">
        <Card className="flex flex-col px-[36px] pb-[26px] pt-[28px]">
          <ServiceHead no="⑥" name="리뷰·재구매 관리" meta="답글 주 3회 · 메시지 월 2회" />
          <div className="flex flex-1 flex-col justify-center pb-[12px]">
            <div className="mt-[22px] rounded-[22px] bg-beige px-[22px] pb-[18px] pt-[46px]">
              <div className="flex items-center gap-[12px]">
                <span className="rounded-full bg-white px-[16px] py-[7px] text-[20px] font-bold text-ink">구매</span>
                <div className="relative h-[3px] flex-1 rounded-full bg-ink-4">
                  <span className="absolute -top-[36px] left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[21px] font-bold text-cobalt">25~35일 뒤</span>
                </div>
                <span className="flex items-center gap-[8px] rounded-[16px] bg-char px-[16px] py-[10px] text-white">
                  <Bell className="size-[20px] text-azure-2" strokeWidth={2.2} />
                  <span className="text-[19px] font-bold">재구매 안내 메시지</span>
                </span>
              </div>
              <div className="mt-[14px] text-[17px] text-ink-2">재입고·시즌 안내도 함께 · 08~20시 · 발송은 뷰클린 승인 후</div>
            </div>
            <Bullets
              className="mt-[24px] space-y-[16px]"
              itemClassName="text-[21px]"
              items={[
                <>리뷰 답글 주 3회(최근 리뷰 300개부터), 반복 불만은 모아 월간 보고</>,
                <>리뷰 이벤트 월 1회, 베스트 리뷰 선정</>,
                <>알림받기 쿠폰을 상세 위쪽에 노출해 관심고객 늘리기</>,
                <span key="sub" className="flex flex-wrap items-center gap-[8px]">
                  정기구독 회차 할인안(예)
                  {["5%", "8%", "10%"].map((pct, i) => (
                    <span key={pct} className="flex items-center gap-[8px]">
                      {i > 0 && <ArrowRight className="size-[16px] text-ink-4" strokeWidth={2.6} />}
                      <span className="rounded-full bg-azure-5 px-[11px] py-[1px] font-display text-[18px] font-bold text-cobalt ring-1 ring-azure-4">{pct}</span>
                    </span>
                  ))}
                </span>,
              ]}
            />
          </div>
          <Deliverable>답글 수, 메시지별 읽음률·24시간 구매전환율, 재구매율 추이</Deliverable>
        </Card>

        <Card className="flex flex-col px-[36px] pb-[26px] pt-[28px]">
          <ServiceHead no="⑦" name="주간 경쟁사·시장 동향 리포트" meta="매주 월요일" />
          <div className="flex flex-1 flex-col justify-center pb-[12px]">
            <div className="mt-[24px] grid grid-cols-3 gap-[14px]">
              {[
                { big: "10개", head: "경쟁 상품", body: "가격·리뷰·찜·순위 변화" },
                { big: "30개", head: "핵심 검색어", body: "순위, 새 경쟁 상품·행사" },
                { big: "네이버·쿠팡", head: "플랫폼 정책", body: "정책 변경 정리" },
              ].map((x) => (
                <div key={x.head} className="flex flex-col items-center rounded-[22px] bg-cream-2 px-[16px] py-[28px] text-center">
                  <div className="text-[18px] font-bold text-cobalt">{x.head}</div>
                  <div
                    className={cx(
                      "mt-[6px] font-display font-extrabold tracking-[-0.04em] text-ink",
                      x.big.length > 4 ? "text-[32px] leading-[60px]" : "text-[52px] leading-[60px]",
                    )}
                  >
                    {x.big}
                  </div>
                  <p className="mt-[6px] text-[18px] leading-[1.5] text-ink-2">{x.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-[28px] text-[22px] leading-[1.7] text-ink-2">
              매주 월요일, 지난주에 경쟁 상품과 검색어 순위가 어떻게 움직였는지, 네이버·쿠팡에서 무엇이 바뀌었는지 한 번에 정리합니다.
            </p>
          </div>
          <Deliverable>주간 리포트(5장 견본 형식)</Deliverable>
        </Card>
      </div>
    </SlideLayout>
  );
}
