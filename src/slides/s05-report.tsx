"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  ChartLine,
  ChartNoAxesColumn,
  Check,
  Clapperboard,
  FileBarChart,
  Gauge,
  LayoutDashboard,
  Monitor,
  Newspaper,
  Search,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { CostBar, RevenueBar } from "@/components/charts/charts";
import { RangeSlider } from "@/components/ui/interactive";
import { BrowserFrame, Card, CountUp, EASE, Ev, Hl, IconCircle, Reveal, cx } from "@/components/ui/primitives";
import { SlideLayout } from "@/components/ui/SlideLayout";

/* ------------------------------------------------------------------ */
/* 05-1 매일·매주·매월 모으는 숫자                                         */
/* ------------------------------------------------------------------ */

const COLLECT: Array<{ when: string; rhythm: number; items: Array<{ what: string; where: string }> }> = [
  {
    when: "매일",
    rhythm: 7,
    items: [
      { what: "스토어 결제금액·주문 수·유입 경로", where: "스마트스토어 판매자센터 통계" },
      { what: "광고비·클릭·구매완료", where: "네이버 광고 관리 화면, 쿠팡 광고센터" },
      { what: "쿠팡 주문·매출", where: "쿠팡 Wing" },
      { what: "영상별 조회·좋아요·저장·공유", where: "인스타그램 인사이트, 유튜브 스튜디오" },
    ],
  },
  {
    when: "매주",
    rhythm: 1,
    items: [
      { what: "핵심 검색어 30개의 뷰클린 순위", where: "네이버 쇼핑·쿠팡 검색 결과 화면 기록" },
      { what: "경쟁 상품 10개의 가격·리뷰 수·찜·품절", where: "각 상품 화면 기록" },
      { what: "마케팅 링크·쿠팡 파트너 캠페인 링크별 주문", where: "판매자센터, 쿠팡 Wing" },
      { what: "시딩 게시물 링크·캡처·반응", where: "게시물 화면, 인플루언서가 보낸 인사이트 캡처" },
      { what: "새 리뷰 수·평점·반복 불만", where: "리뷰 관리 화면" },
    ],
  },
  {
    when: "매월",
    rhythm: 0,
    items: [
      { what: "검색어별 검색량 추이", where: "네이버 데이터랩, 검색광고 키워드 도구" },
      { what: "재구매율, 알림받기 순증, 메시지별 읽음률·24시간 구매전환율", where: "판매자센터 고객·마케팅 메시지 화면" },
      { what: "비용: 광고비, 대행료, 제품·배송 실비", where: "광고 정산, GL 청구서, 발송 기록" },
    ],
  },
];

export function ReportCollect() {
  return (
    <SlideLayout
      section="report"
      eyebrow="매일·매주·매월 모으는 숫자"
      title={
        <>
          <Hl>매일·매주·매월</Hl> 모으는 숫자를 정해 두었습니다
        </>
      }
      sub="숫자마다 어디서 가져오는지까지 정해 두고, 아래 세 가지로 보고합니다"
    >
      <div className="flex h-full flex-col gap-[16px]">
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-[22px]">
          {COLLECT.map((c) => (
            <Card key={c.when} className="flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-[28px] pb-[12px] pt-[20px]">
                <span className="text-[32px] font-extrabold text-ink">{c.when}</span>
                <span className="flex items-center gap-[5px]" aria-hidden>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      className={cx("size-[12px] rounded-full", i < c.rhythm ? "bg-azure" : c.rhythm === 0 && i === 0 ? "bg-cobalt" : "bg-pebble-2")}
                    />
                  ))}
                </span>
              </div>
              <div className="mx-[22px] h-[3px] rounded-full bg-azure" />
              <div className="flex-1 divide-y divide-line px-[28px] py-[4px]">
                {c.items.map((it) => (
                  <div key={it.what} className="py-[14px]">
                    <p className="text-[21px] font-semibold leading-[1.45] text-ink">{it.what}</p>
                    <p className="mt-[5px] flex items-start gap-[7px] text-[16.5px] leading-[1.45] text-ink-3">
                      <Monitor className="mt-[3px] size-[16px] shrink-0 text-azure" strokeWidth={2.2} />
                      {it.where}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <Reveal className="grid grid-cols-3 gap-[22px]">
          {[
            { icon: FileBarChart, head: "월간 리포트", when: "매월 첫 주 · 전 패키지" },
            { icon: Newspaper, head: "주간 리포트", when: "매주 월요일 · 그로스 · 풀 그로스" },
            { icon: LayoutDashboard, head: "공유 대시보드", when: "매주 갱신 · 링크 하나로 언제든" },
          ].map((x) => (
            <div key={x.head} className="card-dark flex items-center gap-[16px] px-[24px] py-[15px]">
              <IconCircle icon={x.icon} size={48} tone="sky" />
              <div>
                <div className="text-[21px] font-bold">{x.head}</div>
                <div className="text-[17px] text-white/70">{x.when}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 05-2 측정 원칙 — 세는 것(초록)과 세지 않는 것(빨강)                        */
/* ------------------------------------------------------------------ */

function Yes({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[7px] rounded-full bg-white px-[16px] py-[8px] text-[19px] font-bold text-ink ring-[1.5px] ring-inset ring-go">
      <span className="grid size-[20px] place-items-center rounded-full bg-go text-white">
        <Check className="size-[13px]" strokeWidth={3.4} />
      </span>
      {children}
    </span>
  );
}
function No({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[7px] rounded-full bg-cream-2 px-[16px] py-[8px] text-[19px] font-semibold text-ink-3 line-through decoration-ink-4">
      <span className="grid size-[20px] place-items-center rounded-full bg-stop text-white">
        <X className="size-[13px]" strokeWidth={3.4} />
      </span>
      {children}
    </span>
  );
}

function Principle({ n, head, body, visual }: { n: number; head: string; body: ReactNode; visual: ReactNode }) {
  return (
    <Card interactive className="flex flex-col justify-center px-[40px] py-[28px]">
      <div className="flex items-center gap-[14px]">
        <span className="grid size-[46px] place-items-center rounded-full bg-char font-display text-[22px] font-bold text-white">{n}</span>
        <h3 className="text-[30px] font-bold text-ink">{head}</h3>
      </div>
      <p className="mt-[14px] text-[22px] leading-[1.6] text-ink-2">{body}</p>
      <div className="mt-[22px] flex flex-wrap items-center gap-[12px]">{visual}</div>
    </Card>
  );
}

export function ReportPrinciples() {
  return (
    <SlideLayout
      section="report"
      eyebrow="측정 원칙"
      title={
        <>
          성과를 정확히 재기 위한 <Hl>측정 원칙 4가지</Hl>
        </>
      }
      sub="초록은 세는 것, 빨강은 세지 않는 것입니다"
    >
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-[22px]">
        <Principle
          n={1}
          head="단위를 섞지 않습니다"
          body={<>노출 &lsquo;회&rsquo;와 사람 &lsquo;명&rsquo;, 클릭 &lsquo;회&rsquo;와 주문 &lsquo;건&rsquo;을 따로 적습니다.</>}
          visual={
            <>
              {[
                ["노출", "회"],
                ["사람", "명"],
                ["클릭", "회"],
                ["주문", "건"],
              ].map(([a, b]) => (
                <span key={a} className="inline-flex overflow-hidden rounded-[12px] text-[19px] font-bold ring-[1.5px] ring-line">
                  <span className="bg-white px-[14px] py-[8px] text-ink">{a}</span>
                  <span className="bg-azure px-[14px] py-[8px] text-char">{b}</span>
                </span>
              ))}
            </>
          }
        />
        <Principle
          n={2}
          head="'구매'는 결제 완료만"
          body="장바구니 담기·버튼 클릭은 구매로 세지 않습니다."
          visual={
            <>
              <No>장바구니 담기</No>
              <No>버튼 클릭</No>
              <Yes>결제 완료</Yes>
            </>
          }
        />
        <Principle
          n={3}
          head="브랜드 성과는 두 단어 검색어로"
          body={
            <>
              &lsquo;뷰클린 일회용&rsquo;, &lsquo;뷰클린 일회용 팬티/타올&rsquo;로 잽니다. &lsquo;뷰클린&rsquo; 한 단어에는 같은 이름의 다른 업종이 섞이기 때문입니다.
            </>
          }
          visual={
            <>
              <No>뷰클린</No>
              <Yes>뷰클린 일회용</Yes>
              <Yes>뷰클린 일회용 팬티/타올</Yes>
            </>
          }
        />
        <Principle
          n={4}
          head="판정은 두 채널 합산 매출로"
          body="네이버+쿠팡 전체 매출로 봅니다. 한 채널이 늘고 다른 채널이 줄어든 것을 성장으로 세지 않기 위해서입니다."
          visual={
            <div className="flex items-center gap-[12px] text-[20px] font-bold">
              <span className="rounded-[12px] bg-white px-[16px] py-[8px] text-ink ring-[1.5px] ring-line">네이버</span>
              <span className="text-ink-4">+</span>
              <span className="rounded-[12px] bg-white px-[16px] py-[8px] text-ink ring-[1.5px] ring-line">쿠팡</span>
              <span className="text-ink-4">=</span>
              <span className="rounded-[12px] bg-cobalt px-[16px] py-[8px] text-white">합산 매출로 판정</span>
            </div>
          }
        />
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 05-3 수익률 두 줄 + 손익분기 ROAS 계산                                   */
/* ------------------------------------------------------------------ */

function RoasCard({
  title,
  formula,
  value,
  tag,
  delay,
  focus,
  cost,
  note,
}: {
  title: string;
  formula: string;
  value: number;
  tag: string;
  delay: number;
  focus?: boolean;
  cost: ReactNode;
  note: ReactNode;
}) {
  return (
    <Card className={cx("flex flex-col px-[38px] pb-[24px] pt-[26px]", focus && "border-azure")}>
      <div className="flex items-start justify-between gap-[20px]">
        <div>
          <h3 className="text-[29px] font-bold text-ink">{title}</h3>
          <p className="mt-[6px] text-[19px] text-ink-3">{formula}</p>
          <span className={cx("mt-[14px] inline-flex rounded-full px-[14px] py-[6px] text-[17px] font-bold", focus ? "bg-azure text-char" : "bg-cream-2 text-ink-2")}>
            {tag}
          </span>
        </div>
        <div className={cx("font-display text-[92px] font-extrabold leading-none tracking-[-0.05em]", focus ? "text-cobalt" : "text-ink")}>
          <CountUp value={value} delay={delay} />%
        </div>
      </div>
      <div className="mt-auto space-y-[14px] pt-[16px]">
        <div className="grid grid-cols-[64px_1fr] items-center gap-[14px]">
          <span className="text-[18px] font-bold text-ink-3">매출</span>
          <RevenueBar label="광고 매출 400만 원" delay={delay - 0.15} />
        </div>
        <div className="grid grid-cols-[64px_1fr] items-center gap-[14px]">
          <span className="text-[18px] font-bold text-ink-3">비용</span>
          {cost}
        </div>
        <p className="pl-[78px] text-[17px] font-semibold text-ink-3">{note}</p>
      </div>
    </Card>
  );
}

function BreakEven() {
  const [margin, setMargin] = useState(35);
  const bep = Math.round(10000 / margin);
  const covers = 400 >= bep;
  return (
    <Reveal className="card-dark grid grid-cols-[1fr_560px] items-center gap-[40px] px-[36px] py-[22px]">
      <div>
        <div className="flex items-center gap-[12px]">
          <Gauge className="size-[26px] text-azure-2" strokeWidth={2.2} />
          <span className="text-[23px] font-bold">원가표를 받은 뒤에는 손익분기 ROAS와 비교합니다</span>
        </div>
        <p className="mt-[8px] text-[17.5px] leading-[1.5] text-white/70">
          공헌이익률 = 매출에서 원가·배송비·수수료를 빼고 남는 비율. 손익분기 ROAS = 1 ÷ 공헌이익률
        </p>
        <div className="mt-[14px] flex items-center gap-[18px]">
          <span className="w-[150px] shrink-0 text-[17px] font-semibold text-white/80">
            공헌이익률 <b className="font-display text-[24px] text-white">{margin}%</b>
          </span>
          <RangeSlider value={margin} min={20} max={60} step={1} onChange={setMargin} label="공헌이익률" track="rgba(255,255,255,0.18)" />
        </div>
      </div>
      <div className="text-right">
        <div className="text-[17px] font-semibold text-white/70">{margin === 35 ? "제안서 예시: 공헌이익률 35%면" : `공헌이익률 ${margin}%면`}</div>
        <div className="font-display text-[42px] font-extrabold leading-tight tracking-[-0.03em] whitespace-nowrap">
          손익분기 ROAS 약 <span className="text-azure-2">{bep}%</span>
        </div>
        <motion.div
          key={covers ? "y" : "n"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className={cx("mt-[6px] inline-flex items-center gap-[8px] rounded-full px-[14px] py-[5px] text-[16px] font-bold", covers ? "bg-go/20 text-white" : "bg-stop/25 text-white")}
        >
          <span className={cx("size-[10px] rounded-full", covers ? "bg-go" : "bg-stop")} />
          예시 ROAS 400%는 손익분기보다 {covers ? "높습니다" : "낮습니다"}
        </motion.div>
      </div>
    </Reveal>
  );
}

export function ReportRoas() {
  return (
    <SlideLayout
      section="report"
      eyebrow="수익률 두 줄 보고"
      title={
        <>
          수익률은 <Hl>두 줄로</Hl> 보고합니다
        </>
      }
      sub="광고 화면의 ROAS가 좋아 보여도, 전체 비용을 넣은 숫자가 함께 있어야 진짜 남는지 판단할 수 있습니다"
      foot={
        <>
          표의 금액은 계산 방법을 보여 주기 위한 예시입니다. 손익분기 예시는 공헌이익률 가정값으로 계산했습니다 <Ev k="가정" />
        </>
      }
    >
      <div className="flex h-full flex-col gap-[18px]">
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-[24px]">
          <RoasCard
            title="① 광고비만 ROAS"
            formula="광고로 난 매출 ÷ 광고비"
            value={400}
            tag="광고 화면에 보이는 숫자"
            delay={0.6}
            cost={
              <div className="w-1/4">
                <CostBar total={100} segments={[{ label: "광고비 100만", value: 100, inside: true }]} />
              </div>
            }
            note="400만 ÷ 광고비 100만 = 400%"
          />
          <RoasCard
            title="② 대행료 포함 수익률"
            formula="같은 매출 ÷ (광고비 + GL 대행료 + 제품·배송 실비)"
            value={100}
            tag="전체 비용을 넣은 숫자"
            delay={0.8}
            focus
            cost={
              <CostBar
                total={400}
                delay={0.8}
                segments={[
                  { label: "광고비 100만", value: 100, inside: true },
                  { label: "대행료 270만", value: 270, inside: true },
                  { label: "실비 30만", value: 30 },
                ]}
              />
            }
            note="400만 ÷ (광고비 100만 + 대행료 270만 + 실비 30만) = 100%"
          />
        </div>
        <BreakEven />
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 05-4 주간·월간 리포트                                                  */
/* ------------------------------------------------------------------ */

const WEEKLY: Array<[string, string]> = [
  ["이번 주 숫자 5개", "매출 · 주문 수 · 숏폼 조회 · 스토어 유입 · 핵심 검색어 순위 (전주 대비 ▲▼)"],
  ["채널별", "스마트스토어 / 쿠팡 결제금액·주문·객단가"],
  ["광고", "네이버·쿠팡 광고비·구매·ROAS, 이번 주 바꾼 것"],
  ["콘텐츠", "영상 2편 조회·저장·링크 클릭, 시딩 진행(연락·수락·발송·게시)"],
  ["경쟁 동향", "경쟁 상품 10개 가격·리뷰·순위, 새 상품·행사"],
  ["플랫폼 소식", "네이버·쿠팡 정책·행사 일정"],
  ["이번 주 할 일 3개", "뷰클린 확인이 필요한 것"],
];
const MONTHLY: Array<[string, string]> = [
  ["한 줄 요약", "이번 달 매출, 전월 대비, 목표 대비"],
  ["채널별 매출", "결제금액·주문 수·객단가·구매전환율"],
  ["숏폼 성과", "편별 조회·도달·저장·공유·링크 클릭, 상위 2편·하위 2편과 이유"],
  ["콘텐츠 → 스토어 유입", "링크별 방문·주문·매출"],
  ["검색어", "검색량 추이와 상품 순위 변화"],
  ["경쟁사 추적", "가격·리뷰 수·순위 변화"],
  ["리뷰", "새 리뷰·평점·반복 불만과 조치"],
  ["비용과 수익률", "광고비만 ROAS + 대행료 포함 수익률"],
  ["다음 달 할 일 3개", "근거 숫자 포함"],
];

function ReportSheet({ en, title, chips, rows, dark }: { en: string; title: string; chips: string[]; rows: Array<[string, string]>; dark?: boolean }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className={cx("flex items-end justify-between px-[34px] pb-[18px] pt-[20px]", dark ? "bg-char text-white" : "bg-cobalt text-white")}>
        <div>
          <div className="font-display text-[15px] font-bold tracking-[0.3em] text-azure-2">{en}</div>
          <div className="mt-[2px] text-[31px] font-bold">{title}</div>
        </div>
        <div className="flex gap-[8px] pb-[4px] text-[15px] font-semibold">
          {chips.map((t) => (
            <span key={t} className="rounded-full bg-white/14 px-[12px] py-[3px] ring-1 ring-inset ring-white/25">
              {t}
            </span>
          ))}
        </div>
      </div>
      <ol className="flex flex-1 flex-col justify-around divide-y divide-line px-[34px] py-[8px]">
        {rows.map(([head, body], i) => (
          <li key={head} className="flex flex-1 items-center gap-[16px] text-[21px] leading-[1.45]">
            <span className="w-[26px] shrink-0 text-right font-display font-bold text-cobalt">{i + 1}</span>
            <span className="text-ink-2">
              <b className="font-bold text-ink">{head}</b>
              <span className="mx-[8px] text-ink-4">—</span>
              {body}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export function ReportDocs() {
  return (
    <SlideLayout
      section="report"
      eyebrow="주간·월간 리포트"
      title={
        <>
          리포트는 <Hl>주간과 월간</Hl> 두 가지로 드립니다
        </>
      }
    >
      <div className="grid h-full grid-cols-2 gap-[26px]">
        <ReportSheet en="WEEKLY" title="주간 리포트" chips={["매주 월요일", "1~2쪽", "그로스부터"]} rows={WEEKLY} dark />
        <ReportSheet en="MONTHLY" title="월간 리포트" chips={["매월 첫 주", "30분 화상 리뷰", "전 패키지"]} rows={MONTHLY} />
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 05-5 공유 대시보드 — 실제 화면이므로 브라우저 창에                          */
/* ------------------------------------------------------------------ */

function Skeleton({ kind }: { kind: "ring" | "line" | "bars" | "list" | "rank" | "cal" }) {
  if (kind === "ring")
    return (
      <svg viewBox="0 0 80 80" className="size-[90px]" aria-hidden>
        <circle cx="40" cy="40" r="31" fill="none" stroke="#e4e5e5" strokeWidth="10" />
        <motion.circle
          cx="40"
          cy="40"
          r="31"
          fill="none"
          stroke="#36a9e1"
          strokeWidth="10"
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          strokeDasharray="194.8"
          variants={{
            hidden: { strokeDashoffset: 194.8 },
            show: { strokeDashoffset: 78, transition: { duration: 1.1, ease: EASE, delay: 0.7 } },
          }}
        />
      </svg>
    );
  if (kind === "line")
    return (
      <svg viewBox="0 0 200 70" className="h-[80px] w-full" aria-hidden>
        <line x1="0" y1="68" x2="200" y2="68" stroke="#dcdbce" strokeWidth="1.5" />
        <motion.path
          d="M2 56 L36 50 L70 52 L104 38 L138 34 L172 22 L198 16"
          fill="none"
          stroke="#1d71b8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.2, ease: EASE, delay: 0.7 } } }}
        />
        <motion.path
          d="M2 62 L36 60 L70 58 L104 55 L138 50 L172 46 L198 40"
          fill="none"
          stroke="#36a9e1"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.2, ease: EASE, delay: 0.85 } } }}
        />
      </svg>
    );
  if (kind === "bars")
    return (
      <div className="flex h-[80px] items-end gap-[10px]">
        {[40, 58, 48, 70, 62, 84].map((h, i) => (
          <motion.span
            key={i}
            className="w-[22px] rounded-t-[5px] bg-azure"
            style={{ height: `${h}%`, originY: 1 }}
            variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.6, ease: EASE, delay: 0.7 + i * 0.06 } } }}
          />
        ))}
      </div>
    );
  if (kind === "list" || kind === "rank")
    return (
      <div className="space-y-[10px]">
        {[82, 64, 72].map((w, i) => (
          <div key={i} className="flex items-center gap-[10px]">
            <span className={cx("grid size-[22px] shrink-0 place-items-center rounded-full font-display text-[12px] font-bold", kind === "rank" ? "bg-cobalt text-white" : "bg-azure-5")}>
              {kind === "rank" ? i + 1 : ""}
            </span>
            <span className="h-[10px] rounded-full bg-pebble-2" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    );
  return (
    <div className="grid grid-cols-7 gap-[6px]">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className={cx("h-[20px] rounded-[5px]", [2, 5, 9, 11].includes(i) ? "bg-azure" : "bg-pebble-2")} />
      ))}
    </div>
  );
}

export function ReportDashboard() {
  const panels: Array<{ icon: typeof Monitor; head: string; body: string; kind: Parameters<typeof Skeleton>[0]["kind"] }> = [
    { icon: Gauge, head: "요약", body: "이번 달 누적 매출·주문, 목표 대비 진행률, 30·60·90일 점검 기준", kind: "ring" },
    { icon: ChartLine, head: "채널", body: "스마트스토어·쿠팡 매출 추이(주 단위)", kind: "line" },
    { icon: ChartNoAxesColumn, head: "광고", body: "광고비·ROAS·대행료 포함 수익률", kind: "bars" },
    { icon: Clapperboard, head: "콘텐츠", body: "영상·시딩 목록과 성과, 링크별 주문", kind: "list" },
    { icon: Search, head: "검색·경쟁", body: "핵심 검색어 30개 순위, 경쟁 상품 10개 표", kind: "rank" },
    { icon: CalendarDays, head: "일정", body: "이번 달 업로드·발송·행사 일정, 뷰클린 확인 대기 항목", kind: "cal" },
  ];
  return (
    <SlideLayout
      section="report"
      eyebrow="공유 대시보드"
      title={
        <>
          <Hl>링크 하나로</Hl> 언제든 확인하는 공유 대시보드
        </>
      }
      sub="매주 갱신합니다"
    >
      <Reveal className="h-full">
        <BrowserFrame title="뷰클린 × GL 공유 대시보드" right={<span className="text-[14px] font-semibold text-ink-3">예시 화면</span>} className="h-full" bodyClassName="grid grid-cols-3 grid-rows-2 gap-[16px] bg-cream p-[20px]">
          {panels.map((p) => (
            <motion.div
              key={p.head}
              className="flex flex-col rounded-[20px] bg-white px-[24px] pb-[20px] pt-[20px] ring-1 ring-line"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
            >
              <div className="flex items-center gap-[12px]">
                <IconCircle icon={p.icon} size={46} tone="soft" />
                <span className="text-[25px] font-bold text-ink">{p.head}</span>
              </div>
              <p className="mt-[10px] text-[20px] leading-[1.5] text-ink-2">{p.body}</p>
              <div className="mt-auto pt-[12px]">
                <Skeleton kind={p.kind} />
              </div>
            </motion.div>
          ))}
        </BrowserFrame>
      </Reveal>
    </SlideLayout>
  );
}
