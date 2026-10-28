"use client";

import {
  CircleCheckBig,
  Clapperboard,
  CornerDownRight,
  FileCheck2,
  Megaphone,
  MessagesSquare,
  Newspaper,
  Repeat,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { Card, DarkCard, Ev, Hl, IconCircle, PlusList, Reveal, cx } from "@/components/ui/primitives";
import { SlideLayout } from "@/components/ui/SlideLayout";

/* ------------------------------------------------------------------ */
/* 04-1 요일별 루틴 — 서비스를 고르면 그 일이 놓인 요일이 켜진다               */
/* ------------------------------------------------------------------ */

const TAGS: Array<{ tag: string; icon: typeof Newspaper }> = [
  { tag: "주간 리포트", icon: Newspaper },
  { tag: "네이버 광고 · 쿠팡", icon: Megaphone },
  { tag: "AI 숏폼", icon: Clapperboard },
  { tag: "시딩", icon: UsersRound },
  { tag: "리뷰·재구매", icon: Repeat },
  { tag: "쿠팡", icon: ShoppingBag },
];
const TAG_ICON = Object.fromEntries(TAGS.map((t) => [t.tag, t.icon])) as Record<string, typeof Newspaper>;

const WEEK: Array<{ day: string; en: string; tasks: Array<{ t: string; tag: string }>; out: string }> = [
  {
    day: "월",
    en: "MON",
    tasks: [
      { t: "지난주 숫자 정리, 주간 리포트 발송", tag: "주간 리포트" },
      { t: "광고 1차 점검 — 입찰·제외 검색어", tag: "네이버 광고 · 쿠팡" },
    ],
    out: "주간 리포트 + 이번 주 할 일 3개",
  },
  {
    day: "화",
    en: "TUE",
    tasks: [
      { t: "숏폼 1편 업로드", tag: "AI 숏폼" },
      { t: "시딩 섭외 연락, 이번 주 5명 확정", tag: "시딩" },
    ],
    out: "업로드 링크",
  },
  {
    day: "수",
    en: "WED",
    tasks: [
      { t: "리뷰 답글·리뷰 이벤트 점검", tag: "리뷰·재구매" },
      { t: "무료노출·행사 신청 가능 상품 확인", tag: "쿠팡" },
    ],
    out: "신청 제안(가격·수량), 승인 요청",
  },
  {
    day: "목",
    en: "THU",
    tasks: [
      { t: "숏폼 1편 업로드, 다음 주 2편 시안 공유", tag: "AI 숏폼" },
      { t: "시딩 발송·게시 확인", tag: "시딩" },
    ],
    out: "시안 확인 요청, 게시 확인 목록",
  },
  {
    day: "금",
    en: "FRI",
    tasks: [
      { t: "광고 2차 점검", tag: "네이버 광고 · 쿠팡" },
      { t: "경쟁 상품 가격·리뷰·순위 기록", tag: "주간 리포트" },
    ],
    out: "한 줄 메시지 보고",
  },
];

export function OpsWeekly() {
  const [tag, setTag] = useState<string | null>(null);
  return (
    <SlideLayout
      section="ops"
      eyebrow="요일별 루틴"
      title={
        <>
          매주 <Hl>같은 요일에 같은 일</Hl>을 합니다
        </>
      }
      sub="패키지에 든 항목만 진행합니다. 서비스에 마우스를 올리면 그 일이 놓인 요일이 보입니다"
    >
      <div className="flex h-full flex-col gap-[16px]">
        <Reveal className="flex flex-wrap items-center gap-[8px]" onMouseLeave={() => setTag(null)}>
          {TAGS.map(({ tag: t, icon: Icon }) => (
            <button
              key={t}
              type="button"
              onMouseEnter={() => setTag(t)}
              onClick={() => setTag((cur) => (cur === t ? null : t))}
              className={cx(
                "inline-flex cursor-pointer items-center gap-[7px] rounded-full px-[14px] py-[6px] text-[16px] font-bold transition-colors",
                tag === t ? "bg-cobalt text-white" : "bg-white text-ink-2 ring-1 ring-inset ring-line hover:text-cobalt",
              )}
            >
              <Icon className="size-[17px]" strokeWidth={2.3} />
              {t}
            </button>
          ))}
        </Reveal>
        <div className="grid min-h-0 flex-1 grid-cols-5 gap-[14px]">
          {WEEK.map((d) => (
            <Card key={d.day} className="flex flex-col overflow-hidden">
              <div className="flex items-baseline gap-[10px] px-[22px] pb-[10px] pt-[16px]">
                <span className="text-[36px] font-extrabold leading-none text-ink">{d.day}</span>
                <span className="font-display text-[15px] font-bold tracking-[0.2em] text-ink-4">{d.en}</span>
              </div>
              <div className="mx-[16px] h-[3px] rounded-full bg-azure" />
              <div className="flex-1 space-y-[10px] px-[14px] pt-[14px]">
                {d.tasks.map((x) => {
                  const Icon = TAG_ICON[x.tag] ?? Newspaper;
                  const on = tag === x.tag;
                  const dim = tag !== null && !on;
                  return (
                    <div
                      key={x.t}
                      className={cx(
                        "rounded-[16px] px-[16px] py-[13px] transition-all duration-300",
                        on ? "bg-azure" : "bg-cream-2",
                        dim && "opacity-35",
                      )}
                    >
                      <div className={cx("flex items-center gap-[7px] text-[15px] font-bold", on ? "text-char" : "text-cobalt")}>
                        <Icon className="size-[17px]" strokeWidth={2.4} />
                        {x.tag}
                      </div>
                      <p className="mt-[6px] text-[20.5px] font-semibold leading-[1.45] text-ink">{x.t}</p>
                    </div>
                  );
                })}
              </div>
              <div className="m-[14px] mt-[10px] flex gap-[8px] rounded-[14px] bg-char px-[14px] py-[12px] text-[16.5px] font-semibold leading-[1.45] text-white">
                <CornerDownRight className="mt-[3px] size-[17px] shrink-0 text-azure-2" strokeWidth={2.6} />
                {d.out}
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_1.35fr] gap-[14px]">
          <Card className="flex items-center gap-[16px] px-[24px] py-[14px]">
            <IconCircle icon={MessagesSquare} size={48} tone="soft" />
            <div>
              <div className="text-[16px] font-bold text-cobalt">소통</div>
              <p className="text-[20px] font-semibold text-ink">평일 메시지 채널 하나(카카오톡 또는 이메일) · 월 1회 30분 화상 리뷰</p>
            </div>
          </Card>
          <Reveal className="card-dark flex items-center gap-[16px] px-[24px] py-[14px]">
            <IconCircle icon={CircleCheckBig} size={48} tone="sky" />
            <div>
              <div className="text-[16px] font-bold text-azure-2">승인</div>
              <p className="text-[20px] font-semibold">
                영상 게시, 메시지 발송, 가격·쿠폰·행사 신청, 광고 예산 변경은 <b className="text-azure-2">매번 뷰클린 확인 후 실행</b>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 04-2 첫 4주                                                           */
/* ------------------------------------------------------------------ */

const WEEKS = [
  {
    no: 1,
    phase: "준비·측정",
    items: [
      "시작 회의 60분(권한·자료)",
      "기준선: 검색어 30개 순위, 경쟁 10개 가격·리뷰·찜",
      "광고 계정 점검",
      "정비 제안: 상품명 '속옷' 추가, 마케팅 링크",
      "숏폼 2편 · 시딩 5명 섭외",
    ],
    out: "기준선 기록표 · 정비 제안서",
  },
  {
    no: 2,
    phase: "첫 실행",
    items: ["숏폼 2편 · 시딩 5명(첫 발송)", "첫 주간 리포트", "최적화 시안(해당 시)", "쿠팡 검색어·옵션 정비, 리뷰 이벤트", "리뷰 답글 시작"],
    out: "최적화 시안 · 첫 주간 리포트",
  },
  {
    no: 3,
    phase: "확장",
    items: ["숏폼 2편 · 시딩 5명", "네이버 광고 4주 시험 구조 시작(산모·출산 검색어 포함)"],
    out: "광고 시험 계획표",
  },
  {
    no: 4,
    phase: "첫 점검",
    items: ["숏폼 2편 · 시딩 5명", "쿠팡 광고 시작(리뷰가 쌓인 뒤)", "첫 월간 리포트 + 30분 리뷰", "30일 점검 기준 확인, 다음 달 계획"],
    out: "월간 리포트 · 다음 달 계획",
  },
];

export function OpsFirstMonth() {
  return (
    <SlideLayout
      section="ops"
      eyebrow="첫 4주 일정"
      title={
        <>
          첫 4주는 <Hl>준비 → 첫 실행 → 확장 → 첫 점검</Hl>으로 갑니다
        </>
      }
    >
      <div className="grid h-full grid-cols-[1fr_1fr_1fr_1fr_400px] gap-[16px]">
        {WEEKS.map((w) => (
          <Card key={w.no} className="flex flex-col px-[24px] pb-[20px] pt-[22px]">
            <div className="flex items-center gap-[14px]">
              <span className={cx("grid size-[66px] place-items-center rounded-full", w.no === 4 ? "bg-cobalt text-white" : "bg-pebble text-ink")}>
                <span className="text-center leading-none">
                  <span className="font-display text-[30px] font-extrabold">{w.no}</span>
                  <span className="text-[14px] font-bold">주차</span>
                </span>
              </span>
              <span className="text-[27px] font-bold text-ink">{w.phase}</span>
            </div>
            <ul className="mt-[20px] space-y-[16px]">
              {w.items.map((it) => (
                <li key={it} className="flex gap-[10px] text-[21px] leading-[1.45] text-ink-2">
                  <span className="mt-[0.6em] size-[7px] shrink-0 rounded-full bg-azure" />
                  {it}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center gap-[10px] rounded-[14px] bg-beige px-[14px] py-[12px] text-[17.5px] font-bold text-ink">
              <FileCheck2 className="size-[21px] shrink-0 text-cobalt" strokeWidth={2.2} />
              {w.out}
            </div>
          </Card>
        ))}
        <DarkCard title="4주차에 확인하는 30일 점검 기준" className="h-full" bodyClassName="flex flex-col">
          <PlusList dark items={["측정 기준선 완성", "원가·재구매율 확보", "2팩 이상 주문 비중 상승", "쿠팡 리뷰 50개"]} className="space-y-[18px]" itemClassName="text-[22px]" />
          <div className="mt-auto rounded-[16px] bg-white/10 px-[18px] py-[14px]">
            <div className="text-[15px] font-bold text-white/60">안 나오면</div>
            <p className="mt-[2px] text-[20px] font-bold leading-[1.4]">광고 증액을 미루고 원인부터 확인</p>
          </div>
        </DarkCard>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 04-3 다가오는 날짜 — 달력 타일                                           */
/* ------------------------------------------------------------------ */

const DATES = [
  {
    m: 11,
    d: 3,
    dow: "화",
    time: "23:59 마감",
    dday: 6,
    what: "쿠팡 11월 와우멤버스데이 신청 마감",
    detail: "노출 11-02 07:00 ~ 11-09 06:59",
    action: "판매 방식을 먼저 확인합니다. 판매자 직접 판매 상품 대상 행사라, 쿠팡 직매입 상품이면 해당이 안 될 수 있습니다.",
  },
  { m: 11, d: 4, dow: "수", dday: 7, what: "네이버 광고주센터가 '네이버애즈'로 바뀜", action: "바뀐 화면 기준으로 운영합니다." },
  {
    m: 11,
    d: 25,
    dow: "수",
    dday: 28,
    what: "쇼핑검색광고 품질 기준이 소재별 '클릭기대지수'로 바뀜",
    detail: "네이버 기획전 종료(10-28부터 신규 등록 불가)",
    action: "대표·추가 이미지와 홍보문구를 2안씩 시험합니다. 기획전 대신 쿠폰·알림받기·커넥트를 활용합니다.",
  },
];

/** 제안일(10-28)부터 11-25까지 날짜 간격을 실제 비율로 보여 주는 띠 */
function DateTimeline() {
  const span = 28;
  const marks = [
    { d: 0, label: "10.28", note: "제안일", up: true, tone: "bg-ink-4" },
    { d: 6, label: "11.03", note: "쿠팡 행사 신청 마감", up: true, tone: "bg-stop" },
    { d: 7, label: "11.04", note: "네이버애즈 전환", up: false, tone: "bg-cobalt" },
    { d: 28, label: "11.25", note: "클릭기대지수 · 기획전 종료", up: true, tone: "bg-cobalt" },
  ];
  return (
    <Reveal className="relative mx-[40px] h-[92px]">
      <div className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-pebble-2" />
      <div className="absolute left-0 top-1/2 h-[4px] w-[25%] -translate-y-1/2 rounded-full bg-azure" />
      {marks.map((m) => (
        <div key={m.label} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${(m.d / span) * 100}%` }}>
          <span className={cx("block size-[18px] rounded-full ring-[4px] ring-cream", m.tone)} />
          <div
            className={cx(
              "absolute flex items-baseline gap-[8px] whitespace-nowrap",
              m.d === 0 ? "left-0" : m.d === span ? "right-0" : "left-1/2 -translate-x-1/2",
              m.up ? "bottom-[28px]" : "top-[28px]",
            )}
          >
            <span className="font-display text-[21px] font-bold text-ink">{m.label}</span>
            <span className="text-[16px] font-semibold text-ink-3">{m.note}</span>
          </div>
        </div>
      ))}
    </Reveal>
  );
}

export function OpsDates() {
  return (
    <SlideLayout
      section="ops"
      eyebrow="다가오는 날짜"
      title={
        <>
          시작 직후 <Hl>놓치면 안 되는 날짜</Hl> 3개
        </>
      }
      sub="2026-10-28 기준"
      foot={
        <>
          출처: 쿠팡 판매자 공지, 네이버 광고·판매자 공지 <Ev k="확인" />
        </>
      }
    >
      <div className="flex h-full flex-col gap-[16px]">
        <DateTimeline />
        <div className="flex min-h-0 flex-1 flex-col gap-[14px]">
          {DATES.map((d, i) => (
            <Card key={d.d} interactive className="grid flex-1 grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)] items-center gap-[30px] px-[26px] py-[14px]">
              <div className="flex items-center gap-[14px]">
                <div className="w-[104px] overflow-hidden rounded-[20px] bg-white text-center ring-[1.5px] ring-line">
                  <div className={cx("py-[4px] text-[15px] font-bold text-white", i === 0 ? "bg-stop" : "bg-cobalt")}>{d.m}월</div>
                  <div className="font-display text-[48px] font-extrabold leading-[1.15] tracking-[-0.04em] text-ink">{d.d}</div>
                  <div className="pb-[6px] text-[15px] font-bold text-ink-3">{d.dow}요일</div>
                </div>
                <span className={cx("rounded-full px-[11px] py-[4px] font-display text-[17px] font-bold", i === 0 ? "bg-stop text-white" : "bg-beige text-ink")}>
                  D-{d.dday}
                </span>
              </div>
              <div>
                <h3 className="text-[25px] font-bold leading-[1.4] text-ink">{d.what}</h3>
                {(d.time || d.detail) && (
                  <p className="mt-[4px] text-[18.5px] text-ink-3">
                    {d.time && <b className="mr-[8px] text-stop">{d.time}</b>}
                    {d.detail}
                  </p>
                )}
              </div>
              <div className="rounded-[18px] bg-cream-2 px-[22px] py-[14px]">
                <div className="text-[15px] font-bold text-cobalt">우리가 하는 것</div>
                <p className="mt-[3px] text-[19.5px] leading-[1.5] text-ink">{d.action}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
